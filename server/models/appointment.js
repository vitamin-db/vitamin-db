const db = require('../db')
const Model = require('./model-helper')
const Promise = require('bluebird')

const UserDoctor = require('./user-doctor')
const Doctor = require('./doctor')
const User = require('./user')


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

/* GET ALL BY USER
  Based on a username, gets every 
*/

/* PACKAGE
  Taking a username, doctor id, and object of other attributes, adds the id_user_doctor to the attributes
  Returns the updated object
*/
Appointment.package = function(username, id_doctor, otherAttrs) {

	var attrs = {}
	for (var p in otherAttrs) {
		attrs[p] = otherAttrs[p]
	}

	return UserDoctor.findId(username, id_doctor)
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
	console.log('inside createAndReturn with args', username, id_doctor, otherAttrs)

	var rand = Math.random()

	return Appointment.package(username, id_doctor, otherAttrs)
	  .then(function(packaged) {
	  	console.log('pakcaged', packaged, rand)
	  	return Appointment.create(packaged)
	  })
	  .then(function(attrs) {
	  	console.log('attributes are', attrs, rand)
	  	return db.select('*').from('appointments').where(attrs)
	  })
	  .then(function(found) {
	  	console.log('found from db: ', found, rand)
	  	return found.length < 1 ? undefined : found.reduce(function(mostRecent, current) {
	  		return mostRecent.id_appointment > current.id_appointment ? mostRecent : current
	  	})
	  })
}



/*
  Takes an array of doctors
  Turns it into an array keeping track of doctors and apointmetns:
  [{doc1}, {doc2}, {doc3}] => [{id_doctor, appointments}, ...]
*/
Appointment.transformDoctors = function(username, doctors) {

	var transformed = []

	return Promise.all(doctors.map( function(doctor) {
		var docOb = {}
		docOb.id_doctor = doctor.id_doctor
		return Appointment.findByUsernameAndDocId(username, doctor.id_doctor)
		  .then(function(appts) {
		  	docOb.appointments = appts
		  	transformed.push(docOb)
		  })
	}))
	.then( function() {
		return transformed
	})

}




/* GET FOR TWILIO
  Takes a user id
  Returns an object with the following properties:
  {
  	userPhone: phone number of user
  	appointments: array of objects, each with the following properties: 
  	{
	  name: name of doctor the appointment is with
	  formattedAddress: string displaying the doctor's street address, city, state, and zip 
	  time: time of appointment
	  date: date of appointment
  	}
  }
*/
// Appointment.getForTwilio = function(userId) {

// 	var userPhone = undefined

// 	var userDoctors = []

// 	var twilioAppts = []

// 	return User.findById(userId)
// 	  .then( function(user) {
// 	  	userPhone = user.phone
// 	  	return UserDoctor.findByAttribute('id_user', user.id_user)
// 	  })
// 	  .then( function(userDoctorRecords) { //userDoctorRecords = array of userdoctors
// 	  	return Promise.all(
// 	  		userDoctorRecords.map(function(userDoctor) {
// 	  			var userDocInfo = {}
// 	  			userDocInfo.id_user_doctor = userDoctor.id_user_doctor
// 	  			return Doctor.findById(userDoctor.id_doctor)
// 	  			  .then(function(doctor) {
// 	  			  	userDocInfo.name = doctor.name
// 	  			  	userDocInfo.formattedAddress = Doctor.formatAddress(doctor)
// 	  			  	userDoctors.push(userDocInfo)
// 	  			  })
// 	  		})
// 	  	)
// 	  })
// 	  .then( function() {
// 	  	return Promise.all(
// 	  		userDoctors.map(function(userDoctor) {
// 	  			return Appointment.getAllByUserDoctor(userDoctor.id_user_doctor)
// 	  			.then(function(appointments) {
// 	  				return Promise.all( appointments.map(function(appointment) {
// 	  					var appointObj = {}
// 	  					appointObj.name = userDoctor.name
// 	  					appointObj.formattedAddress = userDoctor.formattedAddress
// 	  					appointObj.time = appointment.time
// 	  					appointObj.date = appointment.date
// 	  					twilioAppts.push(appointObj)
// 	  				}))
// 	  			})
// 	  		})
// 	  	)
// 	  })
// 	  .then(function() {
// 	  	return {userPhone: userPhone, appointments: twilioAppts}
// 	  })
// }




/* FORMAT FOR TWILIO
  Takes an appointment object
  Transforms that appointment object into an object with properties:
  { userPhone: phone number of correposnding user,
    docName: name of doctor appointment is with,
    docAddress: address of doctor appointmet is with,
    date: date of appointment,
    time: time of appointment}
*/

const later = require('later');

Appointment.formatForTwilio = function(appt) {
	var d = new Date(appt.date + ' ' + appt.time + 'Z')
	
	var minute = later.minute.val(d);
	var hour = later.hour.val(d);
	//setting to day prior so user can get
	//notification 24hr in advance
	var day = later.day.val(d) - 1;
	var month = later.month.val(d) - 1;
	var year = later.year.val(d)
	console.log('cron', minute, hour, day, month, year)
	var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' ' + month + ' *';

	var formatted = {date: appt.date, time: appt.time, cron: parsedCron}
	var userDoc = undefined

	return UserDoctor.findById(appt.id_user_doctor)
	  .then( function(ud) {
	  	userDoc = ud
	  	return Doctor.findById(userDoc.id_doctor)
	  })
	  .then( function(doc) {
	  	formatted.docName = doc.name
	  	formatted.docAddress = Doctor.formatAddress(doc)

	  	return User.findById(userDoc.id_user)
	  })
	  .then( function(user) {
	  	var regex = /\d+/g;
		var phone = '+1'+user.phone.match(regex).join('');

	  	formatted.userPhone = phone

	  	return formatted
	  })
}




/* GET ALL FOR TWILIO
  Returns an array of all appointments existing in the database, formatted according to Appointment.formatforTwilio
*/
Appointment.getAllForTwilio = function() {
	var allForTwilio= []

	return Appointment.getAll()
	  .then( function(allAppts) {
	  	return Promise.all( allAppts.map( function(a) {
	  		return Appointment.formatForTwilio(a)
	  		  .then( function(formatted) {
	  		  	allForTwilio.push(formatted)
	  		  })
	  	}))
	  })
	  .then( function() {
	  	return allForTwilio
	  })
}

