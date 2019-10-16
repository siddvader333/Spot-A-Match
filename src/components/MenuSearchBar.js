import React from 'react';
import '../css/components/MenuSearchBar.css';

const MenuSearchBar = (props) => {
	const { handleKeyPress, handleChange } = props;
	return (
		<input
			onKeyPress={handleKeyPress}
			onChange={handleChange}
			type="text"
			className="menu-search-bar"
			placeholder="Search for a song ..."
		/>
	);
};
export default MenuSearchBar;
