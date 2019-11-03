import React from 'react'
import '../css/components/UpNextSongList.css';
import SongBlock from '../components/SongBlock';


class UpNextSongList extends React.Component{

    render(){
        return(
            <div className="song-list">
                <div className="song-list-inner">    
                    {this.props.songList.map((song) => {	
                        return(
                            <div>
                                <SongBlock songName={song.songName} songArtist = {song.artist}/>
                            </div>
                        )
					})}
                </div>
            </div>
        );
    }
}



export default UpNextSongList;