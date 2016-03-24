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


function AddAppointment (appointment, id_doctor) {
  return (dispatch) => {
	return fetch('/appointment/' + id_doctor, {
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'x-access-token': getCookie("token")
		},
		body: JSON.stringify(appointment)
	})
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		dispatch(stateAction.AddAppointment(data))
	})
	.catch((err) => {
		console.error("add appointment", err)
	})
  };
};

function RemoveAppointment (id_appointment) {
	return (dispatch) => {
		return fetch('/appointment/' + id_appointment, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': getCookie("token")
			}
		})
		.then((response) => {
			dispatch(stateAction.RemoveAppointment(id_appointment));
		})
		.catch((err) => {
			console.error('removing appointment error', err)
		})
	};
}

module.exports = {
  AddAppointment,
  RemoveAppointment
}