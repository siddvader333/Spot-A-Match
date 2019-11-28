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
	socket.on('sendMessage', (message) => {
		console.log('message sent:' + JSON.stringify(message));
		socket.broadcast.emit('messageSent', message.content);
	});
});
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
