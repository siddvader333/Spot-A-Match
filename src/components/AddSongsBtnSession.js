import React from 'react'
import '../css/components/AddSongsBtnSession.css';

class AddSongsBtnSession extends React.Component{
    render(){        
        return (

            <a href="/session">
              <button className="add-songs-session">
                + Add Songs
              </button>
            </a>
  
      );
    }
}

export default AddSongsBtnSession;