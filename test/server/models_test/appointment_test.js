require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Appointment = require(__server + '/models/appointment')
const UserDoctor = require((__server + '/models/user-doctor'))
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')

xdescribe('**************** Appointment Model ****************', function() {

  before(function() {
    return db.deleteEverything()
  })

  var newTestUser1 = new TH.UserAttributes('bob1', 'alice1', 'bob1@alice1.com', '123-789-3456')
  var user1_id = undefined

  var newDoc1 = undefined
  var newDoc2 = undefined

  var appt1 = undefined
  var appt2 = undefined
  var appt3 = undefined
  var appt4 = undefined

  it('creates new appointments and returns the newly created object', function() {

  	return TH.createUserReturnId(newTestUser1)
  	  .then( function(id) {
        console.log('created user with id', id)
  	  	user1_id = id

  	  	var doc = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
  	  	return UserDoctor.createDoctor(doc, user1_id, 'primary1', true)
  	  })
  	  .then( function(doctor) {
        console.log('created doctor', doctor)
  	  	newDoc1 = doctor
  	  	var doc = new TH.DoctorAttributes('Dr. Otherman', '235 Franklin Ave', 'Austin', 'TX', 29384, 'otherman@doc.com', 'theotherdoc.com', '0987654321', 'hypnotist')
  	  	return UserDoctor.createDoctor(doc, user1_id, 'primary2', true)
  	  })
  	  .then( function(doctor) {
        console.log('created second doctor', doctor)
  	  	newDoc2 = doctor
  	  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '03/22/4994', time: '14:30Z'})
  	  })
  	  .then( function(appointment) {
        console.log('created appointment', appointment)
  	  	appt1 = appointment
  	  	expect(appt1).to.be.an('object')
  	  	expect(TH.isValidAppt(appt1)).to.be.true
  	  	expect(TH.propsMatch(appt1, {date: '03/22/4994', time: '14:30Z'})).to.be.true
  	  	expect(appt1.id_user_doctor > 0).to.be.true

  	  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '04/22/1991', time: '8:45Z'})
  	  })
  	  .then(function(appt) {
  	  	appt2 = appt
  	  	return Appointment.getAll()
  	  })
  	  .then(function(all) {
  	  	expect(all).to.be.an('array')
  	  	expect(all).to.have.length(2)
  	  	expect(TH.allValidAppts(all)).to.be.true
  	  	expect(TH.propsMatch(all[0], appt1)).to.be.true
  	  	expect(TH.propsMatch(all[1], appt1)).to.be.false
  	  	expect(TH.propsMatch(all[0], appt2)).to.be.false
  	  	expect(TH.propsMatch(all[1], appt2)).to.be.true
  	  })

  })

  it('finds appointments based on the username and id_doctor', function() {
  	return Appointment.findByUsernameAndDocId(newTestUser1.username, newDoc2.id_doctor)
  	  .then(function(matchingAppts){
  	  	expect(matchingAppts).to.be.an('array')
  	  	expect(matchingAppts).to.have.length(0)

  	  	return Appointment.findByUsernameAndDocId(newTestUser1.username, newDoc1.id_doctor)
  	  })
  	  .then(function(matchingAppts) {
  	  	expect(matchingAppts).to.be.an('array')
  	  	expect(matchingAppts).to.have.length(2)
  	  	expect(TH.allValidAppts(matchingAppts)).to.be.true
  	  	expect(TH.propsMatch(matchingAppts[0], appt1)).to.be.true
  	  	expect(TH.propsMatch(matchingAppts[1], appt1)).to.be.false
  	  	expect(TH.propsMatch(matchingAppts[0], appt2)).to.be.false
  	  	expect(TH.propsMatch(matchingAppts[1], appt2)).to.be.true
  	  })

  })

  // it('gets all appointments related to a user', function() {

  // })

  it('deletes an appointment record by id', function() {
  	return Appointment.deleteById(appt1.id_appointment)
  	  .then(function() {
  	  	return Appointment.getAll()
  	  })
  	  .then(function(allAppts) {
  	  	expect(allAppts).to.have.length(1)
  	  	expect(TH.propsMatch(allAppts[0], appt2)).to.be.true
  	  })

  })

  it('updates an appointment information based on a passed-in object, and returns the updated appointment obj', function() {
  	var updateObj = {id_appointment: appt2.id_appointment, time: '16:45Z'}
  	return Appointment.updateByObj(updateObj)
  	  .then(function(ob) {
  	  	expect(TH.isValidAppt(ob)).to.be.true
  	  	expect(TH.propsMatch(ob, appt2)).to.be.false
  	  	expect(ob.date).to.equal(appt2.date)
  	  	expect(ob.time === appt2.time).to.be.false
  	  	expect(ob.time).to.equal(updateObj.time)
  	  })

  })

  it('returns appointment information for twilio', function() {
    return Appointment.getAll()
      .then(function(all) {
        return Appointment.formatForTwilio(all[0])
      })
      .then(function(formatted) {
        expect(formatted).to.be.an('object')
        expect(formatted).to.have.keys('userPhone', 'docName', 'docAddress', 'time', 'date')
        expect(formatted.userPhone).to.equal(newTestUser1.phone)
        expect(formatted.docName).to.equal(newDoc1.name)
        expect(formatted.docAddress).to.equal(Doctor.formatAddress(newDoc1))
        expect(formatted.time).to.equal('16:45Z')
        expect(formatted.date).to.equal(appt2.date)
      })
  })

  it('formats all appointment records for twilio', function() {
    //have one appointment, appt2, linked to doctor 1
    return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '03/02/2017', time: '9:00Z'})
      .then(function(appt) {
        appt3 = appt //appt3,  linked to doctor 1

        return Appointment.createAndReturn(newTestUser1.username, newDoc2.id_doctor, {date: '10/3/2018', time: '10:00Z'})
      })
      .then(function(appt) {
        appt4 = appt //appt4, linked to doctor 2
        return Appointment.getAllForTwilio()
      })
      .then(function(forTwilio) {
        // console.log('forTwilio obj looks like', forTwilio)
        expect(forTwilio).to.be.an('array')
        expect(forTwilio).to.have.length(3)
        forTwilio.forEach(function(e) {
          expect(e).to.be.an('object')
          expect(e).to.have.keys('userPhone', 'docName', 'docAddress', 'time', 'date')
        })
      })
  })


})






