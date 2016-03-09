//handles routes that start with /authenticate
const User = require('../models/user')
const AuthAPI = require('express').Router();

module.exports = AuthAPI

var secret = 'secretPasscode'

AuthAPI.post('/login', function(req, res) {

	//if user exists in db
	  //check if password matches stored pw
	    //if yes, log in
	    //if no, send error message - 'Invalid username and password combo'
	//otherwise, send back error message - 'Please create account'

})