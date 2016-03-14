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

function LoggedIn () {
	if(window.localStorage.getItem("token")){
		return true;
	}
	return false;
};

function SignOut () {
	window.localStorage.clear();
	return {
		type: 'SIGNINFAIL'
	}
}

module.exports = {
	SignUpSubmit,
	SignInSuccess,
	SignInFail,
	LoggedIn,
	SignOut
};