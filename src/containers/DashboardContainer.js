import React from 'react';
import SideMenu from '../components/SideMenu';

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
			</div>
		);
	}
}

export default DashboardContainer;
