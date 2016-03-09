const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const P_jwt = Promise.promisifyAll(jwt)
// const _R = require('ramda')

const Auth = {}
module.exports = Auth

var secret = 'secretPasscode'

var expiresIn_DevProd = '1h' //Tokens expire in one hour
var expiresIn_Test = '1s' //For the purposes of the testing, tokens expire quickly
var exp = process.env.NODE_ENV === 'test' ? expiresIn_Test : expiresIn_DevProd


Auth.createToken = function(username) {
	return new Promise( function(resolve, reject) {
		jwt.sign({username: username}, secret, {expiresIn: exp}, function(token) {
		  console.log('made token', token)
		  resolve(token)
		})
	})
}


Auth.verifyToken = function(token) {
	return P_jwt.verifyAsync(token, secret)
	  .then( function(decoded) {
	  	console.log('decoded in auth model', decoded)
	  	return decoded
	  })
	  .catch( function(err) {
	  	if (err.name === 'TokenExpiredError') {
	  		return false
	  	} else {
	  		throw err
	  	}
	  })
}