//handles routes that start with /authenticate
const User = require('../models/user')
const Auth = require('../models/auth')
const SendR = require('../sendresponse')
const nodemailer = require('nodemailer');

const AuthAPI = require('express').Router();
module.exports = AuthAPI


/* Login route 
If username or password not entred:
 - returns 400
 - returns an error message: "Please enter a [username/password]"
Checks if username exists in db
  If yes, checks if password matches stored password for that username
    If password is right:
      - sends 200
      - generates and sends an API token (stored in the response object under key 'token')
    If password is wrong:
      - Sends 400
      - Sends error message: 'Invalid username and password combination'
  If no account is associated with that username:
    -sends back 400
    -sends back msg: 'No account associated with that username'
*/
AuthAPI.post('/login', function(req, res) {
	// console.log('req body', req.body)
	var enteredUsername = req.body.username
	var enteredPw = req.body.password

	if (!enteredUsername) {
		SendR.errMsg(res, 400, "Please enter a username")
	} else if (!enteredPw) {
		SendR.errMsg(res, 400, "Please enter a password")
	} else {
		return User.existsByUsername(enteredUsername)
		  .then( function(exists) {
		  	if (!exists) {
		  		throw new Error('No account associated with that username')
		  	}
		  })
		  .then( function() {
		  	return User.validPassword(enteredUsername, enteredPw)
		  })
		  .then( function(valid) {
		  	if (!valid) {
		  		throw new Error('Invalid username and password combination')
		  	}
		  })
		  .then( function() {
		  	return Auth.createToken(enteredUsername)
		  })
		  .then( function(token) {
		  	SendR.resData(res, 200, {token: token})
		  })
		  .catch( function(err) {
		  	if (err.message === 'No account associated with that username' || err.message === 'Invalid username and password combination') {
		  		SendR.error(res, 400, err.message, err)
		  	} else {
		  		SendR.error(res, 500, 'Server error logging in', err)
		  	}
		  })
	}
})


/* Signup route -
If a field is empty:
 - returns 400
 - Returns an error message: 'Please complete all fields'
If username is taken:
 - Returns 400
 - Returns an error message: 'Username ___ is taken'
Otherwise:
 - Adds the user to the database
 - Returns 201
 - Sends a token as property 'token'
TO DO:
 - make responses more what client will expect
 - refactor to streamline mail handling
*/
AuthAPI.post('/signup', function(req, res) {

	var enteredUsername = req.body.username
	var enteredPw = req.body.password
	var enteredEmail = req.body.email
	var enteredPhone = req.body.phone
	console.log('enteredUsername: ', enteredUsername, 'enteredPw: ', enteredPw, 'enteredEmail: ', enteredEmail);

	var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
    }
  });

  var mailOptions = {
    from: 'vitamindb.thesis@gmail.com',
    to: enteredEmail,
    subject: 'Welcome to VitaminDB!',
    html: '<table style="border: 1px solid #ccc;" width="600" cellpadding="10" cellspacing="0" align="center"><tr><td width="600"><h1 style="color:#16a085; font-weight:bold; text-align:center;">Welcome to Vitamin DB!</h1><p>Your username is <strong>' + enteredUsername + '</strong>, and your password is <strong>' + enteredPw + '</strong>.</p><br /><p>Happy trails!</p><p>The Vitamin DB team</p></td></tr></table>'
  };

  if (!enteredUsername || !enteredPw || !enteredEmail || !enteredPhone) {
  	SendR.errMsg(res, 400, 'Please complete all fields')
  } else if( !User.validEmail(enteredEmail) ) {
  	SendR.errMsg(res, 400, 'Please enter a valid email address')
  } else {
  	return User.existsByUsername(enteredUsername)
  	  .then( function(exists) {
  	  	if (exists) {
  	  		throw new Error('taken')
  	  	}
  	  })
  	  .then( function() {

  	  	var newUserObj = {
  	  		username: enteredUsername,
  	  		password: enteredPw,
  	  		email: enteredEmail,
  	  		phone: enteredPhone
  	  	}

  	  	return User.createUser(newUserObj)
  	  })
  	  .then( function(user) {
  	  	return Auth.createToken(user.username)
  	  })
  	  .then(function(token) {
  	  	SendR.resData(res, 201, {token: token})
  	  })
	  .then( function() {
  		transporter.sendMail(mailOptions, function(error, info){
  			if(error){
  			  return console.log(error);
  			}
  			console.log('Message sent: ' + info.response);
  		});
	  })
  	  .catch( function(err) {
  	  	if (err.message === 'taken') {
  	  		SendR.error(res, 400, 'Username ' + enteredUsername + ' is taken', err)
  	  	} else {
  	  		SendR.error(res, 500, 'Server error signing up', err)
  	  	}
  	  })
  }
})


/* Logout route -
	Possible Approaches:

	1. Need to determine how we are storing webtokens on the client side. Depending on
	that, we could potentially just send res.json({token: false}) and overwrite the 
	given token. 
		-- "make it forget the token" https://github.com/auth0/node-jsonwebtoken/issues/103

		-- https://github.com/andreassolberg/jso/blob/master/src/store.js
			// this looks promising

			store.saveTokens = function(provider, tokens) {
				// log("Save Tokens (" + provider+ ")");
				localStorage.setItem("tokens-" + provider, JSON.stringify(tokens));
			};

			store.wipeTokens = function(provider) {
				localStorage.removeItem("tokens-" + provider);
			};

	2. Also could add a db store for invalidated tokens -- aka, when a user logs out, 
	their token is stored as an invalid token. Therefore a token would still technically
	be valid until it time expires, but the check to the invalid token list check would 
	fail, so the requirements would be incomplete. 

	3. Or, could just add another k/v to the response. In logout(), set login: false -- then,
	when logging in a new session, set login: true, and add that check to the authentication
	system in general.


	* REFERENCE: 
		* https://github.com/auth0/node-jsonwebtoken/issues/103
		* https://github.com/dwyl/learn-json-web-tokens/blob/master/example/lib/helpers.js
			- (logout function)
		* https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/

*/

AuthAPI.post('/logout', function(req, res) {
	// console.log('req body', req.body)

})

