import React from 'react';
import '../css/components/LeaveSessionButton.css';

const LeaveSessionButton = (props) => {
	return (
		//{/*<a href="/dashboard">*/}
		<button onClick={props.onClick} className="leave-session-button">
			{props.displayText}
		</button>
		//{/*</a>*/}
	);
};

export default LeaveSessionButton;
