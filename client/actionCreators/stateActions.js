function SignUpSubmit(info) {
	return {
		type: 'SUBMIT',
		info: info
	};
};

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

module.exports = {
	SignUpSubmit,
	SignInSuccess,
	SignInFail
};