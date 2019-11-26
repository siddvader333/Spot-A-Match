import React from 'react';
import '../css/components/CurrentlyPlaying.css';
import SongBlock from './SongBlock';

class CurrentlyPlaying extends React.Component {
	render() {
		const songName = this.props.songList.currentPlaying.songName;
		const songArtist = this.props.songList.currentPlaying.artist;
		const premium = this.props.premium !== 'false';
		let button1 = null;
		let button2 = null;
		if (premium) {
			button1 = (
				<button className="controlButton" id="pause">
					{' '}
					l l{' '}
				</button>
			);
			button2 = (
				<button
					className="controlButton"
					id="next"
					onClick={(e) => {
						this.props.getnextsong(e);
					}}
				>
					{' '}
					►{' '}
				</button>
			);
		}
		console.log(songName);
		console.log(songArtist);
		return (
			<div className="currently-playing">
				{button1}
				{button2}
				<div className="song-info">
					{' '}
					{/*<SongBlock songName={songName} songArtist={songArtist} />{' '}*/}
					<h1 className="song-title-display">{songName}</h1>
					<h1 className="song-artist-display">{songArtist}</h1>
				</div>
			</div>
		);
	}
}

export default CurrentlyPlaying;
