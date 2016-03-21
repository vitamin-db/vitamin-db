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
			  	  	expect(got).to.have.length(1)
			  	  	expect(got[0]).to.be.an('object')
			  	  	expect(got[0].id_doctor).to.equal(newDoc1.id_doctor)
			  	  	expect(got[0]['appointments']).to.be.an('array')
			  	  	expect(got[0]['appointments']).to.have.length(2)
			  	  	expect(TH.allValidPublicAppts(got[0]['appointments'])).to.be.true
			  	  	expect(TH.propsMatch(got[0]['appointments'][0], appt1)).to.be.true
			  	  	expect(TH.propsMatch(got[0]['appointments'][1], appt2)).to.be.true
			  	  })
			  })

		})

	})

	xdescribe('POST appointment', function() {

		it('returns 201 and the newly created appointment', function() {

		})

		it('adds an appointment to the database', function() {

		})

	})

	xdescribe('PUT appointment', function() {

		it('returns 201 and the updated appointment object', function() {

		})

		it('changes the stored appointment data', function() {

		})
	})

	xdescribe('DELETE appointment', function() {

		it('returns 200', function() {

		})

		it('deletes the appointment from the database', function() {

		})

	})



})