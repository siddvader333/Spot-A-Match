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
server.listen(process.env.PORT || 8888);

//middleware, converts requests from string to js object
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));
mongoose.set('useNewUrlParser', true);
app.use(bodyParser.json());

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
	console.log(socket.id);

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

const nsp3 = io.of('/room_queue');
nsp3._roomList = [];
nsp3.on('connection', (socket) => {
	socket.on('attemptConnection', (data) => {
		console.log('Num rooms: ' + nsp3._roomList.length);
		if (nsp3._roomList.length === 0) {
			//list is empty
			nsp3.to(`${data.socketId}`).emit('connectionResult', { status: false });
		} else {
			//connect the users
			let emptiestRoomListenerCount = nsp3._roomList[0].numListeners;
			let emptiestRoomIndex = 0;
			for (let i = 1; i < nsp3._roomList.length; i++) {
				if (nsp3._roomList[i].numListeners < emptiestRoomListenerCount) {
					emptiestRoomIndex = i;
					emptiestRoomListenerCount = nsp3._roomList[i].numListeners;
				}
			}
			nsp3._roomList[emptiestRoomIndex].numListeners++;
			nsp3.to(`${data.socketId}`).emit('connectionResult', {
				status: true,
				hostDisplayName: nsp3._roomList[emptiestRoomIndex].displayName,
				roomId: nsp3._roomList[emptiestRoomIndex].id,
				host: false,
				numListeners: nsp3._roomList[emptiestRoomIndex].numListeners
			});
			console.log(nsp3._roomList[emptiestRoomIndex].numListeners);
		}
	});

	socket.on('createRoom', (data) => {
		console.log('HENLO' + data);
		const newRoom = {
			displayName: data.displayName,
			socketId: data.socketId,
			numListeners: 1
		};
		nsp3._roomList.push(newRoom);
		nsp3.to(`${data.socketId}`).emit('connectionResult', {
			status: true,
			hostDisplayName: newRoom.displayName,
			roomId: newRoom.id,
			host: true,
			numListeners: newRoom.numListeners
		});
	});

	socket.on('leaveRoom', (data) => {
		data.room.numListeners--;
	});
});

const nsp4 = io.of('/room-chat');
nsp4.on('connection', (socket) => {
	console.log('a user has found a match and is in the session page');
	console.log(socket.id);

	socket.on('requestPartnerSocket', (data) => {
		//send this users data to get socket.id's on both sides
		nsp4.broadcast.emit('partnerInfo', data);
	});

	socket.on('infoReceived', (data) => {
		nsp4.broadcast.emit('infoReceived', data);
	});

	socket.on('sendMessage', (data) => {
		console.log(data);
		socket.broadcast.emit('messageSent', data);
	});
});

const nsp5 = io.of('/host-session');
nsp5._roomList = [];
nsp5.on('connection', (socket) => {
	console.log('we in here');
	socket.on('hostAddSong', (data) => {
		console.log('host added a song');
		socket.broadcast.emit('hostAddSong', data);
	});
	socket.on('hostLeaveSession', (data) => {
		socket.broadcast.emit('hostLeave', {
			roomId: data.roomId
		});
	});
	socket.on('hostSkipSong', (data) => {
		socket.broadcast.emit('hostSkipSong', data);
	});
	socket.on('hostPausedSong', (data) => {
		socket.broadcast.emit('hostPausedSong', data);
	});

	socket.on('requestSong', (data) => {
		socket.broadcast.emit('requestSong', data);
	});
	socket.on('leaveRoom', (data) => {
		data.room.numListeners--;
	});
});

//each item should have room name (uniqueId of host), display name (displayName of host), and listener count (starts at 1)
//creating the room: JOIN - socket.emit('join a room'), select a room, increment the listener count, return entire room to DashboardContainer.js
//only send back information to user who requested it: nsp.to(`${data.socketId}`); set this room in the state in DashboardContainer.js
//Look at nsp2 for how to send mesages on the server
//ignore info received/request socket

//Hello World Route
app.get('/api/test', (req, res) => {
	res.send('Hello world!');
});

require('./routes/authRoutes')(app);

// All routes other than above will go to index.html
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
