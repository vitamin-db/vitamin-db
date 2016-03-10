//handles routes that start with /authenticate
const User = require('../models/user')
const Auth = require('../models/auth')

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
	  	if (!valid) {
	  		res.json({msg: 'Invalid username and password combo'})
	  	} else {
	  		return Auth.createToken(enteredUsername)
	    }
	  })
	  .then( function(token) {
	  	res.json({token: token})
	  	console.log('in final send')

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
	// console.log('req body', req.body)

	var enteredUsername = req.body.username
	var enteredPw = req.body.password

	return User.existsByUsername(enteredUsername)
	  .then( function(exists) {
	  	if (exists) {
	  		res.json({msg: 'username taken'})
	  	} else {
	  		var newUserObj = {
	  			username: enteredUsername,
	  			password: enteredPw,
	  			email: req.body.email,
	  			phone: req.body.phone
	  		}
	  		//this will not hash the pw
	  		return User.create(newUserObj)
	  	}
	  })
	  .then( function(user) {
	  	return Auth.createToken(user.username)
	  })
	  .then( function(token) {
	  	res.json({token: token})
	  })
})


/* Logout route -
	Possible Approaches:

	1. Need to determine how we are storing webtokens on the client side. Depending on
	that, we could potentially just send res.json({token: false}) and overwrite the 
	given token. 

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

