import React from 'react';
import '../css/components/LoginSpotifyButton.css';

class LoginSpotifyButton extends React.Component {
	render() {
		return (
			<a href="/dashboard">
				<button onClick={this.props.onClick} className="log-in-spotify">
					{this.props.displayText}
				</button>
			</a>
		);
	}
}

export default LoginSpotifyButton;
