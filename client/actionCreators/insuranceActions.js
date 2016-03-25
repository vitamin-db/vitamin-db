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

function AddIns (ins) {
  return (dispatch) => {
    return fetch('/insurance', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(ins)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("add ins data", data);
      dispatch(stateAction.AddIns(data));
    })
    .catch((err) => {
      console.error("add ins err", err);
    });
  };
}

function RemoveIns (id) {
  return (dispatch) => {
    return fetch('/insurance/' + id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      }
    })
    .then((response) => {
      console.log("remove ins res", response);
      dispatch(stateAction.RemoveIns(id));
    })
    .catch((err) => {
      console.error("get remove ins err", err);
    });
  };
}

function EditIns (newInfo) {
  return (dispatch) => {
    return fetch('/insurance', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(newInfo)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("edit ins data", data);
    })
    .catch((err) => {
      console.error("Edit ins err", err);
    })
  };
}

module.exports = {
  RemoveIns,
  AddIns,
  EditIns
};