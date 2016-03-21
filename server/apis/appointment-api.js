// handles routes that start with /appointment

const Appointment = require('../models/appointment')
const User = require('../models/user')
const SendR = require('../sendresponse')

const AppointmentAPI = require('express').Router();

module.exports = AppointmentAPI


/* GET /appointment
Returns all appointments pertaining to the user, grouped by doctor
For example, might get back: 
[{id_doctor: #, appointments: [ {}, {} ] }, ...]
*/
AppointmentAPI.get('/', function(req, res) {

	return UserDoctor.findAllDoctors(req.decoded.username)
	  .then(function(docs) {
	  	console.log('doctor array to be transformed', docs)
	  	return Appointment.transformDoctors(docs)
	  })
	  .then(function(transformed) {
	  	console.log('transformed these doctors into', transformed)
	  	SendR.resData(res, 200, transformed)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error getting appointment records', err)
	  })
	  
})