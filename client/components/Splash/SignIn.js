const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

// const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const SignIn = ({ onSignIn, goSignup }) => (
	<div className="col-md-12">
		<div className="Signin">
			<form onSubmit={onSignIn}>
				<Input name="username" type="username" label="Username:" placeholder="Username" required />
	    		<Input name="password" type="password" label="Password:" placeholder="Password" required />
	    			<Button type="submit" bsStyle="primary" bsSize="large" block>Log in</Button>
	    			<div className="forgot">Forgot password? | <button onClick={goSignup}>Sign up for an account</button></div>
			</form>
		</div>
	</div>
);

module.exports = SignIn;



