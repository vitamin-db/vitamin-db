const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')

xdescribe('/doctor api', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	xdescribe('GET /doctor', function() {

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

	describe('PUT /doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var users_id = undefined
		var newDoc1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
		// var newUserDoc1 = TH.getUserDoctor(newDoc1, 'mah primary', true)
		var newDoc_id = undefined


		it('returns the newly updated doctor object', function() {

			return TH.createUserReturnId(newUser)
			  .then(function(id_user) {
			  	users_id = id_user
			  	return UserDoctor.createDoctor(newDoc1, users_id, 'old primary', false)
			  })
			  .then(function(doctor) {
			  	newDoc_id = doctor.id_doctor
			  	return Auth.createToken(newUser.username)
			  })
			  .then(function(token) {
			  	var props = {id_doctor: newDoc_id, street_address: '234 Main Street', city: 'Dallas'}
			  	return request(app)
			  	.put('/doctor')
			  	.set('x-access-token', token)
			  	.send({properties: props})
			  	.expect(201)
			  	.then(function(result) {
			  		var got = JSON.parse(result.text)
			  		expect(got).to.be.an('object')
			  		expect(TH.isValidPublicDoctor(got)).to.be.true
			  		expect(got.name).to.equal('Dr. Smith')
			  		expect(got.street_address).to.equal('234 Main Street')
			  		expect(got.city).to.equal('Dallas')
			  	})
			  })


		})

		it('updates the doctor information in the database', function() {

			return Doctor.findById(newDoc_id)
			  .then(function(doctor) {
			  	expect(doctor).to.be.an('object')
			  	expect(TH.isValidPublicDoctor(doctor)).to.be.true
			  	expect(doctor.name).to.equal('Dr. Smith')
			  	expect(doctor.street_address).to.equal('234 Main Street')
			  	expect(doctor.city).to.equal('Dallas')
			  })
		})

	})

	describe('DELETE /doctor/:id_doctor', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var users_id = undefined
		var newDoc1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
		var newDoc2 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'therapist')

		// var newUserDoc1 = TH.getUserDoctor(newDoc1, 'mah primary', true)
		var newDoc_id = undefined
		var newDoc2_id = undefined

		it('returns 200', function() {

			return TH.createUserReturnId(newUser)
			  .then(function(id_user) {
			  	users_id = id_user
			  	return UserDoctor.createDoctor(newDoc1, users_id, 'old primary', false)
			  })
			  .then(function(doctor) {
			  	newDoc_id = doctor.id_doctor

			  	return UserDoctor.createDoctor(newDoc2, users_id, 'new primary', true)
			  })
			  .then(function(doctor) {
			  	newDoc2_id = doctor.id_doctor
			  	return Auth.createToken(newUser.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	  .del('/doctor/' + newDoc_id)
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  })

		})

		it('removes the user_doctor record', function() {
			return UserDoctor.getAll()
			  .then(function(all) {
			  	expect(all).to.be.an('array')
			  	expect(all).to.have.length(1)
			  	expect(all[0].type_usermade).to.equal('new primary')
			  	expect(all[0].current).to.be.true
			  })
		})

		it('removes the doctor record', function() {
			return Doctor.getAll()
			  .then(function(allDocs) {
			  	expect(allDocs).to.be.an('array')
			  	expect(allDocs).to.have.length(1)
			  	expect(TH.propsMatch(allDocs[0], newDoc2)).to.be.true
			  })
		})

	})


})