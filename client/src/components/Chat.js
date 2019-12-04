import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import io from 'socket.io-client';
class Chat extends React.Component {
	constructor(props) {
		super(props);

		var socket = io.connect('https://mighty-refuge-58998.herokuapp.com/private-session-chat');
		socket.on('connect', function(data) {
			console.log('connected');
		});
		socket.on('disconnect', (data) => {
			console.log('disconnected');
		});
		socket.on('messageSent', (data) => {
			if (data.receipient === this.props.uniqueId) {
				const messageList = this.state.messages;
				const message = {
					content: data.message.content,
					type: 'received-message',
					sender: this.props.partnerDisplayName
				};
				messageList.push(message);
				this.setState({
					messages: messageList,
					message: ''
				});
			}
		});

		this.state = {
			message: '',
			messages: [],
			socket: socket,
			partnerReceived: false,
			partnerSocketId: ''
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
		console.log('trying to push' + this.state.message);
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

		this.state.socket.emit('sendMessage', { receipient: this.props.partnerUniqueId, message: message });
		
		//for a room, change it to roomID 
	};

	render() {
		return (
			<div>
				<h3 className="chat-header">{`Chat With ${this.props.partnerDisplayName}`}</h3>
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
