import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import DashboardContainer from './containers/DashboardContainer';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={DashboardContainer} />
					<Route path="" component={LoginPage}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
