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

function AddImmun (immun) {
  return (dispatch) => {
    return fetch('/immun', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(immun)
    })
    .then((response) => {
      console.log('the response in action immun', response)
      return response.json();
    })
    .then((data) => {
      dispatch(stateAction.AddImmun(data))
    })
    .catch((err) => {
      console.error("add immun err", err);
    })
  };
};

function RemoveImmun (id) {
  return (dispatch) => {
    return fetch('/immun/' + id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      }
    })
    .then((response) => {
      console.log("remove immun res", response)
      dispatch(stateAction.RemoveImmun(id))
    })
    .catch((err) => {
      console.error("remove err", err);
    })
  };
};

function ChangeImmun (newImmun) {
  return (dispatch) => {
    return fetch('TEMPORARY_FILLER', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: newImmun
    })
    .then((response) => {
      console.log("change immun res", response);
    })
    .catch((err) => {
      console.error("change immun err", err);
    })
  };
};

module.exports = {
  AddImmun,
  ChangeImmun,
  RemoveImmun
}