const React = require('react');
const Input = require('react-bootstrap').Input;
const ButtonInput = require('react-bootstrap').ButtonInput;

const SignIn = ({ onSignIn }) => (
	<div>
		<form onSubmit={onSignIn}>
			<Input type="username" label="Username:" placeholder="Username" />
    		<Input type="password" label="Password:" placeholder="Password"/>
    		<ButtonInput type="submit" value="Submit Button" />
		</form>
	</div>
);

module.exports = SignIn;
