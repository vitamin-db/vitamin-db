const stateAction    = require('./stateActions');
const allergyAction  = require('./allergyActions');
const browserHistory = require('react-router').browserHistory;

// this is just a cookie parser. Put in the string "token" into the argument and it will
// shift through the cookie string and spit out the correct value
function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for(var i=0; i<ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1);
       if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
       console.log("cookie: ",cname)
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
    .then((response) => {
      return response.json();
    })
    .then((token) => { // later, ask for user info too, except password, to display on profile page
      if(token.msg === "Invalid username and password combination"){ // later, move this logic to the back end. Have it throw an error in the back end, so it will fall to this .catch
        dispatch(stateAction.SignInFail());
        return token.msg;
      }else{
        // grab current time, convert it to a single unit, add desired time for expiration, 
        // set the created date to the new time, store the token with the expires parameter
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        // just using cookies now for expiration dates, as seen above
        // window.localStorage.setItem("token", token.token);
        document.cookie = "token=" + token.token + "; expires=" + now.toUTCString();
        // dispatch action
        dispatch(stateAction.SignInSuccess(token.token)); // this state.action function will return an action object filled with the "type" and "token" key/value
      }
    })
    .then((msg) => {
      if(msg === "Invalid username and password combination"){
        dispatch(stateAction.InvalidSignIn(msg));
        return;
      }else{
        dispatch(GetMyInfo());
      }
    })
    .then(() => {
      if(getCookie("token")){
        browserHistory.push('/home');
      }
    })
    .catch(function(err) {
      console.error("signin err", err)
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
    .then(function(token){ // don't forget to get the user info back here too, except password
      console.log("token", token)
      if(token.msg){
        console.log("token error");
        dispatch(stateAction.SignInFail());
        throw new Error(token.msg);
      }
      else{
        console.log("signup else success");
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        // window.localStorage.setItem("token", token.token);
        document.cookie = "token=" + token.token + "; expires=" + now.toUTCString();
        dispatch(stateAction.SignInSuccess(token.token));
      }
    })
    .then(() => {
      dispatch(GetMyInfo());
    })
    .then(() => {
      if(getCookie("token")){
        browserHistory.push('/home');
      }
    })
    .catch(function(err){
      console.error("signup err", err);
      dispatch(stateAction.InvalidSignUp(err));
    })
  };
};

function GetMyInfo () {
  return (dispatch) => {
    // console.log("getmyinfo token", getCookie("token"))
    return fetch("/user", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': getCookie("token")
        }
    })
    .then((data) => {
      // data will be user info and doc list
      return data.json();
    })
    .then((info) => {
      if(info.msg === "Please log in"){
        return;
      }else{
        console.log("get info", info);
        dispatch(stateAction.SetMyInfo(info));
      }
    })
    .catch((err) => {
      console.error("get my info err",err)
    })
  };
};

function SignOut () {
  console.log("signout user action");
  return (dispatch) => {
    return fetch('/authenticate/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      }
    })
    .then((response) => {
      console.log("sign out res", response);
      dispatch(stateAction.SignOut());
    })
    .then(() => {
      if(!getCookie("token")){
        browserHistory.push('/');
      }
    })
    .catch((err) => {
      console.error("signout err", err);
    })
  };
};

function ChangeUserInfo (data) {
  console.log("ChangeUserInfoTop: ", data);
  return (dispatch) => {
    return fetch('/user', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(data)
    })
    // .then((response) => {
      // return response.json();
    // })
    // .then ((newToken) => {
    //   console.log ("cookie: ",getCookie("token"));
    //   console.log("newToken: ", newToken);
    // })
    // .then((data) => {
    //   var now = new Date();
    //   var time = now.getTime();
    //   time += 3600 * 1000;
    //   now.setTime(time);
    //   document.cookie = "token=" + data.token + "; expires=" + now.toUTCString();
    //   alert("SUCCESS! Please log back in")
    // })
    // .then((data) => {
    //   console.log("ChangeUserInfo: ", data);
    //   dispatch(stateAction.ChangeInfo(data));
    // })
    .then(() => {
      browserHistory.push('/')
      dispatch(stateAction.SignOut());
    })
    .then(() => {
      alert("SUCCESS! Please log back in");
    })
    .catch((err) => {
      console.log("ChangeUserInfo ERROR: ", err);
    })
  };
};

// DONT FORGET TO ADD THE FUNCTIONS EXPORTS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
  SignIn,
  SignUp,
  getCookie,
  GetMyInfo,
  SignOut,
  ChangeUserInfo
};


