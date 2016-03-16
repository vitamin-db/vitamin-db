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
        browserHistory.push('/home?token=' + getCookie("token"))
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
        browserHistory.push('/home?token=' + getCookie("token"))
      }
    })
    .catch(function(err){
      console.error(err);
    })
  };
};

// don't need this since auth is handled backend
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
function GetDoctor (doctor) {
  return (dispatch) => {
    return fetch("https://api.betterdoctor.com/2015-01-27/doctors?first_name=" + doctor.firstname + "&last_name=" + doctor.lastname + "&skip=0&limit=10&user_key=" + API_KEY)
      .then(function (data) {
        //console.log "data": [{[{[],{},[{}{}],[{}]}], etc..
        return data.json();
      })
      .then(function(docList){
        // console.log("dat", docList.data)
        var final = [];
        docList.data.forEach(function(doc){
          var firstname = doc.profile.first_name + "";
          var lastname = doc.profile.last_name + "";
          var business = doc.practices[0].name;
          var phone = doc.practices[0].phones[0].number;
          var city = doc.practices[0].visit_address.city;
          var state = doc.practices[0].visit_address.state;
          var street = doc.practices[0].visit_address.street;
          var street2 = doc.practices[0].visit_address.street2;
          var zip = doc.practices[0].visit_address.zip;
          var result = {
            business: business,
            firstname: firstname, 
            lastname: lastname, 
            phone:phone,
            address: street + " " + street2 + " " + city + ", " + state + " " + zip
          };
          final.push(result);
        })
        dispatch(stateAction.SetDocApi(final))
      })
      .catch(function (err) {
        console.error('Doctor error:', err);
      });
  };
};

// DONT FORGET TO ADD THE FUNCTIONS EXPORTS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
module.exports = {
  SignIn,
  SignUp,
  getCookie,
  GetDoctor
};
