import React from 'react';
import '../css/components/ListenersCountWidget.css';

const ListenersCountWidget = (props) => {
	//console.log(props); 
	const { numListeners } = props;
	return <button className="listener-count-widget">Listeners: {numListeners}</button>;
};

export default ListenersCountWidget;
