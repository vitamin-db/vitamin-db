const React = require('react');
const connect = require('react-redux').connect;
const SignIn = require('../components/Splash/SignIn');

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
			console.log("HELLO")
		}
	};
};

var wrappedSplash = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Splash);

module.exports = wrappedSplash;