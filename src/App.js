import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import DashboardContainer from './containers/DashboardContainer';
import SessionPage from './containers/SessionPage';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={DashboardContainer} />
					<Route path ="/session" component={SessionPage}/>
					<Route path="" component={LoginPage}/>
					
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
