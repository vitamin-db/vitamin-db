const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const EyeRx = require(__server + '/models/eyerx')

describe('/eyerx', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	xdescribe('GET /eyerx', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var user1_id = undefined
		var newEyeRx1 = undefined
		var newEyeRx2 = undefined

		it('returns the current prescription', function() {

			return TH.createUserReturnId(newUser1)
			  .then(function(id) {
			  	user1_id = id
			  	newEyeRx1 = new TH.EyeRxAttributes(user1_id, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2)
			  	return EyeRx.createEyeRx(newEyeRx1)
			  })
			  .then(function() {
			  	newEyeRx2 = new TH.EyeRxAttributes(user1_id, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2)
			  	return EyeRx.createEyeRx(newEyeRx2)
			  })
			  .then(function() {
			  	return Auth.createToken(newUser1.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	  .get('/eyerx')
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  	  .then(function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(got.eyerx).to.be.an('object')
			  	  	expect(got.eyerx.current).to.be.true
			  	  	expect(TH.isValidEyerx(got.eyerx)).to.be.true
			  	  	expect(TH.propsMatchExceptMaybeCurrent(got.eyerx, newEyeRx2)).to.be.true
			  	  })
			  })

		})
	})

	describe('POST /eyerx', function() {

		//set up app
		var app = TH.createApp()
		app.use('/', routes)
		app.testReady()

		before(function() {
			return db.deleteEverything()
		})


	  	var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
	  	var user1_id = undefined
	  	var newEyeRx1 = undefined

	  	it('returns the newly posted prescription', function() {
	  		return TH.createUserReturnIdAndToken(newUser1)
	  		  .then(function(userAndToken) {
	  		  	user1_id = userAndToken.id_user
	  		  	return request(app)
	  		  	  .post('/eyerx')
	  		  	  .set('x-access-token', userAndToken.token)
	  		  	  .expect(201)
	  		  	  .then(function(result) {
	  		  	  	var newEyeRx = JSON.parse(result)
	  		  	  	expect(newEyeRx).to.be.an('object')
	  		  	  	expect(TH.isValidPublicEyerx(newEyeRx)).to.be.true
	  		  	  	expect(TH.propsMatchExceptMaybeCurrent(newEyeRx, newEyeRx1)).to.be.true
	  		  	  })
	  		  })
	  	})

	  	it('adds a prescription to the database', function() {
	  		return EyeRx.getAllByUser(user1_id)
	  		  .then(function(allEyeRx) {
	  		  	expect(allEyeRx).to.be.an('array')
	  		  	expect(allEyeRx).to.have.length(1)
	  		  	expect(TH.isValidPublicEyerx(allEyeRx[0])).to.be.true
	  		  	expect(TH.propsMatchExceptMaybeCurrent(allEyeRx[0], newEyeRx1)).to.be.true
	  		  })
	  	})


	})

	xdescribe('PUT /eyerx', function() {

		//set up app
		var app = TH.createApp()
		app.use('/', routes)
		app.testReady()

		before(function() {
			return db.deleteEverything()
		})

		var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var user1_id = undefined
		var newEyeRx1 = undefined

	  	it('returns the updated prescription', function() {
	  		return TH.createUserReturnId(newUser1)
	  		  .then(function(id) {
	  		  	user1_id = id
	  		  	newEyeRx1 = new TH.EyeRxAttributes(user1_id, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2)
	  		  	return EyeRx.createEyeRx(newEyeRx1)
	  		  })
	  		  .then(function() {
	  		  	return request(app)
	  		  	  .put('/eyerx')
	  		  	  .send({})
	  		  })
	  	})


	  	it('modifies the specified prescription in the database', function() {

	  	})


	})

	xdescribe('DELETE /eyerx', function() {

		//set up app
		var app = TH.createApp()
		app.use('/', routes)
		app.testReady()

		before(function() {
			return db.deleteEverything()
		})



	  	it('removes the prescription from the database', function() {

	  	})



	})

})

















