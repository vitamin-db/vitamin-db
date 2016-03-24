// handles routes that start with /doctor

const Doctor = require('../models/doctor')
const UserDoctor = require('../models/user-doctor')
const User = require('../models/user')
const SendR = require('../sendresponse')

const DoctorAPI = require('express').Router();

module.exports = DoctorAPI

/* GET /doctor
  Returns an array of all doctors pertaining to the user
*/
DoctorAPI.get('/', function(req, res) {

	return User.findByUsername( req.decoded.username)
	  .then(function(user) {
	  	return UserDoctor.findAllDoctors(user.id_user)
	  })
	  .then(function(doctors) {
	  	var publicDocs = doctors.map(x => Doctor.getPublicOb(x))
	  	SendR.resData(res, 200, publicDocs)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error getting doctors', err)
	  })
})



/* POST /doctor
  The body of the request should have an object {properties: docProps}
    where docProps has the following properties: 
     - name
     - street_address
     - city
     - state_abbrev
     - zip
     - emailweb
     - phone
     - type
     - type_usermade
     - current
   Returns the newly created object and a 201 code on success
   If the zip code or email are invalid:
   - Returns a 400
   - Returns an error message: 'Invalid email address' / 'Invalid zip code'
*/
DoctorAPI.post('/', function(req, res) {

	return User.findByUsername(req.decoded.username)
	  .then(function(user) {
	  	var doc = Doctor.prepData(req.body.properties)
	  	console.log('doc after prepping data', doc)
	  	return UserDoctor.createDoctor(doc, user.id_user, req.body.properties.type_usermade, req.body.properties.current)
	  })
	  .then(function(doctor) {
	  	SendR.resData(res, 201, Doctor.getPublicOb(doctor))
	  })
	  .catch( function(err) {
	  	if (err.message === 'Invalid email address' || err.message === 'Invalid zip code') {
	  		SendR.error(res, 400, err.message, err)
	  	} else {
	  		SendR.error(res, 500, 'Server error posting doctor', err)
	  	}
	  })

})


/* PUT /doctor
  Takes an object with the properties:
   - id_doctor (to be updated)
   - new property values to be updated 
   (eg: req.body.properties = {id_doctor: id, propertyToUpdate: newValue})

  Returns the updated object and a 201 on success

  If trying to change a zip code or email to something invalid:
  - Returns a 400
  - Returns an error message: 'Invalid email address' / 'Invalid zip code'
*/
DoctorAPI.put('/', function(req, res) {

	return UserDoctor.updateUserDoctor(req.decoded.username, req.body.properties)
	  .then(function(doctor) {
	  	SendR.resData(res, 201, Doctor.getPublicOb(doctor))
	  })
	  .catch( function(err) {
	  	console.log('got error with message', err.message)
	  	if (err.message === 'Invalid email address' || err.message === 'Invalid zip code') {
	  		SendR.error(res, 400, err.message, err)
	  	} else {
	  		SendR.error(res, 500, 'Server error updating doctor', err)
	  	}
	  })
})

/* DELETE /doctor/:id
  Id to delete goes in the url
  On a successful delete, sends back a 200
*/
DoctorAPI.delete('/:id_doctor', function(req, res) {

	var userId = undefined

	return UserDoctor.deleteDoctor(req.params.id_doctor)
	  .then( function() {
	  	SendR.sendStatus(res, 200)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error deleting doctor', err)
	  })
})
