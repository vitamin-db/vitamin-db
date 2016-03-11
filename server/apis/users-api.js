// handles routes that start with /user

const User = require('../models/user')
const UserDoctor = require('../models/user-doctor')
const SendR = require('../sendresponse')

const UserAPI = require('express').Router();

module.exports = UserAPI


/*
  Returns: {
	user: {
	  username: blah,
	  email: email,
	  phone: phone
	},
	doctors: [
	  {
	  	name: name,
	  	street_address address,
	  	city: city,
	  	state_abbrev: state,
	  	zip: zip,
	  	email: email,
	  	web: web,
	  	phone: phone,
	  	type: type
	  	created_at: createdAt,
	  	updated_at: updated_at
	  },
	  {...}, {...}, ....
	]
  }
*/
UserAPI.get('/', function(req, res) {

	var userId = undefined
	var userOb = undefined

	return User.findByUsername( req.decoded.username)
	  .then( function(userObj) {
	  	userId = userObj.id_user
	  	return User.getPublic(userObj)
	  })
	  .then( function(publicUser) {
	  	userOb = publicUser
	  	return UserDoctor.findAllDoctors(userId)
	  })
	  .then( function(doctors) {
	  	var dataForUser = {}
	  	dataForUser.user = userOb
	  	dataForUser.doctors = doctors

	  	SendR.resData(res, 200, dataForUser)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error', err)
	  })

})