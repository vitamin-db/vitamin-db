const React = require('react');

const SignIn = ({ onSignIn }) => (
	<div>
		<form onSubmit={onSignIn}>
			<input type="text" placeholder="Username" />
			<input type="password" placeholder="Password" />
			<button type="submit">submit</button>
		</form>
	</div>
);

module.exports = SignIn;