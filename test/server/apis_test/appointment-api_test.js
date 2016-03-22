const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const UserDoctor = require(__server + '/models/user-doctor')
const Appointment = require(__server + '/models/appointment')

xdescribe('/appointment API', function() {

	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

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


	describe('GET appointment', function() {

		it('returns 200 and all appointments associated with the user, grouped by doctor', function() {
			return TH.createUserReturnId(newTestUser1)
			  .then( function(id) {
			  	user1_id = id
			  	var doc = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
			  	return UserDoctor.createDoctor(doc, user1_id, 'primary1', true)
			  })
			  .then( function(doctor) {
			  	newDoc1 = doctor
			  	var doc = new TH.DoctorAttributes('Dr. Otherman', '235 Franklin Ave', 'Austin', 'TX', 29384, 'otherman@doc.com', 'theotherdoc.com', '0987654321', 'hypnotist')
			  	return UserDoctor.createDoctor(doc, user1_id, 'primary2', true)
			  })
			  .then( function(doctor) {
			  	newDoc2 = doctor
			  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '03/22/4994', time: '2:30pm'}, 'blah5')
			  })
			  .then( function(appointment) {
			  	appt1 = appointment
			  	return Appointment.createAndReturn(newTestUser1.username, newDoc1.id_doctor, {date: '04/22/1991', time: 'noon'}, 'blah6')
			  })
			  .then(function(appt) {
			  	appt2 = appt

			  	return Auth.createToken(newTestUser1.username)
			  })
			  .then( function(token) {
			  	return request(app)
			  	  .get('/appointment')
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	console.log('got in /get appointment', got)

			  	  	expect(got).to.be.an('array')
			  	  	expect(got).to.have.length(2)

			  	  	var withContent = got[0]['appointments'].length > 0 ? got[0] : got[1]
			  	  	var withoutContent = got[0]['appointments'].length > 0 ? got[1] : got[0]

	
			  	  	expect(withContent).to.be.an('object')
			  	  	expect(withContent.id_doctor).to.equal(newDoc1.id_doctor)
			  	  	expect(withContent['appointments']).to.be.an('array')
			  	  	expect(withContent['appointments']).to.have.length(2)
			  	  	expect(TH.allValidPublicAppts(withContent['appointments'])).to.be.true
			  	  	expect(TH.propsMatch(withContent['appointments'][0], appt1)).to.be.true
			  	  	expect(TH.propsMatch(withContent['appointments'][1], appt2)).to.be.true
			  	  	expect(withoutContent).to.be.an('object')
			  	  	expect(withoutContent.id_doctor).to.equal(newDoc2.id_doctor)
			  	  	expect(withoutContent['appointments']).to.be.an('array')
			  	  	expect(withoutContent['appointments']).to.have.length(0)
			  	  })
			  })

		})

	})

	describe('POST appointment/:id_doctor', function() {

		it('returns 201 and the newly created appointment', function() {
			var props = {date: '10/03/2015', time: '10am'}
			return Auth.createToken(newTestUser1.username)
			  .then(function(token) {
			  	return request(app)
				  	.post('/appointment/' + newDoc2.id_doctor)
				  	.set('x-access-token', token)
				  	.send({properties: props})
				  	.expect(201)
				  	.then( function(result) {
				  		var got = JSON.parse(result.text)
				  		expect(got).to.be.an('object')
				  		expect(TH.isValidPublicAppt(got)).to.be.true
				  		expect(got.date).to.equal(props.date)
				  		expect(got.time).to.equal(props.time)
				  		appt3 = got
				  	})
			  })

		})

		it('adds an appointment to the database', function() {
			return Appointment.findByUsernameAndDocId(newTestUser1.username, newDoc2.id_doctor)
			  .then( function(result) {
			  	expect(result).to.be.an('array')
			  	expect(result).to.have.length(1)
			  	expect(TH.propsMatch(result[0], appt3)).to.be.true
			  })
		})

	})

	describe('PUT appointment', function() {

		it('returns 201 and the updated appointment object', function() {
			var update = {id_appointment: appt1.id_appointment, time: '4:30pm'}
			return Auth.createToken(newTestUser1.username)
			  .then( function(token) {
			  	return request(app)
			  	  .put('/appointment')
			  	  .set('x-access-token', token)
			  	  .send({properties: update})
			  	  .expect(201)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(TH.isValidPublicAppt(got)).to.be.true
			  	  	expect(TH.propsMatch(got, appt1)).to.be.false
			  	  	expect(got.id_appointment).to.equal(appt1.id_appointment)
			  	  	expect(got.id_user_doctor).to.equal(appt1.id_user_doctor)
			  	  	expect(got.date).to.equal(appt1.date)
			  	  	expect(got.time).to.equal(update.time)
			  	  })
			  })

		})

		it('changes the stored appointment data', function() {
			return Appointment.findById(appt1.id_appointment)
			  .then(function(appt) {
			  	expect(TH.isValidAppt(appt)).to.be.true
			  	expect(TH.propsMatch(appt, appt1)).to.be.false
			  	expect(appt.date).to.equal(appt1.date)
			  	expect(appt.time).to.equal('4:30pm')
			  })
		})
	})

	describe('DELETE appointment', function() {

		it('returns 200', function() {
			return Auth.createToken(newTestUser1.username)
			  .then( function(token) {
			  	return request(app)
			  	  .del('/appointment/' + appt1.id_appointment)
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  })
		})

		it('deletes the appointment from the database', function() {
			return Appointment.findByUsernameAndDocId(newTestUser1.username, newDoc1.id_doctor)
			  .then(function(all) {
			  	expect(all).to.be.an('array')
			  	expect(all).to.have.length(1)
			  	expect(TH.propsMatch(all[0], appt2)).to.be.true
			  })
		})

	})



})