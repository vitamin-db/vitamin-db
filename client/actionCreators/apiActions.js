$ = jQuery = require('jquery');
const stateAction = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

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
      // don't need to store in local and cookie, but keeping it for now
      // store token in localStorage & cookie
      window.localStorage.setItem("token", token.token);
      document.cookie = "token=" + window.localStorage.getItem("token");
      // dispatch action
      dispatch(stateAction.SignInSuccess(token.token));
      // change location
      browserHistory.push('/home?token=' + window.localStorage.getItem("token"));
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
      window.localStorage.setItem("token", token.token);
      document.cookie = "token=" + window.localStorage.getItem("token");
      dispatch(stateAction.SignInSuccess(token.token));
      browserHistory.push('/home' + window.localStorage.getItem("token"))
    })
    .catch(function(err){
      console.error(err);
    })
  };
};

function isAuth () {
    // fetch('/authenticate/home', {
    //   headers: {
    //     'x-access-token': window.localStorage.getItem("token")
    //   }
    // })
    // .then(function(response){
    //   if(JSON.parse(response.msg) === "Please log in"){
    //     console.log("false")
    //     return false;
    //   }else{
    //     console.log("true")
    //     return true;
    //   }
    // })
    // .catch(function(err){
    //   console.log("ERRRR", err)
    // })
    if(window.localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
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
  isAuth
};
