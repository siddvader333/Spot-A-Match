import React from 'react';
import ListenersCountWidget from './ListenersCountWidget';
import LeaveSessionButton from './LeaveSessionButton';
import '../css/components/DashboardContentHeader.css';

export default class DashboardContentHeader extends React.Component {
	render() {
		return (
			<div className="dashboard-content-header">
				<p className="dashboard-content-title">{this.props.displayText}</p>
				<LeaveSessionButton displayText={this.props.leaveButtonText} />
				{this.props.path === '/dashboard/room-host' ? <ListenersCountWidget /> : null}
			</div>
		);
	}
}
