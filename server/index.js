//======================================================
// index.js holds express server and related routing
//======================================================

const browserify = require('browserify-middleware')
const express = require('express')
const Path = require('path')
const db = require('./db')
// Future consideration: including reactify/babelify, etc.
	// const Reactify = require('reactify')

const bodyParser = require('body-parser')
const morgan = require('morgan')

//======================================================
// create our express router
//======================================================

var routes = express.Router()

// compile/bundle into single file to load in browser
// here we are making some assumptions on the front-end
	// eg. using ./client/app.js
// also likely need to consider using babelify//reactify (see above)

//commented out while this file does not exist
// routes.get('/app-bundle.js',
// 	browserify('./client/app.js'))

//======================================================
// Static assets (html, etc.)
//======================================================


//commented out while this file does not exist
// var assetFolder = Path.resolve(__dirname, '../client/public')
// routes.use(express.static(assetFolder))

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


	//
	// routes not protected by authentication
	//

	//set up authentication route
	var authRouter = require('./apis/auth-api')
	routes.use('/authenticate', authRouter)

	//
	//routes protected by authentication
	//

	//
	// Catch-all Route
	// Make sure this route is always LAST
	//
	routes.get('/*', function(req,res) {
		res.send("Hello world!")
		//commented out while this file does not exist
		// res.sendFile( assetFolder + '/index.html' )
	})

	//Route to authenticate a token

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
