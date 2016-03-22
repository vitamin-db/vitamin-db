// handles routes that start with /user

const User = require('../models/user')
const Doctor = require('../models/doctor')
const UserDoctor = require('../models/user-doctor')
const EyeRx = require('../models/eyerx')
const Allergy = require('../models/allergy')
const Appointment = require('../models/appointment')
const FamilyHistory = require('../models/familyhistory')
const FamilyMember = require('../models/familymembers')
const Immun = require('../models/immun')
const Insurance = require('../models/insurance')
const Pharmacy = require('../models/pharmacy')
const Rx = require('../models/rx')

const SendR = require('../sendresponse')

const UserAPI = require('express').Router();

module.exports = UserAPI


/*
  Returns: {
	user: { username, email, phone },
	doctors: [
	  {name, street_address, city, state_abbrev, zip, email, web, phone, type, created_at, updated_at }, {}, {} ],
	appointments: [ { id_doctor: #, 
	                  appointments: [{id_appointment, id_user_doctor, date, time}, {}, .... ] 
	                }, {}, {}, ... 
	              ],
	allergies: [{id_allergy, id_user, allergen, current}, {}, ..],
	family: [ { id_familymember: #, history: [{id_famhist, id_familymember, condition}, {}, {}, ... ],
	insurance: [ {id_insurance, id_user, plan_name, group_id, plan_id, rx_bin, current}, {}, {}, ...],
	pharmacies: [{id_pharmacy, id_user, business_name, address, phone, current}, {}, ...],
	rx: [ {id_rx, id_user, id_pharmacy, id_doctor, refill_number, name, dosage, current}, {}, ...],
	immunizations: [{id_immun, id_user, date, type, notes}, {}, ..]
  }
*/
UserAPI.get('/', function(req, res) {

	var dataForUser = {}

	var userId = undefined

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
	  	return Appointment.transformDoctors(req.decoded.username, doctors)
	  })
	  .then( function(appointments) {
	  	dataForUser.appointments = appointments
	  	return EyeRx.getCurrentByUser(userId)
	  })
	  .then( function(eyerx) {
	  	dataForUser.eyerx = EyeRx.getPublicOb(eyerx)
	  	return Allergy.getAllByUser(userId)
	  })
	  .then( function(allergies) {
	  	dataForUser.allergies = allergies.map(allergy => Allergy.getPublicOb(allergy))
	  	return FamilyMember.getAllByUser(userId)
	  })
	  .then( function(family) {
	  	return FamilyHistory.transformFamilyList(family)
	  })
	  .then( function(familyHist) {
	  	dataForUser.family = familyHist
	  	return Insurance.getAllByUser(userId)
	  })
	  .then(function(insurance) {
	  	dataForUser.insurance = insurance.map(insur => Insurance.getPublicOb(insur))
	  	return Pharmacy.getAllByUser(userId)
	  })
	  .then( function(pharmacies) {
	  	dataForUser.pharmacies = pharmacies.map(pharma => Pharmacy.getPublicOb(pharma))
	  	return Rx.getAllByUser(userId)
	  })
	  .then( function(rx) {
	  	dataForUser.rx = rx.map(script => Rx.getPublicOb(script))
	  	return Immun.getAllByUser(userId)
	  })
	  .then( function(immuns) {
	  	dataForUser.immunizations = immuns.map(i => Immun.getPublicOb(i))

	  	//Send data after dealing with all data types
	  	SendR.resData(res, 200, dataForUser)
	  })
	  .catch( function(err) {
	  	console.log('** error getting info for user: ', err)
	  	SendR.error(res, 500, 'Server error', err)
	  })

})


/* POST
  Properties to be updated go in req.body.properties
  If you try to change the username to something that already exists:
   - it will return a 400 (bad request)
   - it will return an error with error.msg = 'Username already exists!'
  Otherwise, will try to run the changes - if successful, it will return:
   - a 201
   - teh updated public user data
*/

UserAPI.put('/', function(req, res) {

	var id = undefined

	var newUsername = req.body.properties.username
	var newPassword = req.body.properties.password

	var nonPw = {}
	var haveOthers = false
	for (var p in req.body.properties) {
		if (p !== 'password') {
			haveOthers = true
			nonPw[p] = req.body.properties[p]
		}
	}

	return User.findByUsername(req.decoded.username)
	  .then(function(user) {
	  	id = user.id_user

	  	if (newUsername) {
	  		return User.existsByUsername(newUsername)
	  		  .then(function(exists) {
	  		  	if(exists) {
	  		  		throw new Error('Username already exists!')
	  		  	}
	  		  })
	  	}
	  })
	  .catch(function(err) {
	  	if (err.message === 'Username already exists!') {
	  		SendR.error(res, 400, err.message, err)
	  		throw Error(err.message)
	  	}
	  	throw Error('server error updating user')
	  })
	  .then(function() {
	  	if (newPassword) {
	  		return User.changePassword(id, newPassword)
	  	}
	  })
	  .then(function() {
	  	if (haveOthers) {
	  		return User.updateById(id, nonPw)
	  	}
	  })
	  .then(function() {
	  	return User.findById(id)
	  })
	  .then(function(user) {
	  	return User.getPublic(user)
	  })
	  .then(function(publicUser) {
	  	SendR.resData(res, 201, publicUser)
	  })
	  .catch(function(err) {
	  	if (err.message !== 'Username already exists!') {
	  		SendR.error(res, 500, 'Server error updating user', err)
	  	}
	  })

})


