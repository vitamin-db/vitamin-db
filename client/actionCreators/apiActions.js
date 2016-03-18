const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

//1000 req per day, 10 req for minute
const API_KEY = '842ff30a0065e0c0bdb41fcc26a0343a';

// this is just a cookie parser. Put in the string "token" into the argument and it will
// sift through the cookie string and spit out the correct value
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
    .then(function(token) { // later, ask for user info too, except password, to display on profile page
      if(token.token === undefined){ // later, move this logic to the back end. Have it throw an error in the back end, so it will fall to this .catch
        dispatch(stateAction.SignInFail());
        return;
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
    .then(() => {
      dispatch(GetMyInfo());
    })
    .then(() => {
      browserHistory.push('/home');
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
      if(token.token === undefined){ // same thing, move logic to back end
        dispatch(stateAction.SignInFail());
      }else{
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
      browserHistory.push('/home')
    })
    .catch(function(err){
      console.error("signup err", err);
    })
  };
};

function GetMyInfo () {
  return (dispatch) => {
    console.log("getmyinfo token", getCookie("token"))
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
      console.log("getlist info", info)
      dispatch(stateAction.SetMyInfo(info))
    })
    .catch((err) => {
      console.error("get my info err",err)
    })
  };
};

// get doctor list based on user argument: { username: username, token: token }
// commented out until everything is ready
function GetApiDocs (doctor) {
  return (dispatch) => {
    return fetch("https://api.betterdoctor.com/2015-01-27/doctors?first_name=" + doctor.firstname + "&last_name=" + doctor.lastname + "&skip=0&limit=10&user_key=" + API_KEY)
      .then((data) => {
        //console.log "data": [{[{[],{},[{}{}],[{}]}], etc..
        return data.json();
      })
      .then((docList) => {
        // console.log("dat", docList.data)
        var final = [];
        docList.data.forEach((doc) => {
          var city      = doc.practices[0].visit_address.city;
          var state     = doc.practices[0].visit_address.state;
          var street    = doc.practices[0].visit_address.street;
          var street2   = doc.practices[0].visit_address.street2;
          var zip       = doc.practices[0].visit_address.zip;
          final.push({
            firstname: doc.profile.first_name,
            lastname: doc.profile.last_name,
            business: doc.practices[0].name,
            phone: doc.practices[0].phones[0].number,
            address: street + " " + street2 + " " + city + ", " + state + " " + zip,
            portrait: doc.profile.image_url
          });
        })
        dispatch(stateAction.SetDocApi(final))
      })
      .catch(function (err) {
        console.error('Doctor api error:', err);
      });
  };
};

function SignOut () {
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
      console.log("sign out res", response)
    })
    .catch((err) => {
      console.error("signout err", err)
    })
  };
};

function AddMyDoc (newInfo) { // send server the doctor's id/primary key and altered info
  return (dispatch) => {
    return fetch('TEMPORARY_FILLER', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: newInfo
    })
    .then((response) => {
      console.log("add doc res", response)
      // tell server to send back JUST the doctor object
    })
    .catch((err) => {
      console.error("add doc error", err)
    })
  };
};

function RemoveMyDoc (doctor) { // this will be the doctor's id/primary key
  return (dispatch) => {
    return fetch('TEMPORARY_FILLER', {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: doctor
    })
    .then((response) => {
      console.log("remove doc res", response);
      // tell server to send back the whole doctor list
      // this way when i try to update the doctor list state
      // i don't have to do too much logic in the reducer to delete one doctor
      // i can just replace the whole list
    })
    .catch((err) => {
      console.error("removemydoc error", err);
    })
  };
};

function ChangeMyDoc (doctor) {
  return (dispatch) => {
    return fetch('TEMPORARY_FILLER', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: doctor
    })
    .then((response) => {
      console.log("change doc res", response);
    })
    .catch((err) => {
      console.error("change doc err", err);
    })
  };
};

// function AddEyeRx (eyeRx) {
//   return (dispatch) => {
//     return fetch('TEMPORARY_FILLER', {
//       method: 'put',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': getCookie("token")
//       },
//       body: eyeRx
//     })
//     .then((response) => {
//       console.log("add eye res", response);
//     })
//     .catch((err) => {
//       console.error("add eye err", err);
//     })
//   };
// };

// function ChangeEyeRx (newEye) {
//   return (dispatch) => {
//     return fetch('TEMPORARY_FILLER', {
//       method: 'put',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': getCookie("token")
//       },
//       body: newEye
//     })
//     .then((response) => {
//       console.log("change eye res", response);
//     })
//     .catch((err) => {
//       console.error("change eye err", err);
//     })
//   };
// };

// DONT FORGET TO ADD THE FUNCTIONS EXPORTS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
  SignIn,
  SignUp,
  getCookie,
  GetApiDocs,
  GetMyInfo,
  SignOut,
  RemoveMyDoc,
  AddMyDoc,
  ChangeMyDoc
};


