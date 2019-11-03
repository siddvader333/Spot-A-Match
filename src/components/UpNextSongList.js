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
                                <SongBlock songName={song.title} songArtist = {song.artist}/>
                            </div>
                        )
					})}


                    {/**idk how to make the scroll margin chage so making a extra div */}
                    
                    {/* <SongBlock
                        songName="Gang Up"
                        songArtist="Young Thug, 2 Chainz, Wiz Khalifa, Pnb Rock"
                    />
                    <SongBlock songName="Loaded Gun" songArtist="6lack" />
                    <SongBlock songName="3005" songArtist="Childish Gambino" />
                    <SongBlock songName="Wesley's Theory" songArtist="Kendrick Lamar" />
                    <SongBlock songName="POWER" songArtist="Kanye West" /> */}
                </div>
            </div>
        );
    }
}



export default UpNextSongList;