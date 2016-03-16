// require packages
const React       = require('react');
const connect     = require('react-redux').connect;
// components/files
const SignUp      = require('../components/SignUp/SignUp');
const apiAction   = require('../actionCreators/apiActions');
const stateAction = require('../actionCreators/stateActions');

const SignUpComp = ({onSignUp}) => {
	return (
		<div>
			<div className="Signup">
				<SignUp onSignUp={onSignUp}/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	// console.log("map state: ", state.signup)
	return {
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
			dispatch(apiAction.SignUp(body));
		}
	};
};

var wrappedSignUp = connect(
	mapStateToProps, 
	mapDispatchToProps
)(SignUpComp);

module.exports = wrappedSignUp;