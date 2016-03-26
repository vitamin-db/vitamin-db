const request = require('supertest-as-promised')
const Auth = require(__server + '/models/auth')
const TH = require(__test + '/test-helper')

const routes = require(__server + '/index')

xdescribe("The Server", function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	//start tests!

	it("serves an example endpoint", function(done) {

		return request(app)
		  .get('/hello')
		  .expect(200, done)

	})

	it("403s if no token is provided", function(done) {

		return request(app)
		  .get('/check')
		  .expect(403)
		  .expect({msg: 'Please log in'}, done)

	})

	it("succeeds if valid token is provided", function() {

		var myToken = undefined
		var usern = 'alice'

		return Auth.createToken(usern)
		  .then( function(token) {
		  	myToken = token

		  	return request(app)
		  	  .get('/check')
		  	  .set('x-access-token', myToken)
		  	  .expect(200)
		  	  .expect({msg: 'Hello ' + usern + '!'})
		  })

	})


	it("fails if token has expired", function(done) {

		var myToken = undefined
		var usern = 'aliceisabitch'

		return Auth.createToken(usern)
		  .then( function(token) {
		  	myToken = token

		  	return new Promise( function(resolve, reject) {
		  		setTimeout( function() {
		  			return request(app)
				  	  .get('/check')
				  	  .set('x-access-token', myToken)
				  	  .expect(403)
				  	  .end( function(err, result) {
				  	  	// console.log('msg from expired token', result.text)
				  	  	done()
				  	  })
		  		}, 1000)
		  	})
		  })
	})

})

