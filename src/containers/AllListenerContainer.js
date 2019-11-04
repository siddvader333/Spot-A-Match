import React from 'react'
import SongBlock from '../components/PersonBlock';
import PersonBlock from '../components/PersonBlock';


class AllListenerContainer extends React.Component{

    render(){
        return(
            <div className="song-list">
                <div className="song-list-inner">    
                    <PersonBlock name="asdasdadsda" deleteListener={this.deleteListener}/>
                    <PersonBlock name="asdasdadsda" deleteListener={this.deleteListener}/>
                    <PersonBlock name="asdasdadsda"/>
                    <PersonBlock name="asdasdadsda"/>
                    <PersonBlock name="asdasdadsda"/>
                </div>
            </div>
        );
    }
}



export default AllListenerContainer;