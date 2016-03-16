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
	document.cookie = "token=; expires=Thu, 01 Jan 1600 00:00:00 UTC";
	return {
		type: 'SIGNINFAIL'
	};
};

function AddDoc (doctor) { // doctor will be an object, i believe
	return {
		type: 'ADDDOCTOR',
		doctor: doctor
	};
};

function SetDocApi (list) {
	return {
		type: 'SETDOCAPI',
		list: list
	};
};

function ClearDocApi () {
	return {
		type: 'CLEARDOCAPI'
	};
};

module.exports = {
	SignInSuccess,
	SignInFail,
	SignOut,
	AddDoc,
	SetDocApi,
	ClearDocApi
};