import React from 'react';
import '../css/containers/LoginPage.css';
import LoginSpotifyButton from '../components/LoginSpotifyButton';
import LoginProButton from '../components/LoginProButton';
import cookieFunctions from '../util/Cookie';

function LoginPage() {
	return (
		<div className="main row">
			<div className="left col-md">
				<h1 className="title">Spot-A-Match</h1>
				<h1 className="slogan">
					Find new music, <em>your</em> way
				</h1>
			</div>

			<div className="right col-md">
				<LoginSpotifyButton
					onClick={() => {
						cookieFunctions.setCookie('premium-status', 'false');
					}}
					displayText="Log in with Spotify"
				/>
				<br />
				<LoginProButton
					onClick={() => {
						cookieFunctions.setCookie('premium-status', 'true');
					}}
					displayText="Log in as PRO"
				/>
			</div>
		</div>
	);
}

export default LoginPage;
