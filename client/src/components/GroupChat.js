import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import io from 'socket.io-client';
class GroupChat extends React.Component {
	constructor(props){
		super(props); 
		
		var socket = io.connect('http://localhost:8888/room-chat');
		socket.on('connect', function(data) {
			console.log('connected');
		});
		socket.on('messageSent', (data) => {
			if (data.roomId === this.props.roomId) {
				const messageList = this.state.messages;
				const message = {
					content: data.message.content,
					type: 'received-message',
					sender: data.sender
				};
				messageList.push(message);
				this.setState({
					messages: messageList,
					roomId: this.props.roomId
				});
			}
		});
		
		this.state = {
			message: '',
			messages: [], 
			socket: socket, 
			roomId: '', 
			displayName: this.props.displayName
		};

	}

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

		this.setState({
			messages: messageList,
			message: ''
		});

		this.state.socket.emit('sendMessage', { roomId: this.props.roomId, message: message, sender: this.props.displayName });
	};

	render() {
		return (
			<div>
				<h3 className="chat-header"> Group Chat with {this.props.roomDisplayName} </h3>
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

export default GroupChat;
