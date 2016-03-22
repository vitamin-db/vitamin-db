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

function AddEyeRx (eyeRx) {
  return (dispatch) => {
    return fetch('/eyerx', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(eyeRx)
    })
    .then((response) => {
    	return response.json();
    })
    .then((data) => {
      dispatch(stateAction.AddEye(data))
    })
    .catch((err) => {
      console.error("add eye err", err);
    })
  };
};

function RemoveEyeRx (id) {
  return (dispatch) => {
    return fetch('/eyerx/' + id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      }
    })
    .then((response) => {
      console.log("remove eye res", response)
      dispatch(stateAction.RemoveEye(id))
    })
    .catch((err) => {
      console.error("remove err", err);
    })
  };
};

function ChangeEyeRx (newEye) {
  return (dispatch) => {
    return fetch('TEMPORARY_FILLER', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: newEye
    })
    .then((response) => {
      console.log("change eye res", response);
    })
    .catch((err) => {
      console.error("change eye err", err);
    })
  };
};

module.exports = {
	AddEyeRx,
	ChangeEyeRx,
  RemoveEyeRx
}