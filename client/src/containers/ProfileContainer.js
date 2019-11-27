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

	constructor(props){
		super(props);
		this.state={
			displayName:"",
			pic:"https://img6.androidappsapk.co/300/b/1/a/com.ludicside.mrsquare.png",
			roomsJoined: 0,
			roomsHosted: 0,
			sessionsJoined: 0
		};
	}

	//fetch request
	async componentWillMount(){
		//this fetch cmd will hit the /profile route, which in turn sends back the req.user data
		const response = await fetch('/profile', {
			method: 'GET',
			headers: {'Content-Type': 'applications/json'}
		});
		const responseJSON = await response.json();				//promise for parsing body? console.log to see data fetched from mongoDB
		
		//set the data we got back to state for later use
		this.setState({
			displayName : responseJSON.name,
			roomsHosted : responseJSON.roomsHosted,
			roomsJoined : responseJSON.roomsJoined,
			sessionsJoined : responseJSON.sessionsJoined		
		})		
		if(responseJSON.profilePic.length > 0){
			this.setState({
				pic : responseJSON.profilePic[0]
			});
		}
	}


	render() {
		let userType = '';
		if (authFunctions.isPremium()) userType = <div className="profile-stat">Premium User</div>;
		else userType = <div className="profile-stat">Non-Premium User</div>;
		return (
			<div>
				<div id="profile-picture-div">
				<img id="profie-picture" className ="img-fluid mx-auto d-block" 
						src={this.state.pic} 
						width = "200"/>
				</div>
				
				<div id="profile-info">
					<div className="profile-stat">Name: {this.state.displayName}</div>
					{userType}
					<div className="profile-stat">Rooms Joined: {this.state.roomsJoined}</div>
					<div className="profile-stat">Rooms Hosted: {this.state.roomsHosted}</div>
					<div className="profile-stat">Sessions Joined: {this.state.sessionsJoined}</div>
				</div>
			</div>
		);
	}
}

export default ProfileContainer;
