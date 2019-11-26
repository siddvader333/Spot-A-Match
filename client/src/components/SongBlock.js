import React from 'react';
import '../css/components/SongBlock.css';

class SongBlock extends React.Component {
	render() {
		return (
			<div className="song-box">
				<div className="row">
					<div className=" song-description">
						<h1 className="song-title">{this.props.songName}</h1>
						<h1 className="song-artist">{this.props.songArtist}</h1>
					</div>
					{/**<div className="song-info-btn">
						<a href="#">
							<button>i</button>
						</a>
					</div>*/}
				</div>
			</div>
		);
	}
}

export default SongBlock;
