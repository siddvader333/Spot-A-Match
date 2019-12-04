import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import GroupChat from '../components/GroupChat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults } from '../util/Data.js';

class HostRoomContainer extends React.Component {
	constructor(props) {
		super(props);

		//NOTE: WE HARDCODED THESE SONGS INTO OUR APPLICATION
		//IN OUR REAL APPLICATION, THIS WOULD BE DONE THROUGH THE SPOTIFY API
		const songList = Array.from(fakeSearchResults);
		const currentSong = songList.shift();
		this.state = {
			currentPlaying: currentSong,
			currentSongList: songList
		};
		this.nextSong = this.nextSong.bind(this);
	}

	state = {
		currentPlaying: '',
		currentSongList: []
	};

	nextSong = (e) => {
		e.preventDefault();
		let currentSong = this.state.currentPlaying;
		const currentList = this.state.currentSongList;
		if (currentList.length > 0) currentSong = currentList.shift();
		this.setState({
			currentPlaying: currentSong,
			currentSongList: currentList
		});
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.songToAdd == {}) {
			console.log('empty props');
			return;
		}
		if (nextProps.songToAdd.songName !== '') {
			nextProps.createFlashMessage(nextProps.songToAdd.songName + ' was requested to the host!');
			nextProps.stopSending();
			return prevState;
		}
	}

	render() {
		return (
			<div className="session-page">
				<br />
				{/*<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>*/}
				<div className="row">
					<div className="song-queue col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<UpNextSongList songList={this.state.currentSongList} />
						<AddSongsBtnSession onClick={this.props.addSong} displayText="+ Request" />
					</div>

					<div className="chat col-md">
						<GroupChat 
							roomDisplayName = {this.props.hostName} 
							roomId = {this.props.roomId}
							displayName = {this.props.displayName}
						/>
					</div>
				</div>
				<div className="current-playing">
					<CurrentlyPlaying getnextsong={this.nextSong} songList={this.state} premium="false" />
				</div>
				<div className="add-some-space-div">a</div>
			</div>
		);
	}
}

export default HostRoomContainer;
