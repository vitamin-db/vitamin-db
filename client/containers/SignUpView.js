// require packages
const React       = require('react');
const connect     = require('react-redux').connect;
// components/files
const SignUp      = require('../components/SignUp/SignUp');
const userAction  = require('../actionCreators/userActions');
const stateAction = require('../actionCreators/stateActions');

const SignUpComp = ({error, onSignUp}) => {
	return (
		<div>
			<div className="Signup">
				<SignUp error={error} onSignUp={onSignUp}/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	// console.log("map state: ", state.signup)
	return {
		error: state.signin.msg2
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSignUp: (e) => {
			e.preventDefault();
			var username = e.target.username.value;
			var password = e.target.password.value;
			var email = e.target.email.value;
			var phone = e.target.phone.value;
			var body = {username: username, password: password, email: email, phone: phone};
			dispatch(userAction.SignUp(body));
		}
	};
};

var wrappedSignUp = connect(
	mapStateToProps, 
	mapDispatchToProps
)(SignUpComp);

module.exports = wrappedSignUp;