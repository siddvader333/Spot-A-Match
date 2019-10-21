import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import DashboardContainer from './containers/DashboardContainer';
import SessionPage from './containers/SessionPage';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTrack: ''
		};
		this.setCurrentTrack = this.setCurrentTrack.bind(this);
		AOS.init();
	}

	setCurrentTrack(event) {
		console.log(event.target.classList[0]);
		this.setState({ currentTrack: event.target.classList[0] });
	}
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={DashboardContainer} />
					<Route path="" component={LoginPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
