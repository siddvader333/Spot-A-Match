import React from 'react';
import '../css/components/MenuItem.css';

const MenuItem = (props) => {
	const { displayText } = props;
	return <div className="menu-item">{displayText}</div>;
};
export default MenuItem;
