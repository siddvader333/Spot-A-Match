import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import GroupChat from '../components/GroupChat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults } from '../util/Data.js';

class HostRoomContainer extends React.Component {
	
	constructor(props){
		super(props);

		//NOTE: WE HARDCODED THESE SONGS INTO OUR APPLICATION
		//IN OUR REAL APPLICATION, THIS WOULD BE DONE THROUGH THE SPOTIFY API
		let songList = fakeSearchResults; 
		const currentSong = songList.shift(); 
		this.state = {
			currentPlaying: currentSong, 
			currentSongList: songList
		}
		this.nextSong = this.nextSong.bind(this);
	}

	state = {
		currentPlaying: "",
		currentSongList: []
	}

	nextSong = (e) => {
		e.preventDefault(); 
		let currentSong = this.state.currentPlaying;
		const currentList = this.state.currentSongList; 
		if (currentList.length > 0)
			currentSong = currentList.shift(); 
		this.setState({
			currentPlaying: currentSong, 
			currentSongList: currentList
		})
	}
	
	render() {
		return (
			<div className="session-page">
				<br />
				{/*<h1 className="queue-user-text">You're in a queue with NameXYZ</h1>*/}
				<div className="row">
					<div className="song-queue col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<UpNextSongList songList = {this.state.currentSongList}/>
						<AddSongsBtnSession displayText="+ Add Song" />
					</div>

					<div className="chat col-md">
						<GroupChat />
					</div>
				</div>
				<div className="row">
					<CurrentlyPlaying getnextsong = {this.nextSong} songList = {this.state} premium = "true"/>
				</div>
			</div>
		);
	}
}

export default HostRoomContainer;
