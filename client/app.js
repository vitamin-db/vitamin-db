// require packages
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
// Router functions
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
// these don't work for some reason
// const DefaultRoute = Router.DefaultRoute;
// const NotFoundRoute = Router.NotFoundRoute;
// require component
const Splash = require('./containers/SplashView');
// require store
const Provider = require('react-redux').Provider;
const Store = require('./store/Store');
const store = Store();
// temporary history
// const hashHistory = ReactRouter.hashHistory;
// add in real history later
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const browserHistory = ReactRouter.browserHistory;
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Splash} />
		</Router>
	</Provider>,
	document.getElementById('app')
);