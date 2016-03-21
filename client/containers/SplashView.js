// require packages
const React             = require('react');
const connect           = require('react-redux').connect;
// require components/files
const SignIn            = require('../components/Splash/SignIn');
const JumbotronInstance = require('../components/Splash/Jumbotron');
const apiAction         = require('../actionCreators/apiActions');
const stateAction		= require('../actionCreators/stateActions');
// require history to change routes
const browserHistory    = require('react-router').browserHistory;

const Splash = ({onSignIn, goSignup, logged }) => {
	if(apiAction.getCookie("token")){
		stateAction.SignInSuccess(apiAction.getCookie("token"))
		apiAction.GetMyInfo();
	}
	return (
		<div>
			<div>
			<div className="Jumbotron jumboBackground">
				<JumbotronInstance />
				</div>
			</div>
			{!logged && <div className="col-md-12">
		    	<SignIn goSignup={goSignup} onSignIn={onSignIn} />
			</div>}
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(apiAction.getCookie("token"));
	// ^^^ this console log returns each state in the reducers/reducer.js file
	return {
		logged: state.signin.logged
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		onSignIn: (e) => {
			e.preventDefault();
			// The e argument gives us access to the log in form
			// wrap username and password in an object and send it to the reducer to update the signin state
			var username = e.target.username.value;
			var password = e.target.password.value;
			var body = {username: username, password: password};
			dispatch(apiAction.SignIn(body)) // you have to call dispatch here even though you dispatch the action object in the api promise, idk why, check later
		},
		goSignup: () => {
			browserHistory.push('/signup')
		}
	};
};

// Splash is a component, and the map...ToProps functions are props
// call the connect function to make this a "smart" component (a.k.a container)
var wrappedSplash = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Splash);

module.exports = wrappedSplash;
