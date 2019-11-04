import React from 'react';
import '../css/components/DashboardOptions.css';
import authFunctions from '../util/Auth';
import DashboardFlashMessage from './DashboardFlashMessage';

class DashboardOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: '/dashboard/room-host' //ignore this, ended up not needing it
		};
		this.flashMessage = this.flashMessage.bind(this);
	}

	flashMessage = (e) => {
		e.preventDefault();
		console.log('Flash');
		return (
			<DashboardFlashMessage
				duration="2000"
				displayText="You must upgrade to a premium membership to use that feature!"
			/>
		);
	};

	render() {
		let roomPath;
		if (authFunctions.isPremium() === false) {
			//roomPath = '/dashboard';
			roomPath = (
				<button
					className="action-button"
					onClick={() => {
						this.props.createFlashMessage('You must upgrade to a premium membership to use that feature!');
					}}
				>
					Host Room
				</button>
			);
		} else {
			//roomPath = '/dashboard/room-host';
			roomPath = (
				<a href="/dashboard/room-host">
					<button className="action-button">Host Room</button>
				</a>
			);
		}
		return (
			<div className="container">
				<div className="box">
					<div className="imgBox">
						<img src="https://rxmusic.com/wp-content/uploads/2018/04/Dollarphotoclub_74179490.jpg" />
					</div>
					<div className="details">
						<div className="content">
							<h2>Join a session with another listener.</h2>
							<a href="/dashboard/session">
								<button className="action-button">Start Session</button>
							</a>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="imgBox">
						<img src="https://media.timeout.com/images/102182623/630/472/image.jpg" />
					</div>
					<div className="details">
						<div className="content">
							<h2>Join a hosted room and enjoy the ride.</h2>
							<a href="/dashboard/room-listener">
								<button className="action-button">Join Room</button>
							</a>
						</div>
					</div>
				</div>
				<div className="box">
					<div className="imgBox">
						<img src="https://www.wallpaperup.com/uploads/wallpapers/2013/11/09/172018/a83393b8e0ba294b604cd8fb1cc76cc6-700.jpg" />
					</div>
					<div className="details">
						<div className="content">
							<h2>Host your own room (Premium Feature).</h2>
							{/* <a href={roomPath}>
                            <button className="action-button">Host Room</button>
                            </a> */}
							{roomPath}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DashboardOptions;
