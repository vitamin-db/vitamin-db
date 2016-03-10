const React = require('react');
const connect = require('react-redux').connect;
const SignIn = require('../components/Splash/SignIn');
const apiAction = require('../actionCreators/apiActions');
const JumbotronInstance = require('../components/Splash/Jumbotron');

// Splash soon-to-be container with any and all child components it needs
// Each container will be a "view"
const Splash = ({ onSignIn }) => {
	return (
		<div>
			<div className="Jumbotron">
				<JumbotronInstance />
			</div>
			<div className="Signin" class="col-md-6">
		    	<SignIn onSignIn={onSignIn} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	// console.log("mapstateprops state ", state);
	// ^^^ this console log returns each state in the reducers/reducer.js file
	return {
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		onSignIn: (e) => {
			e.preventDefault();
			// The e argument gives us access to the log in form
			// wrap username and password in an object to send as the data body
			var username = e.target.username.value;
			var password = e.target.password.value;
			var body = {username: username, password: password};
			apiAction.SignIn(body);
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
