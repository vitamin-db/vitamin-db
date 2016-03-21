const React = require('react');
const Col = require('react-bootstrap').Col;
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const SignIn = ({onSignUp}) => (
		<Col xs={12} md={6} mdOffset={3} className="signup-container">
		<h1>Sign up below:</h1>
		<form onSubmit={onSignUp}>
			<Input name="username" type="username" label="Username:" placeholder="Username" required />
	    <Input name="password" type="password" label="Password:" placeholder="Password" required />
			<Input name="email" type="text" label="Email:" placeholder="Email" required />
			<Input name="phone" type="text" label="Phone:" placeholder="Phone" required />
			<Button type="submit" bsStyle="primary" bsSize="large" block>Sign up</Button>
		</form>
		</Col>
);

module.exports = SignIn;