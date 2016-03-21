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
	  	console.log('doctor array to be transformed', docs)
	  	return Appointment.transformDoctors(req.decoded.username, docs)
	  })
	  .then(function(transformed) {
	  	console.log('transformed these doctors into', transformed)
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








