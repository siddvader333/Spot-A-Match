import React from 'react';
import '../css/containers/SessionPage.css';
import SongBlock from '../components/SongBlock';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import SongSuggestionList from '../components/SongSuggestionList';

class SessionPage extends React.Component {
	render() {
		return (
			<div className="session-page">
				<br />
				{/*<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>*/}
				<div className="row">
					<div className="song-queue col-md">
						<h3 className="up-next">Up Next:</h3>
						<UpNextSongList/>
						<AddSongsBtnSession />
					</div>

					<div className="suggested-queue col-md">
						<h3 className="suggested-songs">Suggested Songs</h3>
						<SongSuggestionList/>
					</div>
				</div>
			</div>
		);
	}
}

export default SessionPage;
