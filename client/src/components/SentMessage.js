import React from 'react';
import '../css/components/SentMessage.css';

class SentMessage extends React.Component{
    render(){
        return(
            <div>
                <p className = "speaker"> {this.props.sender} </p>
                <h3 className = "self-message">{this.props.message} </h3>
            </div>
        );
    }
}

export default SentMessage; 