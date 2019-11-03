import React from 'react';
import '../css/components/LoginProButton.css';

class LoginProButton extends React.Component {
	render() {
		return (
			<a href="/dashboard">
				<button onClick={this.props.onClick} className="log-in-pro">
					{this.props.displayText}
				</button>
			</a>
		);
	}
}

export default LoginProButton;
