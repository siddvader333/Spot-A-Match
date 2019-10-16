import React from 'react';
import SideMenu from '../components/SideMenu';
import { Route, Switch } from 'react-router-dom';

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
				<Switch>
					<Route exact path="/dashboard/room">
						<h1>This might be the in a room view </h1>
						<button onClick={this.openMenu}>Open Menu</button>
					</Route>
					<Route>
						<h1>This is the default dashboard view </h1>
						<button onClick={this.openMenu}>Open Menu</button>
					</Route>
				</Switch>
			</div>
		);
	}
}

export default DashboardContainer;