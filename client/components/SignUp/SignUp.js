const React = require('react');

const SignIn = ({userInfo, onSignUp}) => (
	<div>
		<h1>Sign up below!</h1>
		<form onSubmit={onSignUp}>
			<input name="username" type="text" placeholder="Username" required />
			<input name="password" type="password" placeholder="Password" required />
			<br/>
			<input name="email" type="text" placeholder="Email" required />
			<input name="phone" type="text" placeholder="Phone number" required />
			<br/>
			<button type="submit">Sign up</button>
		</form>
		<h3>Username: {userInfo.username}</h3>
		<h3>Email: {userInfo.email} </h3>
		<h3>Phone: {userInfo.phone} </h3>
	</div>
);

module.exports = SignIn;