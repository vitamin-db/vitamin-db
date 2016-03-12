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

// COMMENTED OUT UNTIL NEEDED
// function GetDoctorList(list) {
// 	return {
// 		type: 'GETDOCLIST',
// 		list: list
// 	};
// };

// DONT FORGET TO ADD FUNCTIONS TO EXPORTS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
	SignUpSubmit,
	SignInSuccess,
	SignInFail
};