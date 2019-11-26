import React from 'react';
import '../css/components/ListenersCountWidget.css';

const ListenersCountWidget = (props) => {
	const { ListenerCount } = props;
	return <button className="listener-count-widget">Listeners: {ListenerCount}</button>;
};

export default ListenersCountWidget;
