const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

function AddAllergy (allergy) {
	return (dispatch) => {
		return fetch('/allergy', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			},
			body: JSON.stringify(allergy)
		})
		.then((response) => {
			console.log("add allergy res", response);
		})
		.catch((err) => {
			console.error("add allergy err", err);
		})
	};
};

function RemoveAllergy (id) {
	return (dispatch) => {
		return fetch('/allergy', {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			},
			body: id
		})
		.then((response) => {
			console.log("add allergy res", response);
		})
		.catch((err) => {
			console.error("add allergy err", err);
		})
	};
};

function ChangeAllergy (newAllergy) {
	return (dispatch) => {
		return fetch('/allergy', {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			},
			body: JSON.stringify(newAllergy)
		})
		.then((response) => {
			console.log("add allergy res", response);
		})
		.catch((err) => {
			console.error("add allergy err", err);
		})
	};
};

module.exports = {
	AddAllergy,
	RemoveAllergy,
	ChangeAllergy
};