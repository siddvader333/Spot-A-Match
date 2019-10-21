import React from 'react';
import '../css/components/ListenersCountWidget.css';

const ListenersCountWidget = (props) => {
	const { ListenerCount } = props;
	return <button className="listener-count-widget">Listener Count: {ListenerCount}</button>;
};

export default ListenersCountWidget;
