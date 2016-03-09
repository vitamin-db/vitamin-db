require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const Auth = require(__server + '/models/auth')


describe('Auth Model', function() {

	var username1 = 'bob'
	var token1 = undefined

	it('creates and verifies a token', function() {

		return Auth.createToken(username1)
		  .then( function(token) {
		  	token1 = token
		  	console.log('got back token in test', token1)

		  	return Auth.verifyToken(token1)
		  })
		  .then( function(decoded) {
		  	console.log('decoded: ', decoded)
		  	expect(decoded).to.equal(username1)
		  })
		  .then( function() {
		  	setTimeout(function() {
		  		//after 10 seconds (ie after token has expired, call 
		  		return Auth.verifyToken(token1)
		  		  .then(function(decoded) {
		  		  	Promise.resolve(decoded)
		  		  })
		  	}, 10000)
		  })
		  .then( function(decoded) {
		  	console.log('decoded should error', decoded);
		  })
		  .catch( function(err) {
		  	console.log('should hit this error', err)
		  })


	})


})