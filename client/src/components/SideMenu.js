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
			searchResults: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress = async (event) => {
		if (event.key === 'Enter' && this.state.searchValue !== '') {
			//console.log('enter press here! ');
			console.log('search for ' + this.state.searchValue);
			console.log(this.state.searchResults);
			//make search query to spotify

			//for now, use fake query for now
			/*fakeSearchResults.forEach((item) => {
				this.setState({ searchResults: this.state.searchResults.push(item) });
			});*/
			this.setState({ searchResults: fakeSearchResults });
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
