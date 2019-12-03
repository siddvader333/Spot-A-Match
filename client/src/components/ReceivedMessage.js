import React from 'react';
import '../css/components/ReceivedMessage.css';

class ReceivedMessage extends React.Component{
    render(){
        return(
            <div>
                <p className = "speaker"> {this.props.sender} </p>
                <h3 className = "other-user-message">{this.props.message} </h3>
            </div>
        );
    }
}

export default ReceivedMessage; 