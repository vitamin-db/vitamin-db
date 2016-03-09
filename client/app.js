// require packages
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
// Router functions
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
// require component
const Splash = require('./containers/SplashView');
// require store
const Provider = require('react-redux').Provider;
const Store = require('./store/Store');
const store = Store();
// require history and sync it with the store
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const browserHistory = ReactRouter.browserHistory;
const history = syncHistoryWithStore(browserHistory, store);

// this  .render will be our paths
// name="..." is just a name, but works as a path IF NO path is specified
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route name="Splash" path="/" component={Splash} />
		</Router>
	</Provider>,
	document.getElementById('app')
);