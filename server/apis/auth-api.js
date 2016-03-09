//handles routes that start with /authenticate
const User = require('../models/user')
const Auth = require('../models/auth')

const AuthAPI = require('express').Router();


module.exports = AuthAPI

var secret = 'secretPasscode'

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
	  })
	/*
	Check if username (from req body) exists in db
	  If yes:
	    Check if password matches stored password
	      If yes:
	        Generate an API token
	        Send the API token
	      If no:
	        Send error message - 'Invalid username and password combo'
	  If no:
	    Send back error message - 'Please create an account'
	*/
})

AuthAPI.post('/signup', function(req, res) {
	console.log('req body', req.body)

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
/*
Check if usermae exists in db
  if yes, send back error message - 'username taken'
  otherwise
    add user to db
    then
      send back token
*/

})