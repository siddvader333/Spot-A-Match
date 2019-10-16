import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={DashboardContainer} />
					<Route>
						<h1>A 404 page would be here</h1>
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
