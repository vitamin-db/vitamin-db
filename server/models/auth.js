const Promise = require('bluebird')
const jwt = Promise.promisifyAll( require('jsonwebtoken') )
const _R = require('ramda')

const Auth = {}
module.exports = Auth

var secret = 'secretPasscode'

var expiresIn_DevProd = '1h' //Tokens expire in one hour
var expiresIn_Test = '10s' //For the purposes of the testing, tokens expire quickly


//first argument is username
// Auth.createToken = _R.curry( jwt.sign(_R._, 
// 	                                  secret, 
// 	                                  {expiresIn: '10s'},
// 	                                  function(token) {
// 	                                  	console.log('make token', token)
// 	                                    return token
// 	                                  }
// 	                                 )
//   
/*                          )
Auth.createToken = function(username) {
	return jwt.sign(username, secret, {expiresIn: '10s'}, function(token) {
		console.log('made token', token)
		return token
	})
}
*/
Auth.createToken = function(username) {
	return jwt.signAsync(username, secret, {expiresIn: 10})
	  .then( function(token) {
	  	console.log('made token', token)
	  	return token
	  })
	  .catch( function(err) {
	  	console.log('error making token', err)
	  })
}

Auth.verifyToken = function(token) {
	return jwt.verify(token, secret, function(err, decoded) {
		if (err) {
			console.log('error verifying token', err)
			return err
		} else {
			console.log('verfied', decoded)
			return decoded
		}
	})
}
// Auth.verifyToken = _R.curry( jwt.verify(_R._,
// 	                                    secret,
// 	                                    function(err, decoded) {
// 	                                    	if (err) {
// 	                                    		console.log('error verifying token', err)
// 	                                    		return err;
// 	                                    	} else {
// 	                                    		console.log('verified', decoded)
// 	                                    		return decoded
// 	                                    	}
// 	                                    }
// 	                         )
//                            )