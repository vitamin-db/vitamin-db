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

function AddMember (member) {
	return fetch('', {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': getCookie("token")
		},
		body: JSON.stringify(member)
	})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		return data;
	})
	.catch((err) => {
		console.error("add member err", err);
	})
}

function AddFam (fam) {
	return (dispatch) => {
		return fetch('/familyhistory', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			},
			body: JSON.stringify(fam)
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log("add fam data", data);
		})
		.catch((err) => {
			console.error("add fam err", err);
		})
	};
}

function RemoveFam (id) {
	return (dispatch) => {
		return fetch('/familyhistory/' + id, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			}
		})
		.then((response) => {
			console.log("remove fam res", response);
		})
		.catch((err) => {
			console.error("remove fam err", err);
		})
	}
}

module.exports = {
	AddFam,
	RemoveFam,
	AddMember
};