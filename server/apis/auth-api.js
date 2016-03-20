//handles routes that start with /authenticate
const User = require('../models/user')
const Auth = require('../models/auth')
const nodemailer = require('nodemailer');

const AuthAPI = require('express').Router();


module.exports = AuthAPI


/* Login route - NOTE THAT THIS ONLY COMPARES AGAINST PLAINTEXT PASSWORDS SINCE THAT'S HOW WE'RE SEEDING
Checks if username exists in db
  If yes, checks if password matches stored password for that username
    If password is right:
      Generates and sends an API token
    Otherwise: 
      Sends error message - 'Invalid username and password combo'
  If not, sends back error message - 'Please create an account'

TO DO:
 - check against hashed passwords
 - make responses more what client will expect
*/
AuthAPI.post('/login', function(req, res) {
	console.log('req body', req.body)
	var enteredUsername = req.body.username
	var enteredPw = req.body.password

	return User.existsByUsername(enteredUsername)
	  .then( function(exists) {
	  	console.log('exists? ', exists)
	  	if (!exists) {
	  		res.json({msg: 'Please create an account'})
	  	} else {
	  		//right now, this checks against the PLAINTEXT password
	  		return User.validPlaintextPassword(enteredUsername, enteredPw)
	  	}
	  })
	  .then( function(valid) {
	  	if (valid === undefined) {
	  		console.log('nope, not valid')
	  		return;
	  	}
	  	else if (!valid) {
	  		res.json({msg: 'Invalid username and password combo'})
	  	} else {
	  		return Auth.createToken(enteredUsername)
	    }
	  })
	  .then( function(token) {
	  	if (token) {
	  		res.json({token: token})
	  		console.log('token in final send: ', token)
	  	} else {
	  		console.log('no token')
	  	}
	  })
})


/* Signup route - NOTE THAT THIS ONLY CREAETS AGAINST PLAINTEXT PASSWORDS SINCE THAT'S WHAT LOGIN DOES FOR NOW
Checks to see if username is taken
  If yes:
    Sends back error message 'username taken'
  If no:
    Adds user to db
    Creates and sends back token
TO DO:
 - refactor to store hashed passwords
 - make responses more what client will expect
*/
AuthAPI.post('/signup', function(req, res) {
	console.log('req body', req.body)

	var enteredUsername = req.body.username
	var enteredPw = req.body.password
	var enteredEmail = req.body.email
	console.log('enteredUsername: ', enteredUsername, 'enteredPw: ', enteredPw, 'enteredEmail: ', enteredEmail);

	var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vitamindb.thesis@gmail.com', // Your email id
        pass: 'm4k3r5qu4r3!' // Your password
    }
  });

  var mailOptions = {
    from: 'vitamindb.thesis@gmail.com', // sender address
    to: enteredEmail, // list of receivers
    subject: 'ima email subject line', // Subject line
    text: 'Hello! Your username is: ' + enteredUsername + ' and your password is: ' + enteredPw + '. Thanks!'
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

	return User.existsByUsername(enteredUsername)
	  .then( function(exists) {
	  	if (exists) {
	  		res.json({msg: 'username taken'})
	  	} else {
	  		var newUserObj = {
	  			username: enteredUsername,
	  			password: enteredPw,
	  			email: enteredEmail,
	  			phone: req.body.phone
	  		}
	  		//this will not hash the pw
	  		return User.create(newUserObj)
	  	}
	  })
	  .then( function(user) {
	  	if(user) {
	  		return Auth.createToken(user.username)
	  	}
	  })
	  .then( function(token) {
	  	if(token) {
	  		res.json({token: token})
	  	}
	  })
	  .then( function() {
			transporter.sendMail(mailOptions, function(error, info){
				if(error){
				  return console.log(error);
				}
				console.log('Message sent: ' + info.response);
			});
	  })
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

