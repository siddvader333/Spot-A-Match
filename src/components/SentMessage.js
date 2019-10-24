import React from 'react';
import '../css/components/SentMessage.css';

class SentMessage extends React.Component{
    render(){
        return(
            <div>
                <h3 class = "self-message">{this.props.message} </h3>
            </div>
        );
    }
}

export default SentMessage; 