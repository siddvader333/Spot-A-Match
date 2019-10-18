import React from 'react';
import '../css/containers/SessionPage.css';
import SongBlock from '../components/SongBlock';
import AddSongsBtnSession from '../components/AddSongsBtnSession';

class SessionPage extends React.Component {
	render() {
		return (
			<div className="session-page">
				<br />
				<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>
				<div className="row">
					<div className="song-queue col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<div className="song-list">
							<div className="song-list-inner">
								{' '}
								{/**idk how to make the scroll margin chage so making a extra div */}
								<SongBlock
									songName="Gang Up"
									songArtist="Young Thug, 2 Chainz, Wiz Khalifa, Pnb Rock"
								/>
								<SongBlock songName="Loaded Gun" songArtist="6lack" />
								<SongBlock songName="3005" songArtist="Childish Gambino" />
								<SongBlock songName="Wesley's Theory" songArtist="Kendrick Lamar" />
								<SongBlock songName="POWER" songArtist="Kanye West" />
							</div>
						</div>

						<AddSongsBtnSession />
					</div>

					<div className="chat col-md">
						<h4>CHAT</h4>
					</div>
				</div>
			</div>
		);
	}
}

export default SessionPage;
