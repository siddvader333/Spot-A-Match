import React from 'react';
import '../css/components/CurrentlyPlaying.css';
import SongBlock from '../components/SongBlock';

class CurrentlyPlaying extends React.Component { 

	render() {
		const songName = this.props.songList.currentPlaying.title; 
		const songArtist = this.props.songList.currentPlaying.artist; 
		console.log(songName); 
		console.log(songArtist); 
		return (
			<div className = "currently-playing">
                <button class = "controlButton" id = "pause"> l l </button>
                <button class = "controlButton" id = "next" onClick = {(e)=>{this.props.getnextsong(e)}}> ► </button>
				<div className = "song-info"> <SongBlock songName={songName} songArtist={songArtist} /> </div>
            </div>
		);
	}
}

export default CurrentlyPlaying;
