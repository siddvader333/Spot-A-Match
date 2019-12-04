import React from 'react';
import ListenersCountWidget from './ListenersCountWidget';
import LeaveSessionButton from './LeaveSessionButton';
import '../css/components/DashboardContentHeader.css';

export default class DashboardContentHeader extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="dashboard-content-header">
				{/*<p className="dashboard-content-title">{this.props.displayText}</p>*/}

				<LeaveSessionButton onClick={this.props.leaveSession} displayText={this.props.leaveButtonText} />
				
			</div>
		);
	}
}
