import React from 'react';
import MenuItem from './MenuItem';
import MenuSearchBar from './MenuSearchBar';
import '../css/components/SideMenu.css';

import { fakeSearchResults } from '../util/Data.js';
import MenuSearchResult from './MenuSearchResult';

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
			return <MenuSearchResult song={item} />;
		});
		return (
			<div style={style} className="side-menu">
				<div className="side-menu-container">
					<p
						onClick={() => {
							this.setState({ searchResults: [] });
							console.log(this.state.searchResults);
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
						<MenuItem displayText="My Profile" />
						<MenuItem displayText="Upgrade to Pro" />
						<MenuItem displayText="Logout" />
					</div>
				</div>
			</div>
		);
	}
}

export default SideMenu;
