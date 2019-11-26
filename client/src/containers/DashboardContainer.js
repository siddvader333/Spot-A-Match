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

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			songToAdd: { songName: '', songArtist: '' },
			showFlashMessage: false,
			flashMessageComponent: null
		};

		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);

		this.addSong = this.addSong.bind(this);
		this.stopSending = this.stopSending.bind(this);

		this.addSongButtonClick = this.addSongButtonClick.bind(this);

		this.flashMessage = this.flashMessage.bind(this);
	}

	openMenu() {
		console.log('here');
		this.setState({ isOpen: true });
	}

	closeMenu() {
		this.setState({ isOpen: false });
	}

	addSong(song) {
		console.log('going to add to list: ' + song.songName);
		this.setState({ songToAdd: song });
		if (window.location.pathname === '/dashboard') {
			this.flashMessage("Can't add songs when not in a room or session!");
		}
	}
	stopSending() {
		this.setState({ songToAdd: { songName: '', songArtist: '' } });
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

	render() {
		if (!authFunctions.isAuthed()) {
			console.log('user not logged in');
			history.push('/');
		}
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
						/>
						<DashboardFlashMessage displayText="In a session with User1234" duration="3500" />
						<SessionPage
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
						/>
					</Route>

					<Route exact path="/dashboard/room-host">
						<DashboardContentHeader
							displayText="Welcome to your room User1234!"
							path="/dashboard/room-host"
							leaveButtonText="Close Room"
						/>
						<DashboardFlashMessage displayText="Welcome to your room User1234!" duration="3500" />
						<HostRoomContainer
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
						/>
					</Route>

					<Route exact path="/dashboard/room-listener">
						<DashboardContentHeader
							displayText="In User1234's Room"
							leaveButtonText="Exit Room"
							path="/dashboard/room-listener"
						/>
						<DashboardFlashMessage displayText="Welcome to User 1234's Room" duration="3500" />
						<JoinRoomContainer
							createFlashMessage={this.flashMessage}
							addSong={this.addSongButtonClick}
							songToAdd={this.state.songToAdd}
							stopSending={this.stopSending}
						/>
					</Route>

					<Route exact path="/dashboard/profile">
						<DashboardContentHeader leaveButtonText="Return to Dashboard" path="/dashboard/profile" />
						<ProfileContainer />
					</Route>
					<Route exact path="/dashboard">
						<DashboardOptions createFlashMessage={this.flashMessage} />
					</Route>
				</Switch>
			</div>
		);
	}
}

export default DashboardContainer;
