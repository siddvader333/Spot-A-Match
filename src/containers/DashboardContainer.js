import React from 'react';
import SideMenu from '../components/SideMenu';
import { Route, Switch } from 'react-router-dom';
import SessionPage from './SessionPage';

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
				<button onClick={this.openMenu}>Open Menu</button>
				<Switch>
					<Route exact path="/dashboard/session">
						<h1>This is the session View </h1>
						<SessionPage />
					</Route>
					<Route>
						<h1>This is the default dashboard view </h1>
						<a href="/dashboard/session">Click here to join a session</a>
					</Route>
				</Switch>
			</div>
		);
	}
}

export default DashboardContainer;
