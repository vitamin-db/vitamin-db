const React = require('react');

const SignIn = ({onSignUp}) => (
	<div>
		<h1>Sign up below!</h1>
		<form onSubmit={onSignUp}>
			<input name="email" type="text" placeholder="Email" />
			<input name="phone" type="text" placeholder="Phone number" />
			<br/>
			<input name="username" type="text" placeholder="Username" />
			<input name="password" type="password" placeholder="Password" />
			<br/>
			<button type="submit">Sign up</button>
		</form>
		<h3>Username:  </h3>
		<h3>Email:  </h3>
		<h3>Phone:  </h3>
	</div>
);

module.exports = SignIn;