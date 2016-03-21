const db = require('../db')
const Model = require('./model-helper')
const Promise = require('bluebird')

const UserDoctor = require('./user-doctor')

const Appointment = new Model('appointments', ['id_appointment', 'id_user_doctor', 'date', 'time'])
module.exports = Appointment

/* GET ALL BY USER DOCTOR
  Returns an array of appointments matching the passed in id_user_doctor
*/
Appointment.getAllByUserDoctor = function(id_user_doctor) {
	return this.findByAttribute('id_user_doctor', id_user_doctor)
}


/* DELETE ALL FROM USER DOCTOR
  Deletes all appointments massing the passed in user_doctor id
*/
Appointment.deleteAllFromUserDoctor = function(id_user_doctor) {
	return Appointment.getAllByUserDoctor(id_user_doctor)
	  .then(function(allAppts) {
	  	return Promise.all([
	  		allAppts.forEach(record => Appointment.deleteById(record.id_appointment))
	  	])
	  })
}

/* FIND BY USERNAME AND DOCID
  Based on a username and a doctor id, returns an array of all matching appointments
*/
Appointment.findByUsernameAndDocId = function(username, id_doctor) {
	return UserDoctor.findId(username, id_doctor)
	  .then(function(id) {
	  	return Appointment.findByAttribute('id_user_doctor', id)
	  })
}

/* PACKAGE
  Taking a username, doctor id, and object of other attributes, adds the id_user_doctor to the attributes
  Returns the updated object
*/
Appointment.package = function(username, id_doctor, otherAttrs) {

	var attrs = {}
	for (var p in otherAttrs) {
		attrs[p] = otherAttrs[p]
	}

	return UserDoctor.findId(useranme, id_doctor)
	  .then(function(id) {
	  	attrs.id_user_doctor = id
	  	return attrs
	  })

}

/* CREATES AN APPOINTMENT
Creates a new appointment 
OtherAttrs should contain the properties:
  - date as string: 'MM/DD/YYYY'
  - time as string
Returns the newly created appointment
*/
Appointment.createAndReturn = function(username, id_doctor, otherAttrs) {

	return Appointment.package(username, id_doctor, otherAttrs)
	  .then(function(packaged) {
	  	return Appointment.create(packaged)
	  })
	  .then(function(attrs) {
	  	return db.select('*').from('appointments').where(attrs)
	  })
	  .then(function(found) {
	  	return found.reduce(function(mostRecent, current) {
	  		return mostRecent.id_appointment > current.id_appointment ? mostRecent : current
	  	})
	  })
}



