require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Appointment = require(__server + '/models/appointment')
const UserDoctor = require((__server + '/models/user-doctor'))
const User = require(__server + '/models/user')

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
  	  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '03/22/4994', time: '2:30pm'}, 'blah1')
  	  })
  	  .then( function(appointment) {
        console.log('created appointment', appointment)
  	  	appt1 = appointment
  	  	expect(appt1).to.be.an('object')
  	  	expect(TH.isValidAppt(appt1)).to.be.true
  	  	expect(TH.propsMatch(appt1, {date: '03/22/4994', time: '2:30pm'})).to.be.true
  	  	expect(appt1.id_user_doctor > 0).to.be.true

  	  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '04/22/1991', time: 'noon'}, 'blah2')
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
  	var updateObj = {id_appointment: appt2.id_appointment, time: '4:45pm'}
  	return Appointment.updateByObj(updateObj)
  	  .then(function(ob) {
  	  	expect(TH.isValidAppt(ob)).to.be.true
  	  	expect(TH.propsMatch(ob, appt2)).to.be.false
  	  	expect(ob.date).to.equal(appt2.date)
  	  	expect(ob.time === appt2.time).to.be.false
  	  	expect(ob.time).to.equal(updateObj.time)
  	  })

  })


})