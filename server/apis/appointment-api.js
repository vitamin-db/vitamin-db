// handles routes that start with /appointment

const Appointment = require('../models/appointment')
const User = require('../models/user')
const UserDoctor = require('../models/user-doctor')
const SendR = require('../sendresponse')

const AppointmentAPI = require('express').Router();

module.exports = AppointmentAPI


/* GET /appointment
Returns all appointments pertaining to the user, grouped by doctor
For example, might get back: 
[{id_doctor: #, appointments: [ {}, {} ] }, ...]
*/
AppointmentAPI.get('/', function(req, res) {

	return User.findByUsername(req.decoded.username)
	  .then(function(user) {
	  	return UserDoctor.findAllDoctors(user.id_user)
	  })
	  .then(function(docs) {
	  	return Appointment.transformDoctors(req.decoded.username, docs)
	  })
	  .then(function(transformed) {
	  	SendR.resData(res, 200, transformed)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error getting appointment records', err)
	  })
	  
})



/* POST /appointment/:id_doctor
  Adds an appointment - takes an object in req.body.properties: {date, time}
  Returns the newly created object and a 201 status on success
*/
AppointmentAPI.post('/:id_doctor', function(req, res) {

	return Appointment.createAndReturn(req.decoded.username, req.params.id_doctor, req.body.properties)
	  .then( function(obj) {
	  	console.log('returned object from create', obj)
	  	SendR.resData(res, 201, Appointment.getPublicOb(obj))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error posting appointment', err)
	  })
})


/* PUT /appointment
  Takes an object in the body {properties: {id_appointment: id_to_update, props to update}}
  Returns the newly updated object and a 201 status
*/
AppointmentAPI.put('/', function(req, res) {

	return Appointment.updateByObj(req.body.properties)
	  .then(function(updated) {
	  	SendR.resData(res, 201, Appointment.getPublicOb(updated))
	  })
	  .catch(function(err) {
	  	SendR.error(res, 500, 'Server error updating appointment', err)
	  })
})



/* DELETE /appointment/:id_appointment
  Deletes the appointment referenced in the url
  Returns a 200 on success
*/
AppointmentAPI.delete('/:id_appointment', function(req, res) {
	
	return Appointment.deleteById(req.params.id_appointment)
	  .then( function() {
	  	SendR.sendStatus(res, 200)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error deleting appointment record', err)
	  })
})

