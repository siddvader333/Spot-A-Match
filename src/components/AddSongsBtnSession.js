import React from 'react';
import '../css/components/AddSongsBtnSession.css';

class AddSongsBtnSession extends React.Component {
	render() {
		return (
			<button className="add-songs-session" onClick={this.props.onClick}>
				{this.props.displayText}
			</button>
		);
	}
}

export default AddSongsBtnSession;
