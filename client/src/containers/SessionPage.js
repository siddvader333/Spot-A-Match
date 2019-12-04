import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import Chat from '../components/Chat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults, suggestedSongs } from '../util/Data.js';
import history from '../util/History';
import io from 'socket.io-client';

class SessionPage extends React.Component {
	constructor(props) {
		super(props);

		var socket = io.connect('http://localhost:8888/private-session');
		socket.on('connect', function(data) {
			console.log('private-session socket connected');
		});
		socket.on('partnerLeft', (data) => {
			if (data.uniqueId === this.props.partnerUniqueId) {
				history.push('/dashboard');
			}
		});
		socket.on('partnerSkipSong', (data) => {
			if (data.uniqueId === this.props.partnerUniqueId) {
				this.nextSong();
			}
		});
		socket.on('partnerAddSong', (data) => {
			if (data.uniqueId === this.props.partnerUniqueId) {
				const newList = this.state.currentSongList;
				newList.push(data.song);
				this.setState({ currentSongList: newList });
			}
		});

		this.state = {
			currentPlaying: {},
			currentSongList: [],
			socket: socket,
			deviceID: '',
			player_Spotify: {}
		};
		this.nextSong = this.nextSong.bind(this);
		this.pauseSong = this.pauseSong.bind(this);
		//this.acceptSong = this.acceptSong.bind(this);
	}

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

	/*state = {
		currentPlaying: '',
		currentSongList: []
	};*/

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

		//play the next song after an interval time equal to the current song

		console.log('fetch donezooh');
		if (e) {
			this.state.socket.emit('partnerSkipSong', { uniqueId: this.props.uniqueId });
		}
	};

	pauseSong = async (e) => {
		if (e) {
			e.preventDefault();
		}
		console.log('trying to pause song');
		this.state.player_Spotify.togglePlay().then(() => {
			console.log('Toggled playback!');
		});
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('here heheheh this shit works');
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
			nextProps.createFlashMessage(nextProps.songToAdd.songName + ' was added to the list!');
			prevState.socket.emit('partnerAddSong', {
				song: nextProps.songToAdd,
				uniqueId: nextProps.uniqueId
			});
			nextProps.stopSending();
			return prevState;
		}
	}

	newSong = (e) => {
		e.preventDefault();
		let currentList = this.state.currentSongList;
		const newSong = { title: 'Song Title', artist: 'Song Artist' };
		currentList.push(newSong);
		this.setState({
			currentSongList: currentList
		});
	};

	render() {
		return (
			<div className="session-page">
				<br />
				<h1 className="queue-user-text">{`You're in a queue with ${this.props.partnerDisplayName}`}</h1>
				<div className="row">
					<div className="song-queue xxx col-md">
						<h3 className="up-next-session">Up Next:</h3>
						<UpNextSongList songList={this.state.currentSongList} />
						<AddSongsBtnSession onClick={this.props.addSong} displayText="+ Add Song" />
					</div>

					<div className="chat col-md">
						<Chat
							partnerUniqueId={this.props.partnerUniqueId}
							uniqueId={this.props.uniqueId}
							partnerDisplayName={this.props.partnerDisplayName}
						/>
					</div>
				</div>
				<div className="current-playing">
					<CurrentlyPlaying
						getnextsong={this.nextSong}
						pause={this.pauseSong}
						songList={this.state}
						premium="true"
					/>
				</div>
				<div className="add-some-space-div">a</div>
			</div>
		);
	}
}

export default SessionPage;
