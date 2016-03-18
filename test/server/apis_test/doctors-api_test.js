const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')

describe('/doctor api', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	describe('GET /doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var users_id = undefined
		var newTestDoctor1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
		var doctor1_id = undefined
		var newTestDoctor2 = new TH.DoctorAttributes('Dr. Rick', '4563 First Street', 'Austin', 'TX', 78751, 'doc@rick.com', 'docrick.com', '1234567890', 'therapist')
		var doctor2_id = undefined


		it('returns an array of all doctors pertaining to user', function() {
			return TH.createUserReturnId(newUser)
			  .then(function(id_user) {
			  	users_id = id_user

			  	return UserDoctor.createDoctor(newTestDoctor1, users_id, 'old primary', false)
			  })
			  .then(function(doctor) {
			  	doctor1_id = doctor.id_doctor

			  	return UserDoctor.createDoctor(newTestDoctor2, users_id, 'shrink', true)
			  })
			  .then(function(doctor) {
			  	doctor2_id = doctor.id_doctor

			  	return Auth.createToken(newUser.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	.get('/doctor')
			  	.set('x-access-token', token)
			  	.expect(200)
			  	.then(function(result) {
			  		var got = JSON.parse(result.text)
			  		expect(got).to.be.an('array')
			  		expect(got).to.have.length(2)
			  		expect(TH.allValidPublicDoctors(got)).to.be.true
			  		expect(TH.propsMatch(got[0], newTestDoctor1)).to.be.true
			  		expect(TH.propsMatch(got[0], newTestDoctor2)).to.be.false
			  		expect(TH.propsMatch(got[1], newTestDoctor1)).to.be.false
			  		expect(TH.propsMatch(got[1], newTestDoctor2)).to.be.true
			  	})
			  })

		})

	})


	describe('POST /doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var users_id = undefined
		var newDoc1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
		var newUserDoc1 = TH.getUserDoctor(newDoc1, 'mah primary', true)


		it('returns a 201 status and the newly created doctor object', function() {

			return TH.createUserReturnId(newUser)
			  .then(function(id_user) {
			  	users_id = id_user

			  	return Auth.createToken(newUser.username)
			  })
			  .then(function(token) {

			  	return request(app)
			  	  .post('/doctor')
			  	  .set('x-access-token', token)
			  	  .send({properties: newUserDoc1})
			  	  .expect(201)
			  	  .then(function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(TH.isValidPublicDoctor(got)).to.be.true
			  	  	expect(TH.propsMatch(got, newDoc1)).to.be.true
			  	  })
			  })


		})

		it('adds a doctor to the doctors table', function() {
			return UserDoctor.findAllDoctors(users_id)
			  .then(function(doctors) {
			  	expect(doctors).to.be.an('array')
			  	expect(doctors).to.have.length(1)
			  	expect(doctors[0]).to.be.an('object')
			  	expect(TH.isValidDoctor(doctors[0])).to.be.true
			  	expect(TH.propsMatch(doctors[0], newDoc1)).to.be.true
			  })
		})

		it('creates a record in the user_doctor table', function() {
			return UserDoctor.getAll()
			  .then(function(result) {
			  	expect(result).to.be.an('array')
			  	expect(result).to.have.length(1)
			  	expect(result[0]).to.be.an('object')
			  	expect(TH.isValidUserDoctor(result[0])).to.be.true
			  })
		})
	})

	xdescribe('PUT /doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		it('returns the newly updated doctor object', function() {

		})

		it('updates the doctor information in the database', function() {

		})

	})

	xdescribe('DELETE /doctor/:id_doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		it('returns 200', function() {

		})

		it('removes the user_doctor record', function() {

		})

		it('removes the doctor record', function() {

		})

	})


})