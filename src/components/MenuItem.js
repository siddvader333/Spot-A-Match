import React from 'react';
import '../css/components/MenuItem.css';

const MenuItem = (props) => {
	const { displayText, link } = props;
	return (
		<div>
			<a href={link}>
			<div className="menu-item">{displayText}</div>
			</a>
		</div>
	);
};
export default MenuItem;
