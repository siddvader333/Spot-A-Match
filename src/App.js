import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/dashboard" component={DashboardContainer} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
