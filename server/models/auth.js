const Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const P_jwt = Promise.promisifyAll(jwt)
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
                          // )
Auth.createToken = function(username) {
	return new Promise( function(resolve, reject) {
		jwt.sign({username: username}, secret, {expiresIn: '1s'}, function(token) {
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
	// return jwt.verify(token, secret, function(err, decoded) {
	// 	if (err) {
	// 		console.log('error verifying token', err)
	// 		return err
	// 	} else {
	// 		console.log('verfied', decoded)
	// 		return decoded
	// 	}
	// })
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