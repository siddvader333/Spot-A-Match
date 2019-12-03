import React from 'react';
import MenuItem from './MenuItem';
import MenuSearchBar from './MenuSearchBar';
import '../css/components/SideMenu.css';

import { fakeSearchResults } from '../util/Data.js';
import MenuSearchResult from './MenuSearchResult';
import cookieFunctions from '../util/Cookie';
import history from '../util/History';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			searchResults: [],
			userAccessToken:""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

async componentWillMount(){
	//this fetch cmd will hit the /profile route, which in turn sends back the req.user data
	const response = await fetch('/profile', {
		method: 'GET',
		headers: { 'Content-Type': 'applications/json' }
	});
	const responseJSON = await response.json(); //promise for parsing body? console.log to see data fetched from mongoDB

	//set the data we got back to state for later use
	this.setState({
		userAccessToken: responseJSON.currentAccessToken
	});
}

	handleKeyPress = async (event) => {
		if (event.key === 'Enter' && this.state.searchValue !== '') {
			//console.log('enter press here! ');
			console.log('Search for ' + this.state.searchValue);
			//console.log(this.state.searchResults);
			//make search query to spotify

			//for now, use fake query for now
			/*fakeSearchResults.forEach((item) => {
				this.setState({ searchResults: this.state.searchResults.push(item) });
			});*/
			
			
			/////////////////////////////////////
			/*----------------------API call--------------------------*/

			const urlFetch = '/getSongResults/' + this.state.searchValue;
			const results = await fetch(urlFetch,{
				method: 'GET',
				headers: { 'Content-Type' : 'application/json'},
			}).then(response => response.json());	

			/*-----------------End of API call--------------*/
			console.log("Got here");
			//-----------------Play song---------------------//
			const token = this.state.userAccessToken;
			let ready = false;
			// var player = new window.Spotify.Player({
			// 	name: "Spot-A-Match Player",
			// 	getOAuthToken: (callback) => {
			// 		callback(token)
			// 	},
			// 	volume: 0.5
			// })
			// console.log("the player");
			// console.log(player);
			// console.log(token);

			// player.connect().then(success => {
			// 	if (success) {
			// 	  console.log('The Web Playback SDK successfully connected to Spotify!');
			// 	}
			// })
			// player.addListener('ready', ({ device_id }) => {
			// 	console.log('The Web Playback SDK is ready to play music!');
			// 	console.log('Device ID', device_id);
			// 	this.setState({deviceID: device_id});
			// 	ready = true;
			// })
			///-------------API request to play song-----------------///				

			this.setState({ searchResults: results });
		}
	};

	handleChange = (event) => {
		this.setState({
			searchValue: event.target.value
		});
	};

	render() {
		const { isOpen, closeMenu } = this.props;
		const style = isOpen ? { transform: 'translateX(0%)', display: 'block' } : { width: '0', display: 'none' };
		const searchResults = this.state.searchResults.map((item) => {
			return <MenuSearchResult onClick={this.props.addSong} song={item} />;
		});
		return (
			<div style={style} className="side-menu">
				<div className="side-menu-container">
					<p
						onClick={() => {
							this.setState({ searchResults: [] });
							closeMenu();
						}}
						className="close-menu-button"
					>
						X
					</p>
					<MenuSearchBar handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} />
					{this.state.searchResults.length === 0 ? null : (
						<div className="search-results-container">{searchResults}</div>
					)}
					<div className="menu-links-container">
						<MenuItem
							displayText="My Profile"
							onClick={() => {
								history.push('/dashboard/profile');		/**change to /dashboard/profile after*/
							}}
							//link ={'/api/current_user'}
						/>
						<MenuItem
							displayText="Upgrade to Pro"
							onClick={() => {
								cookieFunctions.setCookie('premium-status', 'true');
								this.props.createFlashMessage('You are a premium user!');
							}}
						/>
						<MenuItem
							onClick={() => {
								cookieFunctions.setCookie('auth-status', 'false');
								history.push('/');
							}}
							displayText="Logout"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SideMenu;
