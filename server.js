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

/*Queue for Session MatchMaking */
const nsp = io.of('/session_queue');
nsp._userlist = [];
nsp.on('connection', (socket) => {
	console.log('a user has joined the queue');
	console.log(socket.id);

	socket.on('attemptConnection', (data) => {
		console.log(data.username + ' is trying to connect to someone');
		console.log('userList:' + JSON.stringify(nsp._userlist));
		if (nsp._userlist.length === 0) {
			//list is empty
			nsp.to(`${data.socketId}`).emit('connectionResult', { status: false });
		} else {
			//connect the users
			nsp.to(`${data.socketId}`).emit('connectionResult', {
				status: true,
				userToConnectTo: `holy shit someone exists ${JSON.stringify(nsp._userlist[0])}`,
				partnerDisplayName: nsp._userlist[0].displayName,
				partnerUniqueId: nsp._userlist[0].uniqueId
			});
			nsp.to(`${nsp._userlist[0].socketId}`).emit('connectionResult', {
				status: true,
				userToConnectTo: `holy shit someone exists ${JSON.stringify(data)}`,
				partnerDisplayName: data.displayName,
				partnerUniqueId: data.uniqueId
			});
			nsp._userlist.shift();
		}
	});

	socket.on('addToQueue', (data) => {
		nsp._userlist.push(data);
	});
	socket.on('leaveQueue', (data) => {
		const index = nsp._userlist.indexOf(data);
		nsp._userlist.splice(index, 1);
	});
});

const nsp2 = io.of('/private-room');
nsp2.on('connection', (socket) => {
	console.log('a user has found a match and is in the session page');
	console.log(socket.id);

	socket.on('requestPartnerSocket', (data) => {
		//send this users data to get socket.id's on both sides
		nsp2.broadcast.emit('partnerInfo', data);
	});

	socket.on('infoReceived', (data) => {
		nsp2.broadcast.emit('infoReceived', data);
	});

	socket.on('sendMessage', (data) => {
		console.log(data);
		socket.broadcast.emit('messageSent', data);
	});
});

const nsp3 = io.of('room_queue'); 
nsp3._roomList = []; 
nsp3.on('connection', (socket) => {
	
	socket.on('attemptConnection', (data) => {
		console.log("Num rooms: " +  nsp3._roomList.length)
		if (nsp3._roomList.length === 0) {
			//list is empty
			nsp3.to(`${data.socketId}`).emit('connectionResult', { status: false });
		} else {
			//connect the users
			let emptiestRoom = {}; 
			let emptiestRoomListenerCount = -1; 
			for(let i = 0; i < nsp3._roomList.length; i++){
				if (nsp3._roomList[i].numListeners > emptiestRoomListenerCount){
					emptiestRoom = nsp3._roomList[i]; 
					emptiestRoomListenerCount = nsp3._roomList[i].numListeners; 
				}
			}
			nsp3.to(`${data.socketId}`).emit('connectionResult', {
				status: true,
				hostDisplayName: emptiestRoom.displayName,
				roomId: emptiestRoom.id,
				host: false, 
				numListeners: emptiestRoom.numListeners
			});
			emptiestRoom.numListeners++; 
		}
	});

	socket.on('createRoom', (data) => {
		console.log('HENLO' + data); 
		const newRoom = {  
			displayName: data.displayName,
			socketId: data.socketId, 
			numListeners: 1, 
		}
		nsp3._roomList.push(newRoom); 
		nsp3.to(`${data.socketId}`).emit('connectionResult', {
			status: true,
			hostDisplayName: newRoom.displayName,
			roomId: newRoom.id,
			host: true
		});
		console.log('Room list: ' + JSON.stringify(nsp3._roomList))
	})

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
app.listen(port, () => {
	console.log(`server running on port ${port}`);
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}
