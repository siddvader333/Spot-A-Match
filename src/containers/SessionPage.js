import React from 'react';
import '../css/containers/SessionPage.css';
import SongBlock from '../components/SongBlock';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import Chat from '../components/Chat';

class SessionPage extends React.Component {
	render() {
		return (
			<div className="session-page">
				<br />
				{/*<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>*/}
				<div className="row">
					<div className="song-queue col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<UpNextSongList/>
						<AddSongsBtnSession />
					</div>

					<div className="chat col-md">
						<Chat />
					</div>
				</div>
			</div>
		);
	}
}

export default SessionPage;
