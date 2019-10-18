import React from 'react';
import '../css/components/LoginSpotifyButton.css';

class LoginSpotifyButton extends React.Component {
	render() {
		return (
			<a href="/dashboard">
				<button className="log-in-spotify">{this.props.displayText}</button>
			</a>
		);
	}
}

export default LoginSpotifyButton;
