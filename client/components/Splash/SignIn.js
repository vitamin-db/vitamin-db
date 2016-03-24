const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;
const Col = require('react-bootstrap').Col;

// const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const SignIn = ({ error, onSignIn, goSignup }) => (

	<Col xs={12} md={6} mdOffset={3}>
		<Col xs={12} md={8} mdOffset={2} className="Signin">
			<form onSubmit={onSignIn}>
				<Input name="username" type="username" label="Username:" placeholder="Username" required />
	    		<Input name="password" type="password" label="Password:" placeholder="Password" required />
				{error}
	    		<Button type="submit" bsStyle="primary" bsSize="large" block>Log in</Button>
			</form>
			<div className="forgot">Forgot password? | <button onClick={goSignup} className="hvr-sweep-to-top">Sign up for an account</button></div>
		</Col>
	</Col>
);

module.exports = SignIn;



