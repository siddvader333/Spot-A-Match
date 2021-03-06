import React from 'react';
import SideMenu from '../components/SideMenu';
import { Route, Switch } from 'react-router-dom';
import SessionPage from './SessionPage';
import DashboardContentHeader from '../components/DashboardContentHeader';
import DashboardFlashMessage from '../components/DashboardFlashMessage';
import DashboardOptions from '../components/DashboardOptions';
import Navbar from '../components/Navbar';
// import '../css/components/Navbar.css'
import HostRoomContainer from './HostRoomContainer';
import JoinRoomContainer from './JoinRoomContainer';
import ProfileContainer from './ProfileContainer';
import authFunctions from '../util/Auth';
import history from '../util/History';
import io from 'socket.io-client';

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);

		/*Socket.io Setup*/

		/*Session Queue Socket */
		var sessionSocket = io.connect('https://mighty-refuge-58998.herokuapp.com/session-queue');
		sessionSocket.on('connect', function(data) {
			console.log('Joined the session-queue socket, need to emit ready to add into queue');
		});
		sessionSocket.on('connectionResult', async (connectionResult) => {
			if (connectionResult.status === true) {
				this.setState({
					userToConnectTo: connectionResult.userToConnectTo,
					partnerDisplayName: connectionResult.partnerDisplayName,
					partnerUniqueId: connectionResult.partnerUniqueId,
					waitingInQueue: false
				});

				await fetch('/sessionsJoinedIncrement',{
					method: 'POST',
					headers:{ 'Content-Type' : 'application/json'}				
				})


				history.push('/dashboard/session');
			} else {
				sessionSocket.emit('addToQueue', {
					username: this.state.username,
					displayName: this.state.displayName,
					socketId: sessionSocket.id,
					uniqueId: this.state.uniqueId
				});
				this.flashMessage('Trying to Connect you to another user.');
				//wait 30 seconds
				await new Promise((resolve) => setTimeout(resolve, 30000));
				if (this.state.waitingInQueue === true) {
					this.flashMessage('Could not find anyone right now. Try again later');
					this.setState({ waitingInQueue: false });
					sessionSocket.emit('leaveQueue', {
						username: this.state.username,
						displayName: this.state.displayName,
						socketId: sessionSocket.id,
						uniqueId: this.state.uniqueId
					});
				}
			}
		});

		/*This is for joining a room */
		var roomSocket = io.connect('https://mighty-refuge-58998.herokuapp.com/room_queue');
		roomSocket.on('connect', function(data) {
			console.log('Joined the room-queue socket');
		});
		roomSocket.on('connectionResult', async (connectionResult) => {
			if (connectionResult.status == true) {
				this.setState({
					roomId: connectionResult.roomId,
					hostDisplayName: connectionResult.hostDisplayName,
					inARoom: true,
					numListeners: connectionResult.numListeners
				});
				console.log(connectionResult);
				if (connectionResult.host == true){
					history.push('/dashboard/room-host');

					await fetch('/roomsHostedIncrement',{
						method: 'POST',
						headers:{ 'Content-Type' : 'application/json'}				
					})

				}
				else{
					
					await fetch('/roomsJoinedIncrement',{
						method: 'POST',
						headers:{ 'Content-Type' : 'application/json'}				
					})
					
					history.push('/dashboard/room-listener');
				}
			} else {
				this.setState({ inARoom: false });
				this.flashMessage('Sorry, there are no rooms currently available. Please try again later.');
			}
		});
		//Setup room socket
		//Create a new socket called roomSocket (io.connect('http://localhost:4200/room_queue))
		//IF HOSTING A ROOM: socket.emit('creating a room'), pass it the person's uniqueId
		//socket.on, add to list of active rooms, pass the displayName as well

		var hostSocket = io.connect('https://mighty-refuge-58998.herokuapp.com/host-session');
		hostSocket.on('connect', function(data) {
			console.log('Joined the host-session socket');
		});

		this.state = {
			name: '',
			isOpen: false,
			songToAdd: { songName: '', songArtist: '' },
			showFlashMessage: false,
			flashMessageComponent: null,
			waitingInQueue: false,
			inARoom: false,
			userToConnectTo: '',
			uniqueId: '',
			partnerUniqueId: '',
			roomId: '',
			hostDisplayName: '',
			partnerDisplayName: '',
			sessionSocket: sessionSocket,
			roomSocket: roomSocket,
			hostSocket: hostSocket,
			numListeners: ''
		};

		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.addSong = this.addSong.bind(this);
		this.stopSending = this.stopSending.bind(this);
		this.addSongButtonClick = this.addSongButtonClick.bind(this);
		this.flashMessage = this.flashMessage.bind(this);
		this.getSessionRoomName = this.getSessionRoomName.bind(this);
		this.joinHostRoom = this.joinHostRoom.bind(this);
		this.addHostRoom = this.addHostRoom.bind(this);
	}

	async componentDidMount() {
		const response = await fetch('/profile', {
			method: 'GET',
			headers: { 'Content-Type': 'applications/json' }
		});
		const responseJSON = await response.json();
		this.setState({ name: responseJSON.name, uniqueId: responseJSON.uniqueId });
	}

	getSessionRoomName() {
		if (this.state.waitingInQueue === false) {
			console.log('get the session room name in here to pass to session page');
			this.state.sessionSocket.emit('attemptConnection', {
				username: this.state.username,
				displayName: this.state.displayName,
				socketId: this.state.sessionSocket.id,
				uniqueId: this.state.uniqueId
			});
			this.setState({ waitingInQueue: true });
		}
	}

	async addHostRoom() {
		const premium = await fetch('/getPremiumStatus',{
					method: 'GET',
					headers:{ 'Content-Type' : 'application/json'}				
				}).then(response => response.json());

		if (premium){	
			
			// await fetch('/roomsHostedIncrement',{
			// 	method: 'POST',
			// 	headers:{ 'Content-Type' : 'application/json'}				
			// })
			
				this.state.roomSocket.emit('createRoom', {
					username: this.state.username,
					displayName: this.state.displayName,
					socketId: this.state.roomSocket.id,
					uniqueId: this.state.uniqueId
				});

			
		}
		else 
			this.flashMessage("You need to be a Premium user for this feature")

	}

	joinHostRoom() {
		this.state.roomSocket.emit('attemptConnection', {
			username: this.state.username,
			displayName: this.state.displayName,
			socketId: this.state.roomSocket.id,
			uniqueId: this.state.uniqueId
		});
	}

	openMenu() {
		this.setState({ isOpen: true });
	}

	closeMenu() {
		this.setState({ isOpen: false });
	}

	addSong(song) {
		console.log('going to add to list: ' + song.songName);
		//console.log(song);
		console.log(this.state);
		this.setState({ songToAdd: song });
		console.log(this.state);
		if (window.location.pathname === '/dashboard') {
			this.flashMessage("Can't add songs when not in a room or session!");
		}
	}
	stopSending() {
		this.setState({ songToAdd: { songName: '', songArtist: '' }, exitSession: false });
	}

	addSongButtonClick() {
		this.openMenu();
		const searchBar = document.querySelector('.menu-search-bar');
		searchBar.focus();
	}

	flashMessage(message) {
		console.log('show flash message of ' + message);
		this.setState({
			flashMessageComponent: <DashboardFlashMessage duration="2000" displayText={message} />,
			showFlashMessage: true
		});

		window.setTimeout(() => {
			this.setState({
				flashMessageComponent: null,
				showFlashMessage: false
			});
		}, 5000);
	}

	async componentWillMount() {
		//this fetch cmd will hit the /profile route, which in turn sends back the req.user data
		const response = await fetch('/profile', {
			method: 'GET',
			headers: { 'Content-Type': 'applications/json' }
		});
		const responseJSON = await response.json(); //promise for parsing body? console.log to see data fetched from mongoDB

		//set the data we got back to state for later use
		this.setState({
			username: responseJSON.uniqueId,
			displayName: responseJSON.name,
			uniqueId: this.state.uniqueId
		});
	}
	render() {
		return (
			<div>
				<SideMenu
					createFlashMessage={this.flashMessage}
					addSong={this.addSong}
					closeMenu={this.closeMenu}
					isOpen={this.state.isOpen}
				/>
				<Navbar openMenu={this.openMenu} />
				{this.state.showFlashMessage ? this.state.flashMessageComponent : null}
				<Switch>
					<Route exact path="/dashboard/session">
						<DashboardContentHeader
							displayText="In a session with: User1234"
							path="/dashboard/session"
							leaveButtonText="Exit session"
							leaveSession={() => {
								this.setState({ exitSession: true });
							}}
						/>
						<DashboardFlashMessage
							displayText={`In a session with ${this.state.partnerDisplayName}`}
							duration="3500"
						/>
						<SessionPage
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
							partnerDisplayName={this.state.partnerDisplayName}
							partnerUniqueId={this.state.partnerUniqueId}
							uniqueId={this.state.uniqueId}
							exitSession={this.state.exitSession}
						/>
					</Route>

					<Route exact path="/dashboard/room-host">
						<DashboardContentHeader
							displayText="Welcome to your room"
							path="/dashboard/room-host"
							leaveButtonText="Close Room"
							numListeners={this.state.numListeners}
							leaveSession={() => {
								this.state.hostSocket.emit('hostLeaveSession', {
									roomId: this.roomId
								});
								history.push('/dashboard');
							}}
						/>
						<DashboardFlashMessage displayText="Welcome to your room!" duration="3500" />
						<HostRoomContainer
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
							roomDisplayName={this.state.roomDisplayName}
							roomUniqueId={this.state.uniqueId}
							roomId={this.state.roomId}
							displayName={this.state.displayName}
							exitSession={this.state.exitSession}
						/>
					</Route>

					<Route exact path="/dashboard/room-listener">
						<DashboardContentHeader
							displayText="In User1234's Room"
							leaveButtonText="Exit Room"
							path="/dashboard/room-listener"
							leaveSession={() => {
								history.push('/dashboard');
							}}
						/>
						<DashboardFlashMessage
							displayText={`Welcome to ${this.state.hostDisplayName}'s Room`}
							duration="3500"
						/>
						<JoinRoomContainer
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
							roomDisplayName={this.state.name}
							roomUniqueId={this.state.roomUniqueId}
							hostName={this.state.hostDisplayName}
							roomId={this.state.roomId}
							displayName={this.state.displayName}
						/>
					</Route>

					<Route exact path="/dashboard/profile">
						<DashboardContentHeader
							leaveSession={() => {
								history.push('/dashboard');
							}}
							leaveButtonText="Return to Dashboard"
							path="/dashboard/profile"
						/>
						<ProfileContainer />
					</Route>
					<Route exact path="/dashboard">
						<DashboardOptions
							getSessionName={this.getSessionRoomName}
							addHostRoom={this.addHostRoom}
							joinHostRoom={this.joinHostRoom}
							createFlashMessage={this.flashMessage}
						/>
					</Route>
				</Switch>
			</div>
		);
	}
}

export default DashboardContainer;
