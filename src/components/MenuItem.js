import React from 'react';
import '../css/components/MenuItem.css';

const MenuItem = (props) => {
	const { displayText, link, onClick } = props;
	return (
		<div onClick={onClick}>
			<a href={link}>
				<div className="menu-item">{displayText}</div>
			</a>
		</div>
	);
};
export default MenuItem;
