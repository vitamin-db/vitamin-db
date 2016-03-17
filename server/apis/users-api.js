// handles routes that start with /user

const User = require('../models/user')
const Doctor = require('../models/doctor')
const UserDoctor = require('../models/user-doctor')
const EyeRx = require('../models/eyerx')
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
	  {}, {}
	]
  }
*/
UserAPI.get('/', function(req, res) {

	var dataForUser = {}

	var userId = undefined

	// var userData = undefined
	// var doctorsData = undefined
	// var 

	return User.findByUsername( req.decoded.username)
	  .then( function(userObj) {
	  	userId = userObj.id_user
	  	return User.getPublic(userObj)
	  })
	  .then( function(publicUser) {
	  	dataForUser.user = publicUser

	  	return UserDoctor.findAllDoctors(userId)
	  })
	  .then( function(doctors) {
	  	dataForUser.doctors = doctors.map(doctor => Doctor.getPublicOb(doctor))

	  	return EyeRx.getCurrentByUser(userId)
	  })
	  .then( function(eyerx) {
	  	dataForUser.eyerx = EyeRx.getPublicOb(eyerx)

	  	//Send data after dealing with all data types
	  	SendR.resData(res, 200, dataForUser)
	  })
	  .catch( function(err) {
	  	console.log('** error getting info for user: ', err)
	  	SendR.error(res, 500, 'Server error', err)
	  })

})