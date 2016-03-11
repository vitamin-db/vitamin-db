$ = jQuery = require('jquery');
const stateAction = require('./stateActions');
// This file is for all client api requests
// this request below is just a test request for now
function SignIn (body) {
  return $.ajax({
    url: 'http://httpbin.org/post',
    method: 'POST',
    data: JSON.stringify(body),
    accepts: 'application/json',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      const purse = JSON.parse(data.data);
      console.log(purse);
    },
    error: (err) => {
      console.error(err)
    }
  });
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