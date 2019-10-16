import React from 'react';
import MenuItem from './MenuItem';
import MenuSearchBar from './MenuSearchBar';
import '../css/components/SideMenu.css';

class SideMenu extends React.Component {
	render() {
		const { isOpen, closeMenu } = this.props;
		const style = isOpen ? { transform: 'translateX(0%)', display: 'block' } : { width: '0', display: 'none' };
		return (
			<div style={style} className="side-menu">
				<div className="side-menu-container">
					<p onClick={closeMenu} className="close-menu-button">
						X
					</p>
					<MenuSearchBar />
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
