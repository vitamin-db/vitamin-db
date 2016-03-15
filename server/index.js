//======================================================
// index.js holds express server and related routing
//======================================================

const browserify = require('browserify-middleware')
const reactify = require('reactify')
const express = require('express')
const Path = require('path')
const db = require('./db')
// Future consideration: including reactify/babelify, etc.
// const babelify = require('babelify')

const bodyParser = require('body-parser')
const morgan = require('morgan')

const SendR = require('./sendresponse')
const Auth = require('./models/auth')

//======================================================
// create our express router
//======================================================

var routes = express.Router()

//======================================================
// Static assets (html, etc.)
//======================================================

// compile/bundle into single file to load in browser
// here we are making some assumptions on the front-end
	// eg. using ./client/app.js
// also likely need to consider using babelify//reactify (see above)

routes.get('/app-bundle.js',
  browserify('./client/app.js', {
    transform: [reactify]
  }))

var assetFolder = Path.resolve(__dirname, '../client')
routes.use(express.static(assetFolder))

// routes.get('/', function(req, res) {

// })


//======================================================
// Dynamic assets
//======================================================

/*
  routes not protected by authentication
*/

//dummy route not requiring authentication
if ( process.env.NODE_ENV === 'test' ) {
	routes.get('/hello', function(req, res) {
		SendR.resData(res, 200, {msg: 'Hello! Please log in'})
	})
}



//set up authentication route
var authRouter = require('./apis/auth-api')
routes.use('/authenticate', authRouter)


//middleware to verify a token
routes.use( function(req, res, next) {

	//check header or url parameters or post parameters for token
	//note: on client side, add into headers{x-access-token: token}
	var token = req.body.token || req.query.token || req.headers['x-access-token']
	console.log('defined token as', token)

	//decode token
	if (token) {
		return Auth.verifyToken(token)
		  .then( function(decoded) {
		  	console.log('got decoded', decoded)
		  	req.decoded = decoded //save decoded for use in other routes
		  	next()
		  })
	} else {
		SendR.errMsg(res, 403, 'Please log in')
	}
})

/*
  routes protected by authentication
*/

//dummy route to check authentication
if ( process.env.NODE_ENV === 'test' ) {
	routes.get('/check', function(req, res) {
		SendR.resData(res, 200, {msg: 'Hello ' + req.decoded.username + '!'})
	})
}


//user router
var userRouter = require('./apis/users-api')
routes.use('/user', userRouter)


/* Catch-all Route
 Make sure this route is always LAST
*/
routes.get('/*', function(req,res) {
	//dummy response to check auth
	SendR.resData(res, 200, {msg: 'Hello world!'})

	//commented out while this file does not exist
	// res.sendFile( assetFolder + '/index.html' )
})


//======================================================
// create our express app
//======================================================

//===== IF IN DEV OR PROD MODE ==========
if (process.env.NODE_ENV !== 'test') {

	//
	// create and run server
	//

	var app = express()

	//use morgan to log concise and colorful error messages
	app.use( morgan ('dev'))

	// Parse incoming request bodies as JSON
	//commented out for postman
	app.use( bodyParser.json() )
	// app.use(bodyParser.urlencoded({
	//   extended: true
	// }));

	// Mount our main router
	app.use('/', routes)


	// Start server!
	var port = process.env.PORT || 4000
	app.listen(port)
	console.log("Express server listening on port: ", port)
}

//===== ELSE IN TEST MODE (make file importable) ==========
// currently primarily for testing (in test/server/index_test.js)
else {
	module.exports = routes
}
