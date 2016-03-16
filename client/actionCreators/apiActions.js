const stateAction = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

//1000 req per day, 10 req for minute
const API_KEY = '842ff30a0065e0c0bdb41fcc26a0343a';
//hardcoded first and last name for testing
const BETTERDOCTOR_URL = "https://api.betterdoctor.com/2015-01-27/doctors?first_name=james&last_name=dugas&skip=0&limit=10&user_key=" + API_KEY;

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
        // time += 3600 * 1000;
        time += 100000
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

// function isAuth () {
//     // fetch('/authenticate/home', {
//     //   headers: {
//     //     'x-access-token': window.localStorage.getItem("token")
//     //   }
//     // })
//     // .then(function(response){
//     //   if(JSON.parse(response.msg) === "Please log in"){
//     //     console.log("false")
//     //     return false;
//     //   }else{
//     //     console.log("true")
//     //     return true;
//     //   }
//     // })
//     // .catch(function(err){
//     //   console.log("ERRRR", err)
//     // })
//     if(window.localStorage.getItem("token")){
//       return true;
//     }else{
//       return false;
//     }
// };

// get doctor list based on user argument: { username: username, token: token }
// commented out until everything is ready
function GetDoctorList () {
//   return (dispatch) => {
  return fetch(BETTERDOCTOR_URL)
    .then(function (data) {
      //console.log "data": [{[{[],{},[{}{}],[{}]}], etc..
      console.log('Doctor data:', data);
    })
    .catch(function (err) {
      console.error('Doctor error:', err);
    });
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
};

// DONT FORGET TO ADD THE FUNCTIONS EXPORTS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
  SignIn,
  SignUp,
  getCookie,
  GetDoctorList
};
