import React from 'react';
import '../css/components/LeaveSessionButton.css';

const LeaveSessionButton = (props) => {
	return (
		<a href="/dashboard">
			<button className="leave-session-button">{props.displayText}</button>
		</a>
	);
};

export default LeaveSessionButton;
