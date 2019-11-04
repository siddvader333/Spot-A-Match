import React from 'react';
import HamburgerButton from './HamburgerButton';
import AddSongsBtnSession from './AddSongsBtnSession';
import cookieFunctions from '../util/Cookie';
import history from '../util/History';
import '../css/components/Navbar.css';

class Navbar extends React.Component {
	render() {
		return (
			<div className="nav">
				<HamburgerButton onClick={this.props.openMenu} />
				<p className="navbar-title">Spot-A-Match</p>
				<div className="logout-button">
					<AddSongsBtnSession
						onClick={() => {
							cookieFunctions.setCookie('auth-status', 'false');
							history.push('/');
						}}
						displayText="Logout"
					/>
				</div>
			</div>
		);
	}
}

export default Navbar;
