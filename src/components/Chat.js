import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

class Chat extends React.Component {
	state = {
		message: '',
		messages: []
	};

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom() {
		this.bottomMessage.scrollIntoView({ behavior: 'smooth' });
	}

	handleNewMessage = (event) => {
		event.preventDefault();
		const target = event.target;
		const value = target.value;

		this.setState({
			message: value
		});
	};

	addMessage = (e) => {
		e.preventDefault();

		if (this.state.message === '') return;

		const messageList = this.state.messages;
		const message = {
			content: this.state.message,
			type: 'sent-message',
			sender: 'You'
		};
		messageList.push(message);

		//NOTE: WE HARDCODED THE RESPONSES FOR THE CHAT
		//IN OUR REAL APPLICATION, IT WOULD TRULY BE TWO USERS TALKING, AND NOT AN AUTOMATED RESPONSE
		const message2 = {
			content: 'Generic Response',
			type: 'received-message',
			sender: 'UserXYZ'
		};
		messageList.push(message2);
		this.setState({
			messages: messageList,
			message: ''
		});
	};

	render() {
		return (
			<div>
				<h3 className="chat-header"> Chat with UserXYZ </h3>
				<div className="chat-box">
					{this.state.messages.map((message) => {
						if (message.type === 'received-message') {
							return (
								<div className="received-message">
									<ReceivedMessage message={message.content} sender={message.sender} />
								</div>
							);
						} else if (message.type === 'sent-message') {
							return (
								<div className="sent-message">
									<SentMessage message={message.content} sender={message.sender} />
								</div>
							);
						}
					})}
					<div
						style={{ float: 'left', clear: 'both' }}
						ref={(bottomMessage) => {
							this.bottomMessage = bottomMessage;
						}}
					/>
				</div>

				<React.Fragment>
					<form className="message-input-field">
						<input
							className="chat-entry"
							type="text"
							placeholder="Enter your message here"
							value={this.state.message}
							onChange={this.handleNewMessage}
						/>
						<input
							className="send-button"
							type="submit"
							value="Send"
							onClick={(e) => {
								this.addMessage(e);
							}}
						/>
					</form>
				</React.Fragment>
			</div>
		);
	}
}

export default Chat;
