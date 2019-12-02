const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const User = require('./models/User');
require('./services/passport');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(4200);

//middleware, converts requests from string to js object
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));
mongoose.set('useNewUrlParser', true);
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/client/build'));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

io.on('connection', (socket) => {
	console.log('user connected');
});

/************** 1-1 Session Socket.io Code  **************/
/*Namespace for handling matchmaking for 1-1 Sessions */
const sessionQueueNsp = io.of('/session-queue');
sessionQueueNsp._userlist = [];
sessionQueueNsp.on('connection', (socket) => {
	console.log('a user has joined the queue');
	socket.on('attemptConnection', (data) => {
		if (sessionQueueNsp._userlist.length === 0) {
			//list is empty
			sessionQueueNsp.to(`${data.socketId}`).emit('connectionResult', { status: false });
		} else {
			//connect the users
			sessionQueueNsp.to(`${data.socketId}`).emit('connectionResult', {
				status: true,
				userToConnectTo: `holy shit someone exists ${JSON.stringify(sessionQueueNsp._userlist[0])}`,
				partnerDisplayName: sessionQueueNsp._userlist[0].displayName,
				partnerUniqueId: sessionQueueNsp._userlist[0].uniqueId
			});
			sessionQueueNsp.to(`${sessionQueueNsp._userlist[0].socketId}`).emit('connectionResult', {
				status: true,
				userToConnectTo: `holy shit someone exists ${JSON.stringify(data)}`,
				partnerDisplayName: data.displayName,
				partnerUniqueId: data.uniqueId
			});
			sessionQueueNsp._userlist.shift();
		}
	});

	socket.on('addToQueue', (data) => {
		sessionQueueNsp._userlist.push(data);
	});
	socket.on('leaveQueue', (data) => {
		const index = sessionQueueNsp._userlist.indexOf(data);
		sessionQueueNsp._userlist.splice(index, 1);
	});
});

/*Namespace handling non-chat related events in 1-1 session*/
const privateSessionNsp = io.of('/private-session');
privateSessionNsp.on('connection', (socket) => {
	console.log('connected');

	socket.on('leaveSession', (data) => {
		socket.broadcast.emit('partnerLeft', data);
	});
	socket.on('partnerSkipSong', (data) => {
		socket.broadcast.emit('partnerSkipSong', data);
	});
	socket.on('partnerAddSong', (data) => {
		socket.broadcast.emit('partnerAddSong', data);
	});
});

/*Namespace handling chat related events in 1-1 session*/
const privateSessionChatNsp = io.of('/private-session-chat');
privateSessionChatNsp.on('connection', (socket) => {
	socket.on('sendMessage', (data) => {
		socket.broadcast.emit('messageSent', data);
	});
});

/************************* End 1-1 Session Socket.io Code **************************/

//Hello World Route
app.get('/api/test', (req, res) => {
	res.send('Hello world!');
});

require('./routes/authRoutes')(app);

// All routes other than above will go to index.html
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});
app.listen(port, () => {
	console.log(`server running on port ${port}`);
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
