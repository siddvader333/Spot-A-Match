import React from 'react';
import '../css/components/Chat.css';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import io from 'socket.io-client';
class Chat extends React.Component {
	constructor(props) {
		super(props);
		//const socket = io.connect();

		var socket = io.connect('http://localhost:4200');
		socket.on('connection', function(data) {
			console.log('connected');
			socket.emit('join', 'Hello World from client');
		});

		socket.on('messageSent', (msg) => {
			console.log(msg);
			this.setState({ message: msg });

			const messageList = this.state.messages;
			const message = {
				content: msg,
				type: 'received-message',
				sender: 'UserXYZ'
			};
			messageList.push(message);
			this.setState({
				messages: messageList,
				message: ''
			});
		});
		this.state = {
			message: '',
			messages: [],
			socket: socket
		};
	}

	componentDidMount() {
		this.scrollToBottom();
		//const socket = socketIOClient('http://127.0.0.1:4200');
		//socket.on('messageSent', (msg) => this.setState({ message: msg }));
		//this.addMessage();
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

		//NOTE: WE HARDCODED THE RESPONSES FOR THE CHAT
		//IN OUR REAL APPLICATION, IT WOULD TRULY BE TWO USERS TALKING, AND NOT AN AUTOMATED RESPONSE
		/*const message2 = {
			content: 'Generic Response',
			type: 'received-message',
			sender: 'UserXYZ'
		};
		messageList.push(message2);*/
		this.setState({
			messages: messageList,
			message: ''
		});

		//const socket = socketIOClient('http://localhost:8888/4200');
		//var socket = io.connect('http://localhost:4200');
		console.log('here');
		this.state.socket.emit('sendMessage', message);
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
