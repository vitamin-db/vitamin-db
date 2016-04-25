//======================================================
// index.js holds express server and related routing
//======================================================

var browserify = require('browserify-middleware')
var reactify = require('reactify')
var express = require('express')
var Path = require('path')
var db = require('./db')
// Future consideration: including reactify/babelify, etc.

// var babel = require('babel-core')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var SendR = require('./sendresponse')
var Auth = require('./models/auth')
var nodemailer = require('nodemailer');

//for twilio to work
var twilio = require('./twilio/reminder')

//======================================================
// create our express router
//======================================================

var routes = express.Router()

//======================================================
// Static assets (html, etc.)
//======================================================

// !!!-- ADDED GULP --!!!
// compile/bundle into single file to load in browser
// here we are making some assumptions on the front-end
// eg. using ./client/app.js
// also likely need to consider using babelify//reactify (see above)
// routes.get('/app-bundle.js',
//   browserify('./client/app.js', {
//     transform: [reactify]
//   }))

// Set the directory with an absolute path and then send the bundled js file on request
var assetFolder = Path.resolve(__dirname, '../dist')
routes.get('/app-bundle.js', function(req, res){
	res.sendFile(assetFolder + '/scripts/app-bundle.js')
})
routes.get('/favicon.ico', function(req, res){
	res.sendFile(assetFolder + '/img/pillicon.png')
})


routes.use(express.static(assetFolder))

// EXAMPLE ROUTE
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
	console.log('defined token as', token, 'req query', req.query)

	//decode token
	if (token) {
		return Auth.verifyToken(token)
		  .then( function(decoded) {
		  	console.log('got decoded..? ', decoded)
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

//doctor router
var doctorRouter = require('./apis/doctor-api')
routes.use('/doctor', doctorRouter)

//eyerx router
var eyerxRouter = require('./apis/eyerx-api')
routes.use('/eyerx', eyerxRouter)

//pharmacy router
var pharmacyRouter = require('./apis/pharmacy-api')
routes.use('/pharmacy', pharmacyRouter)

//insurance router
var insuranceRouter = require('./apis/insurance-api')
routes.use('/insurance', insuranceRouter)

//allergy router
var allergyRouter = require('./apis/allergy-api')
routes.use('/allergy', allergyRouter)

//family history router
var famHistRouter = require('./apis/familyhistory-api')
routes.use('/familyhistory', famHistRouter)

//rx router
var rxRouter = require('./apis/rx-api')
routes.use('/rx', rxRouter)

//familymember router
var familymemberRouter = require('./apis/familymember-api')
routes.use('/familymember', familymemberRouter)

//immunization router
var immunRouter = require('./apis/immun-api')
routes.use('/immun', immunRouter)

//appointmnet router
var appointmentRouter = require('./apis/appointment-api')
routes.use('/appointment', appointmentRouter)

/* Catch-all Route
 Make sure this route is always LAST
*/
routes.get('/*', function(req,res) {
	//dummy response to check auth
	// SendR.resData(res, 200, {msg: 'Hello world!'})

	//commented out while this file does not exist
	res.sendFile( assetFolder + '/index.html' )
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

//======================================================
// This is to use WebPack
// comment this part out if you want to use nodemon
	
	// var compiler = webpack(config);

	// app.use(webpackDevMiddleware(compiler), {noInfo: true, publicPath: config.output.publicPath});
	// app.use(webpackHotMiddleware(compiler));

//======================================================	


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
