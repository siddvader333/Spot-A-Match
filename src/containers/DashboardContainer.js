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

class DashboardContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	openMenu() {
		console.log('here');
		this.setState({ isOpen: true });
	}

	closeMenu() {
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<div>
				<SideMenu closeMenu={this.closeMenu} isOpen={this.state.isOpen} />
				{/* <button onClick={this.openMenu}>Open Menu</button> */}
				<Navbar openMenu={this.openMenu}/>
				<Switch>
					<Route exact path="/dashboard/session">
						<DashboardContentHeader
							displayText="In a session with: User1234"
							path="/dashboard/session"
							leaveButtonText="Exit session"
						/>
						<DashboardFlashMessage displayText="In a session with User1234" duration="3500" />
						<SessionPage />
					</Route>
					<Route exact path="/dashboard/room-host">
						<DashboardContentHeader
							displayText="Welcome to your room User1234!"
							path="/dashboard/room-host"
							leaveButtonText="Close Room"
						/>
						<DashboardFlashMessage displayText="Welcome to your room User1234!" duration="3500" />
						<HostRoomContainer />
					</Route>
					<Route exact path="/dashboard/room-listener">
						<DashboardContentHeader
							displayText="In User1234's Room"
							leaveButtonText="Exit Room"
							path="/dashboard/room-listener"
						/>
						<DashboardFlashMessage displayText="Welcome to User 1234's Room" duration="3500" />
						<JoinRoomContainer />
					</Route>
					<Route>
						{/* <h1>This is the default dashboard view </h1>
						<a href="/dashboard/session">Click here to join a session </a>
						<br />
						<a href="/dashboard/room-host">Click here to host a room</a>
						<br />
						<a href="/dashboard/room-listener">Click here to join a room</a> */}
						<DashboardOptions />
					</Route>
				</Switch>
			</div>
		);
	}
}

export default DashboardContainer;
