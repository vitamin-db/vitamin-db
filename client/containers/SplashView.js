const React = require('react');
const connect = require('react-redux').connect;
const SignIn = require('../components/Splash/SignIn');

const Splash = () => {
	return (
		<div className="Signin">
	    	<SignIn />
		</div>
	);
};

const mapStateToProps = () => {
	return {};
};


const mapDispatchToProps = () => {
	return {};
};

var wrappedSplash = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Splash);

module.exports = wrappedSplash;