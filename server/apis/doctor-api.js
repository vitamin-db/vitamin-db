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
*/
DoctorAPI.post('/', function(req, res) {

	return User.findByUsername( req.decoded.username)
	  .then(function(user) {
	  	var doc = {}
	  	for (var p in req.body.properties) {
	  		if (p !== 'current' && p!== 'type_usermade') {
	  			doc[p] = req.body.properties[p]
	  		}
	  	}
	  	return UserDoctor.createDoctor(doc, user.id_user, req.body.properties.type_usermade, req.body.properties.current)
	  })
	  .then(function(doctor) {
	  	SendR.resData(res, 201, Doctor.getPublicOb(doctor))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error posting doctor', err)
	  })

})


/* PUT /doctor
  Takes an object with the properties:
   - id_doctor (to be updated)
   - new property values to be updated 
   (eg: req.body.properties = {id_doctor: id, propertyToUpdate: newValue})

  Returns the updated object and a 201 on success
*/
DoctorAPI.put('/', function(req, res) {

	return Doctor.updateByObj(req.body.properties) 
	  .then(function(updated) {
	  	SendR.resData(res, 201, Doctor.getPublicOb(updated))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error updating doctor', err)
	  })
})

/* DELETE /doctor/:id
  Id to delete goes in the url
  On a successful delete, sends back a 200
*/
DoctorAPI.delete('/:id_doctor', function(req, res) {

	var userId = undefined

	return User.findByUsername(req.decoded.username)
	  .then( function(user) {
	  	userId = user.id_user

	  	return UserDoctor.findByAttribute('id_doctor', req.params.id_doctor)
	  })
	  .then(function(userdoctors) {
	  	//NEED TO DELETE ALL APPOINTEMENTS WITH THESE USERDOCTORS AS WELL!!!!!
	  	return UserDoctor.deleteById(userdoctors[0]['id_user_doctor'])
	  })
	  .then(function() {
	  	return Doctor.deleteById(req.params.id_doctor)
	  })
	  .then( function() {
	  	SendR.sendStatus(res, 200)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error deleting doctor', err)
	  })
})
