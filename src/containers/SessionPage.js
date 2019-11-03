import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import Chat from '../components/Chat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults, suggestedSongs } from '../util/Data.js';


class SessionPage extends React.Component {
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
		//this.acceptSong = this.acceptSong.bind(this);
		this.newSong = this.newSong.bind(this);
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



	newSong = (e) => {
		e.preventDefault();
		let currentList = this.state.currentSongList;
		const newSong = {title: "Song Title", artist: "Song Artist"};
		currentList.push(newSong);
		this.setState({
			currentSongList: currentList
		});
	}
	
	render() {
		return (
			<div className="session-page">
				<br />
				{/*<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>*/}
				<div className="row">
					<div className="song-queue xxx col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<UpNextSongList songList = {this.state.currentSongList}/>
						<AddSongsBtnSession displayText = "+ Add Song" addSong = {this.newSong}/>
					</div>

					<div className="suggested-queue col-md">
						<Chat/>						
					</div>
				</div>
				<div className="current-playing">
					<CurrentlyPlaying getnextsong={this.nextSong} songList={this.state} premium="true" />
				</div>
			</div>
		);
	}
}

export default SessionPage;
