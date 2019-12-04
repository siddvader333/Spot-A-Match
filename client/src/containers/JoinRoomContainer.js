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

		var socket = io.connect('http://localhost:8888/host-session');
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
			socket: socket
		};
		this.nextSong = this.nextSong.bind(this);
	}

	nextSong = (e) => {
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
