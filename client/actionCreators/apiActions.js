$ = jQuery = require('jquery');
const stateAction = require('./stateActions');
// This file is for all client api requests
// this request below is just a test request for now

// function SignIn (body) {
//   return $.ajax({
//     url: 'http://httpbin.org/post',
//     method: 'POST',
//     data: JSON.stringify(body),
//     accepts: 'application/json',
//     dataType: 'json',
//     contentType: 'application/json',
//     success: (data) => {
//       const purse = JSON.parse(data.data);
//       console.log(purse);
//     },
//     error: (err) => {
//       console.error(err)
//     }
//   });
// }

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
    .then(function(j) {
      console.log('j: ', j);
      window.localStorage.setItem("token", j['token']);
      dispatch(stateAction.SignInSuccess(j.token))
    })
    .catch(function(err) {
      console.error(err)
      dispatch(stateAction.SignInFail());
    });
  }
}

function SignUp (body) {
  return (dispatch) => {
    return $.ajax({
      url: 'http://httpbin.org/post',
      method: 'POST',
      data: JSON.stringify(body),
      accepts: 'application/json',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        const purse = JSON.parse(data.data);
        dispatch(stateAction.SignUpSubmit(purse));
      },
      error: (err) => {
        console.error(err)
      }
    });
  }
}

module.exports = {
  SignIn,
  SignUp
};

