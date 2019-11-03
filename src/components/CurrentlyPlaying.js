import React from 'react';
import '../css/components/CurrentlyPlaying.css';
import SongBlock from '../components/SongBlock';

class CurrentlyPlaying extends React.Component {
	render() {
		const songName = this.props.songList.currentPlaying.songName;
		const songArtist = this.props.songList.currentPlaying.artist;
		const premium = this.props.premium !== 'false';
		let button1 = null;
		let button2 = null;
		if (premium) {
			button1 = (
				<button class="controlButton" id="pause">
					{' '}
					l l{' '}
				</button>
			);
			button2 = (
				<button
					class="controlButton"
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
				<div className="song-info"> {/*<SongBlock songName={songName} songArtist={songArtist} />{' '}*/}</div>
			</div>
		);
	}
}

export default CurrentlyPlaying;
