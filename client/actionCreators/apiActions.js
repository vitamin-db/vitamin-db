$ = jQuery = require('jquery');
const stateAction = require('./stateActions');
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

function SignIn (body) {
  return (dispatch) => {
    return fetch('/authenticate/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(token) {
      if(token.token === undefined){
        dispatch(stateAction.SignInFail());
        return;
      }else{
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        window.localStorage.setItem("token", token.token);
        document.cookie = "token=" + window.localStorage.getItem("token") + "; expires=" + now.toUTCString();
        // dispatch action
        dispatch(stateAction.SignInSuccess(token.token));
        // change location
        browserHistory.push('/home?token=' + window.localStorage.getItem("token"));
      }
    })
    .catch(function(err) {
      console.error(err)
      dispatch(stateAction.SignInFail());
    });
  };
};

function SignUp (body) {
  return (dispatch) => {
    return fetch('/authenticate/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(function(response){
      return response.json();
    })
    .then(function(token){
      if(token.token === undefined){
        dispatch(stateAction.SignInFail());
      }else{
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        window.localStorage.setItem("token", token.token);
        document.cookie = "token=" + window.localStorage.getItem("token") + "; expires=" + now.toUTCString();
        dispatch(stateAction.SignInSuccess(token.token));
        browserHistory.push('/home?token=' + window.localStorage.getItem("token"))
      }
    })
    .catch(function(err){
      console.error(err);
    })
  };
};

// get doctor list based on user argument: { username: username, token: token }
// commented out until everything is ready
// function GetDoctorList (user) {
//   return (dispatch) => {
//     return fetch('', {
//       method: 'get',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': user.token
//       },
//       body: JSON.stringify(user.username)
//     })
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(list){
//       console.log(list);
//     })
//     .catch(function(err){
//       console.error(err);
//     })
//   };
// };

// DONT FORGET TO ADD THE FUNCTIONS EXPORTS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
  SignIn,
  SignUp,
  getCookie
};
