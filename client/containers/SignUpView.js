const React = require('react');
const connect = require('react-redux').connect;
const SignUp = require('../components/SignUp/SignUp');
const Action = require('../actionCreators/apiActions');
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
			Action.SignUp(body).then(function(info){
				var purse = JSON.parse(info.data);
				var act = stateAction.SignUpSubmit(purse)
				dispatch(act)
			});
		}
	};
};

var wrappedSignUp = connect(
	mapStateToProps, 
	mapDispatchToProps
)(SignUpComp);

module.exports = wrappedSignUp;