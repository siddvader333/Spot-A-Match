import React from 'react';
import '../css/components/SongSuggestionList.css';
import SongBlockSuggestion from './SongBlockSuggestion';

class UpNextSongList extends React.Component {
	render() {
		return (
			<div className="song-list">
				<div className="song-list-inner">
					{this.props.suggestedList.map((song) => {
						return (
							<div>
								<SongBlockSuggestion
									songName={song.songName}
									songArtist={song.artist}
									trackURI={song.trackURI}
									acceptSong={this.props.acceptSong}
									rejectSong={this.props.rejectSong}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default UpNextSongList;
