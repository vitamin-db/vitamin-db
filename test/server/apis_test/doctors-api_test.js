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

		it('returns 400 and an error message if the email address is invalid', function() {
			var newDoc2 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.', 'docsmith.com', '1233839292', 'primary')
			var newUserDoc2 = TH.getUserDoctor(newDoc2, 'mah primary', true)

			return Auth.createToken(newUser.username)
				.then(function(token) {
					return request(app)
					  .post('/doctor')
					  .set('x-access-token', token)
					  .send({properties: newUserDoc2})
					  .expect(400)
					  .then(function(result) {
					  	var got = JSON.parse(result.text)
					  	expect(got).to.be.an('object')
					  	expect(got).to.have.keys('error', 'msg')
					  	expect(got.msg).to.equal('Invalid email address')
					  })
				})
 
		})


//NOTE: as long as the zip code can parse to an integer, we'll store it..... user can change it if it's wrong
		// it('returns 400 and an error message if the zip code is not an integer', function() {
		// 	var newDoc3 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', '12345a', 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
		// 	var newUserDoc3 = TH.getUserDoctor(newDoc3, 'mah primary', true)

		// 	return Auth.createToken(newUser.username)
		// 		.then(function(token) {
		// 			return request(app)
		// 			  .post('/doctor')
		// 			  .set('x-access-token', token)
		// 			  .send({properties: newUserDoc3})
		// 			  .expect(400)
		// 			  .then(function(result) {
		// 			  	var got = JSON.parse(result.text)
		// 			  	expect(got).to.be.an('object')
		// 			  	expect(got).to.have.keys('error', 'msg')
		// 			  	expect(got.msg).to.equal('Invalid zip code')
		// 			  })
		// 		})
		// })


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

		it('returns 400 and an error message if an invalid email is entered', function() {
			var props = {id_doctor: newDoc_id, email: 'icanttypehotmail.org'}
			return Auth.createToken(newUser.username)
			  .then(function(token) {
			  	return request(app)
			  	  .put('/doctor')
			  	  .set('x-access-token', token)
			  	  .send({properties: props})
			  	  .expect(400)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(got).to.have.keys('error', 'msg')
			  	  	expect(got.msg).to.equal('Invalid email address')
			  	  })
			  })
		})



		//NOTE: as long as the zip code can parse to an integer, we'll store it..... user can change it if it's wrong
		// it('returns 400 and an error message if an invalid zip code is entered', function() {
		// 	var props = {id_doctor: newDoc_id, zip: '82829-3983'}
		// 	return Auth.createToken(newUser.username)
		// 	  .then(function(token) {
		// 	  	return request(app)
		// 	  	  .put('/doctor')
		// 	  	  .set('x-access-token', token)
		// 	  	  .send({properties: props})
		// 	  	  .expect(400)
		// 	  	  .then( function(result) {
		// 	  	  	var got = JSON.parse(result.text)
		// 	  	  	expect(got).to.be.an('object')
		// 	  	  	expect(got).to.have.keys('error', 'msg')
		// 	  	  	expect(got.msg).to.equal('Invalid email address')
		// 	  	  })
		// 	  })	
		// })

		it('returns 200 if userdoctor information changes', function() {
			var props = {id_doctor: newDoc_id, type_usermade: 'evil doctor - do not go back'}
			return Auth.createToken(newUser.username)
			  .then(function(token) {
			  	return request(app)
			  	  .put('/doctor')
			  	  .set('x-access-token', token)
			  	  .send({properties: props})
			  	  .expect(201)
			  })		
		})

		it('updates the database when the userdoctor info is changed', function() {
			return UserDoctor.findId(newUser.username, newDoc_id)
			  .then( function(id) {
			  	return UserDoctor.findById(id)
			  })
			  .then( function(userDoctor) {
			  	expect(userDoctor.type_usermade).to.equal('evil doctor - do not go back')
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