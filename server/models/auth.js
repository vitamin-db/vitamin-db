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

/*
Creates an API token
*/
Auth.createToken = function(username) {
	return new Promise( function(resolve, reject) {
		jwt.sign({username: username}, secret, {expiresIn: exp}, function(token) {
		  // console.log('made token', token)
		  resolve(token)
		})
	})
}

/*
Decodes api token
If token is valid, returns the decoded token, which looks like:
    {
     username: USERNAME CORRESPONDING TO TOKEN, 
     iat: I'M NOT SURE WHAT THIS MEANS BUT I THINK IT IS WHEN THE TOKEN WAS ISSUED,
     exp: WHEN TOKEN EXPIRES
     }
If token is invalid, returns false
*/
Auth.verifyToken = function(token) {
	return P_jwt.verifyAsync(token, secret)
	  .then( function(decoded) {
	  	// console.log('decoded in auth model', decoded)
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