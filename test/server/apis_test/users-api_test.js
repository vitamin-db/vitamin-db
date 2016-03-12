const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')
const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')

describe("GET /user", function() {

	//set up app
	var app = TestHelper.createApp()
	app.use('/', routes)
	app.testReady()

	beforeEach(function() {
		return db.deleteEverything()
	})

	var UserAttributes = function(username, password, email, phone) {
		this.username = username
		this.password = password
		this.email = email
		this.phone = phone
	}

	var DoctorAttributes = function(name, street_address, city, state_abbrev, zip, email, web, phone, type, current) {
	  this.name = name
	  this.street_address = street_address
	  this.city = city
	  this.state_abbrev = state_abbrev
	  this.zip = zip
	  this.email = email
	  this.web = web
	  this.phone = phone
	  this.type = type
	  this.current = current
	}

	var UserDoctorAttributes = function(id_user, id_doctor, type_usermade) {
	  this.id_user = id_user;
	  this.id_doctor = id_doctor;
	  this.type_usermade = type_usermade;
	}


	it("returns 403 if no token is passed", function() {
		
		return request(app)
		  .get('/user')
		  .expect(403)

	})

	it("returns stored info if token is passed in", function() {

		var newTestUser = new UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')
		var newTestDoctor1 = new DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary', true)
		var newTestDoctor2 = new DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist', false)

		var userId = undefined
		var doc1Id = undefined
		var doc2Id = undefined

		var myToken = undefined

		return User.createUser(newTestUser)
		  .then( function(user) {
		  	return User.findByUsername(user.username)
		  })
		  .then( function(wholeUser) {
		  	userId = wholeUser.id_user
		  	return Doctor.create(newTestDoctor1)
		  })
		  .then( function(doc) {
		  	return Doctor.findByName(doc.name)
		  })
		  .then( function(wholeDoc) {
		  	doc1Id = wholeDoc.id_doctor
		  	return Doctor.create(newTestDoctor2)
		  })
		  .then( function(doc) {
		  	return Doctor.findByName(doc.name)
		  })
		  .then( function(wholeDoc) {
		  	doc2Id = wholeDoc.id_doctor

		  	var newUserDoc1 = new UserDoctorAttributes(userId, doc1Id, 'primary')
		  	return UserDoctor.create(newUserDoc1)
		  })
		  .then( function() {
		  	var newUserDoc2 = new UserDoctorAttributes(userId, doc2Id, 'nonprimary')
		  	return UserDoctor.create(newUserDoc2)
		  })
		  .then( function() {
		  	return Auth.createToken(newTestUser.username)
		  })
		  .then( function(token) {
		  	myToken = token

		  	return request(app)
		  	  .get('/user')
		  	  .set('x-access-token', myToken)
		  	  .expect(200)
		  	  .then( function(result) {

		  	  	var objForClient = JSON.parse(result.text)

		  	  	expect(objForClient).to.be.an('object')
		  	  	expect(objForClient['user']).to.be.an('object')
		  	  	expect(objForClient['doctors']).to.have.length(2)
		  	  	expect(objForClient['user']).to.have.keys('username', 'email', 'phone')
		  	  	expect(objForClient['doctors'][0]).to.have.keys('id_doctor', 'name', 'street_address', 'type', 'current',
		  	  		                                            'city', 'zip', 'state_abbrev', 'email', 'web', 'phone',
		  	  		                                            'created_at', 'updated_at'
		  	  		                                           )

		  	  })
		  })

	})





})