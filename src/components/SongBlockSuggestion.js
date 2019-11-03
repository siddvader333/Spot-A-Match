import React from 'react';
import '../css/components/SongBlockSuggestion.css';

class SongBlockSuggestion extends React.Component {

	render() {
		return (
			<div className="song-box-suggestion">
				<div className="row">
					<div className=" song-description">
						<h1 className="song-title">{this.props.songName}</h1>
						<h1 className="song-artist">{this.props.songArtist}</h1>
					</div>
					<div className="song-accept-btn">
						<button onClick = {()=>this.props.acceptSong({songName: this.props.songName, songArtist: this.props.songArtist})}>
							+
						</button>
						
					</div>
					<div className="song-reject-btn">
						<button onClick = {()=> this.props.rejectSong({songName: this.props.songName, songArtist: this.props.songArtist})}>
							x
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default SongBlockSuggestion;
