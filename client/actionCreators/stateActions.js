// successful log-in
function SignInSuccess(token) {
	return {
		type: 'SIGNINSUCCESS',
		token: token
	};
};

// failed log-in
function SignInFail() {
	return {
		type: 'SIGNINFAIL'
	};
};

function SignOut () {
	document.cookie = "token=; expires=Thu, 01 Jan 1900 00:00:00 UTC";
	return {
		type: 'SIGNINFAIL'
	}
}

module.exports = {
	SignInSuccess,
	SignInFail,
	SignOut
};