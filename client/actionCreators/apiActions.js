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

module.exports = {
  SignIn,
  SignUp
};

