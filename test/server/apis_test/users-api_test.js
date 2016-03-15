const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')

xdescribe("GET /user", function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	beforeEach(function() {
		return db.deleteEverything()
	})

	it("returns 403 if no token is passed", function() {
		
		return request(app)
		  .get('/user')
		  .expect(403)

	})

	it("returns stored info if token is passed in", function() {

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')
		var newTestDoctor1 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary', true)
		var newTestDoctor2 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist', false)

		var userId = undefined
		var doc1Id = undefined
		var doc2Id = undefined

		var myToken = undefined

		return TH.createUserReturnId(newTestUser)
		  .then( function(id) {
		  	userId = id

		  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor1, 'primary', true)
		  })
		  .then( function() {
		  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor2, 'nonprimary', true)
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
		  	  	expect(TH.isValidPublicUser(objForClient['user']) ).to.be.true
		  	  	expect(objForClient['doctors']).to.be.an('array')
		  	  	expect(objForClient['doctors']).to.have.length(2)
		  	  	expect(TH.allValidDoctors(objForClient['doctors'])).to.be.true
		  	  })
		  })

	})





})


