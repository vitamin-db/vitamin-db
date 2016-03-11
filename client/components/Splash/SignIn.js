const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

// const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const SignIn = ({ onSignIn }) => (
	<div className="col-md-12">
		<div className="Signin">
			<form onSubmit={onSignIn}>
				<Input type="username" label="Username:" placeholder="Username" />
	    		<Input type="password" label="Password:" placeholder="Password"/>
	    			<Button bsStyle="primary" bsSize="large" block>Log in</Button>
	    			<div className="forgot">Forgot password? | Sign up for an account</div>
			</form>
		</div>
	</div>
);

module.exports = SignIn;



