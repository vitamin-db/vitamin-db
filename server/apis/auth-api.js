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