// require packages
const React          = require('react');
const ReactDOM       = require('react-dom');
const ReactRouter    = require('react-router');
// Router functions
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
// require components
const NavBar         = require('./containers/Header');
const Splash         = require('./containers/SplashView');
const Home           = require('./containers/DashboardView');
const Profile        = require('./containers/ProfileView');
const Appointment    = require('./containers/AppointmentView');
const SignUp         = require('./containers/SignUpView');
// require store
const Provider       = require('react-redux').Provider;
const Store          = require('./store/Store');
const store          = Store();
// require history and sync it with the store
const syncHiStore    = require('react-router-redux').syncHistoryWithStore;
const browserHistory = ReactRouter.browserHistory;
const history        = syncHiStore(browserHistory, store);

// this  .render will be our paths
// name="..." is just a name(that I know of), but works as a path IF NO path is specified
// name is not needed with path, but whatever
ReactDOM.render(
	<Provider store={store}>
	  <div>
	    <NavBar />
		<Router history={history}>
			<Route name="Splash" path="/" component={Splash} />
			<Route name="SignUp" path="/signup" component={SignUp} />
			<Route name="Home" path="/home" component={Home} />
			<Route name="Profile" path="/user" component={Profile} />
			<Route name="Appointment" path="/appointments" component={Appointment} />
		</Router>
	  </div>
	</Provider>,
	document.getElementById('app')
);