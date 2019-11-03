import React from 'react'
import '../css/components/SongSuggestionList.css';
import SongBlockSuggestion from '../components/SongBlockSuggestion';

class UpNextSongList extends React.Component{

    render(){
        console.log(this.props);
        return(
            <div className="song-list">
                <div className="song-list-inner">            
                    {this.props.suggestedList.map((song) => {	
                        return(
                            <div>
                                <SongBlockSuggestion 
                                    songName={song.songName} 
                                    songArtist = {song.artist} 
                                    acceptSong ={this.props.acceptSong}
                                    rejectSong = {this.props.rejectSong}
                                />
                            </div>
                        )
					})}
                    
                    
                    
                    {/**idk how to make the scroll margin chage so making a extra div 
                    <SongBlockSuggestion
                        songName="Gang Up"
                        songArtist="Young Thug, 2 Chainz, Wiz Khalifa, Pnb Rock"
                    />
                    <SongBlockSuggestion songName="Loaded Gun" songArtist="6lack" />
                    <SongBlockSuggestion songName="3005" songArtist="Childish Gambino" />
                    <SongBlockSuggestion songName="Wesley's Theory" songArtist="Kendrick Lamar" />
                    <SongBlockSuggestion songName="POWER" songArtist="Kanye West" /> */}
                </div>
            </div>
        );
    }
}



export default UpNextSongList;