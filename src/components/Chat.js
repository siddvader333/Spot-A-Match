import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

class Chat extends React.Component { 

	state = {
		message: "",
		messages: []
	}

	handleNewMessage = (event) =>{
		const target = event.target; 
		const value = target.value; 

		this.setState({
			message: value
		})
	}

	addMessage = () => {
		const messageList = this.state.messages; 
		const message = {
			content: this.state.message,
			type: "sent-message", 
			sender: "You"
		}
		messageList.push(message); 
		const message2 = {
			content: "Generic Response", 
			type: "received-message", 
			sender: "UserXYZ"
		}
		messageList.push(message2); 
		console.log(messageList); 
		this.setState({
			messages: messageList,
		})
	}

	render() {
		return (
			<div>
				<h3 className="chat-header"> Chat with UserXYZ </h3>
				<div dangerouslySetInnerHTML={{__html: this.element}}></div>
				<div className="chat-box">
					{ this.state.messages.map((message) => {
						if (message.type == "received-message"){
							return(
								<div className="received-message">
									<ReceivedMessage message={message.content} />
								</div>
							)
						}
						else if (message.type == "sent-message"){
							return(
								<div className="sent-message">
									<SentMessage message={message.content} />
								</div>
							)
						}
					})
					}
				</div>

				<React.Fragment>
					<form className="message-input-field">
						<input  className="chat-entry" 
								type="text" 
								placeholder="Enter your message here" 
								value = {this.state.message}
								onChange = {this.handleNewMessage}/>
						<input type="submit" value="Send" onClick = {this.addMessage}/>
					</form>
				</React.Fragment>

				<div
					style={{ float: 'left', clear: 'both' }}
					ref={(el) => {
						this.messagesEnd = el;
					}}
				/>
			</div>
		);
	}
}

export default Chat;
