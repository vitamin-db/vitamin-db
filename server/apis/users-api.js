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
	  	console.log('data for user: ', dataForUser)
	  	return User.getPublic(userObj)
	  })
	  .then( function(publicUser) {
	  	dataForUser.user = publicUser
	  	console.log('data for user: ', dataForUser)

	  	return UserDoctor.findAllDoctors(userId)
	  })
	  .then( function(doctors) {
	  	dataForUser.doctors = doctors.map(doctor => Doctor.getPublicOb(doctor))
	  	console.log('data for user: ', dataForUser)

	  	return Appointment.transformDoctors(req.decoded.username, doctors)
	  })
	  .then( function(appointments) {
	  	dataForUser.appointments = appointments
	  	console.log('data for user: ', dataForUser)

	  	return EyeRx.getCurrentByUser(userId)
	  })
	  .then( function(eyerx) {
	  	dataForUser.eyerx = EyeRx.getPublicOb(eyerx)
	  	console.log('data for user: ', dataForUser)

	  	return Allergy.getAllByUser(userId)
	  })
	  .then( function(allergies) {
	  	dataForUser.allergies = allergies.map(allergy => Allergy.getPublicOb(allergy))
	  	console.log('data for user: ', dataForUser)

	  	return FamilyMember.getAllByUser(userId)
	  })
	  .then( function(family) {
	  	console.log('data for user: ', dataForUser)

	  	return FamilyHistory.transformFamilyList(family)

	  })
	  .then( function(familyHist) {
	  	dataForUser.family = familyHist
	  	console.log('data for user: ', dataForUser)

	  	return Insurance.getAllByUser(userId)
	  })
	  .then(function(insurance) {
	  	dataForUser.insurance = insurance.map(insur => Insurance.getPublicOb(insur))
	  	console.log('data for user: ', dataForUser)

	  	return Pharmacy.getAllByUser(userId)
	  })
	  .then( function(pharmacies) {
	  	dataForUser.pharmacies = pharmacies.map(pharma => Pharmacy.getPublicOb(pharma))
	  	console.log('data for user: ', dataForUser)

	  	return Rx.getAllByUser(userId)
	  })
	  .then( function(rx) {
	  	dataForUser.rx = rx.map(script => Rx.getPublicOb(script))
	  	console.log('data for user: ', dataForUser)

	  	return Immun.getAllByUser(userId)
	  })
	  .then( function(immuns) {
	  	dataForUser.immunizations = immuns.map(i => Immun.getPublicOb(i))
	  	console.log('data for user: ', dataForUser)


	  	//Send data after dealing with all data types
	  	SendR.resData(res, 200, dataForUser)
	  })
	  .catch( function(err) {
	  	console.log('** error getting info for user: ', err)
	  	SendR.error(res, 500, 'Server error', err)
	  })

})