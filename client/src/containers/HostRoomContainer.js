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

		var socket = io.connect('https://mighty-refuge-58998.herokuapp.com/host-session');
		//var socket = io.connect('/host-session');
		socket.on('connect', function(data) {
			console.log('host-session socket connected');
		});

		socket.on('requestSong', (data) => {
			const newList = this.state.suggestedList;
			newList.push(data.song);
			this.setState({ suggestedList: newList });
		});

		this.state = {
			currentPlaying: '', //currentSong,
			currentSongList: [], //songList,
			suggestedList: [],
			deviceID: '',
			player_Spotify: {},
			socket: socket
		};
		this.nextSong = this.nextSong.bind(this);
		this.acceptSong = this.acceptSong.bind(this);
		this.rejectSong = this.rejectSong.bind(this);
		this.pauseSong = this.pauseSong.bind(this);
	}

	// state = {
	// 	currentPlaying: '',
	// 	currentSongList: [],
	// 	deviceID: "",
	// 	player_Spotify: {}
	// };

	async componentDidMount() {
		const response = await fetch('/profile', {
			method: 'GET',
			headers: { 'Content-Type': 'applications/json' }
		});
		const responseJSON = await response.json();
		const token = responseJSON.currentAccessToken;

		var player = new window.Spotify.Player({
			name: 'Spot-A-Match Player',
			getOAuthToken: (callback) => {
				callback(token);
			},
			volume: 0.5
		});
		// console.log("the player");
		// console.log(player);
		console.log(token);

		player.connect().then((success) => {
			if (success) {
				console.log('The Web Playback SDK successfully connected to Spotify!');
			}
		});
		player.addListener('ready', ({ device_id }) => {
			console.log('The Web Playback SDK is ready to play music!');
			console.log('Device ID', device_id);
			this.setState({ deviceID: device_id });
		});
		this.setState({ player_Spotify: player });
	}

	nextSong = async (e) => {
		if (e) {
			e.preventDefault();
		}
		let currentSong = this.state.currentPlaying;
		const currentList = this.state.currentSongList;
		if (currentList.length > 0) currentSong = currentList.shift();
		this.setState({
			currentPlaying: currentSong,
			currentSongList: currentList
		});

		if (e) {
			this.state.socket.emit('hostSkipSong', { uniqueId: this.props.uniqueId });
		}
		console.log(this.state.currentSongList);
		console.log(currentSong);

		const response = await fetch('/profile', {
			method: 'GET',
			headers: { 'Content-Type': 'applications/json' }
		});
		const responseJSON = await response.json();
		const token = responseJSON.currentAccessToken;
		console.log(token);

		let songRequest = {
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				uris: [ currentSong.trackURI ],
				offset: {
					position: 0
				},
				position_ms: 0
			}),
			mode: 'cors',
			cache: 'default'
		};

		const playURL = 'https://api.spotify.com/v1/me/player/play?device_id=' + this.state.deviceID; //+ this.state.deviceID;
		await fetch(playURL, songRequest);
	};

	pauseSong = async (e) => {
		if (e) {
			e.preventDefault();
		}
		console.log('trying to pause song');
		this.state.player_Spotify.togglePlay().then(() => {
			console.log('Toggled playback!');
		});
		if (e) {
			this.state.socket.emit('hostPausedSong', { roomId: this.props.roomId });
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('here');
		if (nextProps.exitSession) {
			prevState.socket.emit('leaveSession', { uniqueId: nextProps.uniqueId });
			nextProps.stopSending();
			history.push('/dashboard');
		}
		if (nextProps.songToAdd == {}) {
			return;
		}
		if (nextProps.songToAdd.songName !== '') {
			const newList = prevState.currentSongList;
			newList.push(nextProps.songToAdd);
			prevState.currentSongList = newList;
			console.log(newList);
			nextProps.createFlashMessage(nextProps.songToAdd.songName + ' was added to the list!');
			console.log('host added song');
			prevState.socket.emit('hostAddSong', {
				song: nextProps.songToAdd,
				roomId: nextProps.roomId
			});
			nextProps.stopSending();
			return prevState;
		}
	}

	acceptSong(song) {
		//remove from suggestedList
		const newSuggestedList = this.state.suggestedList.filter(
			//returns a new list with everything except the song
			(item) => {
				return item.songName !== song.songName;
			}
		);
		this.setState({ suggestedList: newSuggestedList });
		console.log('list', this.state.suggestedList);
		console.log('song,', song);
		//add
		const newSongList = this.state.currentSongList.push({ songName: song.songName, artist: song.songArtist });
		console.log(newSongList);
		this.state.socket.emit('hostAddSong', {
			song: song,
			roomId: this.props.roomId
		});
	}

	rejectSong = (song) => {
		const newSuggestedList = this.state.suggestedList.filter((item) => {
			return item.songName !== song.songName;
		});
		this.setState({ suggestedList: newSuggestedList });
	};

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
							roomDisplayName="You"
							roomId={this.props.roomId}
							displayName={this.props.displayName}
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

				<CurrentlyPlaying
					getnextsong={this.nextSong}
					pause={this.pauseSong}
					songList={this.state}
					premium="true"
				/>
			</div>
		);
	}
}

export default HostRoomContainer;
