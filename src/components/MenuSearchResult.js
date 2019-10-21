import React from 'react';
import '../css/components/MenuSearchResult.css';
const MenuSearchResult = (props) => {
	return (
		<div onClick={props.onClick} className="menu-search-result">
			<p className="search-item-song">{props.song.songName}</p>
			<p className="search-item-title">{props.song.artist}</p>
		</div>
	);
};

export default MenuSearchResult;
