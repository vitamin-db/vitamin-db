const React = require('react');

const SignIn = ({ onSignIn }) => (
	<div>
		<form onSubmit={onSignIn}>
			<input name="username" type="text" placeholder="Username" />
			<input name="password" type="password" placeholder="Password" />
			<button type="submit">submit</button>
		</form>
	</div>
);

module.exports = SignIn;