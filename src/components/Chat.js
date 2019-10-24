import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage'; 
import SentMessage from './SentMessage'; 

class Chat extends React.Component{
    render(){
        return(
            <div>
                <h3 className = "chat-header"> Chat with UserXYZ </h3>
                <div className = "chat-box">
                    <div className = "received-message">
                        <ReceivedMessage message="This is a message"/>
                    </div>
                    <div className = "received-message">
                        <ReceivedMessage message="This is a slightly longer message to show resizing"/>
                    </div>
                    <div className = "received-message">
                        <ReceivedMessage message="This is a very very very very very very very very long message to show the newline break"/>
                    </div>
                    <div className = "sent-message">
                        <ReceivedMessage message="This is a very very very very very very very very long message to show the newline break AND the user response!"/>
                    </div>
                    <div className = "received-message">
                        <ReceivedMessage message="This is a message"/>
                    </div>
                    <div className = "received-message">
                        <ReceivedMessage message="This is a message"/>
                    </div>
                    <div className = "received-message">
                        <ReceivedMessage message="This is a message"/>
                    </div>
                </div>

                <React.Fragment>
                <form className = "message-input-field">
                    <label>
                        <input type="text" placeholder="Enter your message here" class = "typng-fiield"/>
                    </label>
                    <input type="submit" />
                    </form>
                </React.Fragment>

            </div>
            
        );
    }
}

export default Chat; 