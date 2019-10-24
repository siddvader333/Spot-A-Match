import React from 'react';
import '../css/components/ReceivedMessage.css';

class ReceivedMessage extends React.Component{
    render(){
        return(
            <div>
                <h3 class = "other-user-message">{this.props.message} </h3>
            </div>
        );
    }
}

export default ReceivedMessage; 