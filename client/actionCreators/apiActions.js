$ = jQuery = require('jquery');
const stateAction = require('./stateActions');
// This file is for all client api requests
// this request below is just a test request for now

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
      console.log('token: ', token);
      window.localStorage.setItem("token", token.token);
      dispatch(stateAction.SignInSuccess(token.token));
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
      console.log('token: ', token);
      window.localStorage.setItem("token", token.token);
      dispatch(stateAction.SignInSuccess(token.token));
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
  SignUp
};
