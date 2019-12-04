import React from 'react';
import '../css/containers/SessionPage.css';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
import GroupChat from '../components/GroupChat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';
import { fakeSearchResults } from '../util/Data.js';
import history from '../util/History';
import io from 'socket.io-client';

class HostRoomContainer extends React.Component {
	constructor(props) {
		super(props);

		var socket = io.connect('https://mighty-refuge-58998.herokuapp.com/host-session');
		socket.on('connect', function(data) {
			console.log('host-session socket connected');
		});
		socket.on('hostLeave', function(data) {
			history.push('/dashboard');
		});

		socket.on('hostAddSong', (data) => {
			console.log('host added a song');
			if (data.roomId === this.props.roomId) {
				const newList = this.state.currentSongList;
				newList.push(data.song);
				this.setState({ currentSongList: newList });
			}
		});

		socket.on('hostPausedSong', (data) => {
			if (data.roomiD === this.props.roomId) {
				this.pauseSong();
			}
		});
		socket.on('hostSkipSong', (data) => {
			if (data.roomId === this.props.roomId) {
				this.nextSong();
			}
		});
		this.state = {
			currentPlaying: '',
			currentSongList: [],
			socket: socket,
			deviceID: '',
			player_Spotify: {}
		};
		this.nextSong = this.nextSong.bind(this);
		this.pauseSong = this.pauseSong.bind(this);
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
			//const newList = prevState.currentSongList;
			//newList.push(nextProps.songToAdd);
			//prevState.currentSongList = newList;
			nextProps.createFlashMessage(nextProps.songToAdd.songName + ' was added to the list!');
			console.log('trying to request a song');
			prevState.socket.emit('requestSong', {
				song: nextProps.songToAdd,
				roomId: nextProps.roomId
			});
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
							roomDisplayName={this.props.hostName}
							roomId={this.props.roomId}
							displayName={this.props.displayName}
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
