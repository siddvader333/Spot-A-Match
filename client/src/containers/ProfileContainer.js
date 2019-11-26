import React from 'react';
import SideMenu from '../components/SideMenu';
import { Route, Switch } from 'react-router-dom';
import DashboardContentHeader from '../components/DashboardContentHeader';
import DashboardFlashMessage from '../components/DashboardFlashMessage';
import DashboardOptions from '../components/DashboardOptions';
import Navbar from '../components/Navbar';
import authFunctions from '../util/Auth';
import history from '../util/History';
import '../css/containers/ProfileContainer.css';

class ProfileContainer extends React.Component {
	render() {
		let userType = '';
		if (authFunctions.isPremium()) userType = <div className="profile-stat">Premium User</div>;
		else userType = <div className="profile-stat">Non-Premium User</div>;
		return (
			<div>
				<div id="profile-picture" />
				<div id="profile-info">
					<div className="profile-stat">Name: UserXYZ</div>
					{userType}
					<div className="profile-stat">Rooms Joined: 42</div>
					<div className="profile-stat">Rooms Hosted: 0</div>
					<div className="profile-stat">Sessions Joined: 37</div>
				</div>
			</div>
		);
	}
}

export default ProfileContainer;
