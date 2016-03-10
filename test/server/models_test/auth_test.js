require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const Auth = require(__server + '/models/auth')


describe('Auth Model', function() {

	var username1 = 'bob'
	var token1 = undefined

	it('verifies a token that exists', function() {

		return Auth.createToken(username1)
		  .then( function(token) {
		  	token1 = token
		  	// console.log('got back token in test', token1)

		  	return Auth.verifyToken(token1)
		  })
		  .then( function(decoded) {
		  	// console.log('decoded: ', decoded)

		  	expect(decoded).to.be.an('object')
		  	expect(decoded.username).to.equal(username1)
		  })

	})

	it('returns false for an expired token', function() {

	  	return new Promise( function(resolve, reject) {
	  		setTimeout( function() {
	  			return Auth.verifyToken(token1)
	  			  .then(function(result) {
	  			  	resolve(result)
	  			  })
	  		}, 1000)
	  	})
		  .then( function(decoded) {
		  	console.log('decoded should be false', decoded)
		  	//this is a lie - trying to get this to be false
		  	expect(decoded).to.be.false
		  })

	})


})