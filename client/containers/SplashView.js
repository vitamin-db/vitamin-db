const React = require('react');
const connect = require('react-redux').connect;
const SignIn = require('../components/Splash/SignIn');
const action = require('../actionCreators/apiActions');

const Splash = ({ onSignIn }) => {
	return (
		<div className="Signin">
	    	<SignIn onSignIn={onSignIn} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {

	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		onSignIn: (e) => {
			e.preventDefault();
			console.log("this", e.target.username.value)
			var username = e.target.username.value;
			var password = e.target.password.value;
			var body = {username: username, password: password};
			dispatch(action.SignIn(body));
		}
	};
};

var wrappedSplash = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Splash);

module.exports = wrappedSplash;