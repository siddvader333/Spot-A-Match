import React from 'react';
import '../css/containers/SessionPage.css';
//import SongBlock from '../components/SongBlock';
import AddSongsBtnSession from '../components/AddSongsBtnSession';
import UpNextSongList from '../components/UpNextSongList';
//import Chat from '../components/Chat';
import GroupChat from '../components/GroupChat';
import CurrentlyPlaying from '../components/CurrentlyPlaying';

class HostRoomContainer extends React.Component {

	constructor(props){
		super(props);
		const song1 = {
			title: "Gang Up", 
			artist: "Young Thug, 2 Chainz, Wiz Khalifa, Pnb Rock"
		}
		const song2 = {
			title: "Loaded Gun", 
			artist: "6lack"
		}
		const song3 = {
			title: "3005", 
			artist: "Childish Gambino"
		}
		const song4 = {
			title: "Wesley's Theory", 
			artist: "Kendrick Lamar"
		}
		const song5 = {
			title: "POWER", 
			artist: "Kanye West"
		} 
		const songList = []; 
		songList.push(song2);
		songList.push(song3); 
		songList.push(song4); 
		songList.push(song5);
		this.state = {
			currentPlaying: song1, 
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
						<AddSongsBtnSession displayText="+ Request" />
					</div>

					<div className="chat col-md">
						<GroupChat />
					</div>
				</div>
				<div className="row">
					<CurrentlyPlaying getnextsong = {this.nextSong} songList = {this.state} premium = "false"/>
				</div>
			</div>
		);
	}
}

export default HostRoomContainer;
