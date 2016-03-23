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
}

function AddPharm (pharm) {
	return (dispatch) => {
		return fetch('/pharmacy', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			},
			body: JSON.stringify(pharm)
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log("add pharm data", data);
			dispatch(stateAction.AddPharm(data));
		})
		.catch((err) => {
			console.error("add pharm err", err);
		})
	};
}

function RemovePharm (id) {
	return (dispatch) => {
		return fetch('/pharmacy/' + id, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			}
		})
		.then((response) => {
			console.log("remove pharm res", response);
			dispatch(stateAction.RemovePharm(id));
		})
		.catch((err) => {
			console.error("remove pharm err", err);
		})
	};
}

module.exports = {
	AddPharm,
	RemovePharm
};