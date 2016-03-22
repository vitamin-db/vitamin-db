const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for(var i=0; i<ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1);
       if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
   }
   return "";
};

function GetAllergy () {
	return (dispatch) => {
		return fetch('/allergy', {
			headers: {
				'x-access-token': getCookie("token")
			}
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log("get allergy data", data);
			dispatch(stateAction.GetAllergy(data));
		})
		.catch((err) => {
			console.error("get allergy err", err);
		})
	};
};

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
			return response.json();
		})
		.then((data) => {
			console.log("add allergy res", data);
			dispatch(stateAction.AddAllergy(data));
		})
		.catch((err) => {
			console.error("add allergy err", err);
		})
	};
};

function RemoveAllergy (id) {
	return (dispatch) => {
		return fetch('/allergy/' + id, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			}
		})
		.then((response) => {
			console.log("add allergy res", response);
			dispatch(stateAction.RemoveAllergy(id))
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
	ChangeAllergy,
	GetAllergy
};