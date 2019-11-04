import React from 'react';
import '../css/components/PersonBlock.css';

class PersonBlock extends React.Component {

    render() {
		return (
			<div className="song-box-suggestion">
				<div className="row">
					<div className="person-content">
						<h1 className="person-name">{this.props.name}</h1>
					</div>
					<div className="person-delete">
						<button onClick = {()=> this.props.deleteListener(this.props.name)}>
							x
						</button>
					</div>
				</div>
			</div>
		);
	}
}













// 	render() {
// 		return (
// 			<div className="person-box">
// 				<div className="row">
// 					<div className="song-description">
// 						<h1 className="song-title">{this.props.name}</h1>
// 					</div>

// 					</div>
// 					<div className="person-delete">
// 						<button onClick = {()=> this.props.rejectSong({songName: this.props.songName, songArtist: this.props.songArtist})}>
// 							x
// 						</button>
// 					</div>
// 			</div>
		
// 		);
// 	}
// }

export default PersonBlock;
