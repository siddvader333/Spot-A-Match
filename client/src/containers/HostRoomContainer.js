import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import SongSuggestionList from '../components/SongSuggestionList';
import GroupChat from '../components/GroupChat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults, suggestedSongs } from '../util/Data.js';
import history from '../util/History';
import io from 'socket.io-client';

class HostRoomContainer extends React.Component {
	constructor(props) {
		super(props);

		//NOTE: WE HARDCODED THESE SONGS INTO OUR APPLICATION
		//IN OUR REAL APPLICATION, THIS WOULD BE DONE THROUGH THE SPOTIFY API
		const songList = Array.from(fakeSearchResults);
		const currentSong = songList.shift();

		const suggestedList = Array.from(suggestedSongs);

		this.state = {
			currentPlaying: currentSong,
			currentSongList: songList,
			suggestedList: suggestedList
		};
		this.nextSong = this.nextSong.bind(this);
		this.acceptSong = this.acceptSong.bind(this);
		this.rejectSong = this.rejectSong.bind(this);

		var roomSocket = io.connect('http://localhost:4200/room_queue');
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

	acceptSong(song) {
		//remove from suggestedList
		const newSuggestedList = this.state.suggestedList.filter(
			//returns a new list with everything except the song
			(item) => {
				return item.songName !== song.songName;
			}
		);
		this.setState({ suggestedList: newSuggestedList });
		//add
		const newSongList = this.state.currentSongList.push({ songName: song.songName, artist: song.songArtist });
	}

	rejectSong = (song) => {
		const newSuggestedList = this.state.suggestedList.filter((item) => {
			return item.songName !== song.songName;
		});
		this.setState({ suggestedList: newSuggestedList });
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.songToAdd == {}) {
			console.log('empty props');
			return;
		}
		if (nextProps.songToAdd.songName !== '') {
			console.log('new song that is not empty');
			const newList = prevState.currentSongList;
			newList.push(nextProps.songToAdd);
			prevState.currentSongList = newList;
			nextProps.createFlashMessage(nextProps.songToAdd.songName + ' was added to the list!');
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
						<AddSongsBtnSession onClick={this.props.addSong} displayText="+ Add Song" />
					</div>

					<div className="chat col-md">
						<GroupChat 
							roomDisplayName = "You"
							roomId = {this.props.roomId}
							displayName = {this.props.displayName}
						/>
					</div>
				</div>
				<br />
				<br />
				<br />

				<div className="row">
					{/*placeholder*/}
					{/* <div className="col-md">
						<h3 className>USER LIST TBA</h3>
					</div> */}

					<div className="suggested-queue col-md">
						<h3 className="suggested-songs">Suggested Songs</h3>
						<SongSuggestionList
							suggestedList={this.state.suggestedList}
							acceptSong={this.acceptSong}
							rejectSong={this.rejectSong}
						/>
					</div>
				</div>

				<CurrentlyPlaying getnextsong={this.nextSong} songList={this.state} premium="true" />
			</div>
		);
	}
}

export default HostRoomContainer;
