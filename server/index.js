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
routes.get('/app-bundle.js',
	browserify('./client/app.js'))

//======================================================
// Static assets (html, etc.)
//======================================================

var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

//======================================================
// create our express app
//======================================================

//===== IF IN DEV OR PROD MODE ==========
if (process.env.NODE_ENV !== 'test') {
	//
	// Catch-all Route
	// Make sure this route is always LAST
	//
	routes.get('/*', function(req,res) {
		res.sendFile( assetFolder + '/index.html' )
	})

	//
	// create and run server
	//

	var app = express()

	// Parse incoming request bodies as JSON
	app.use( bodyParser.json() )

	// Mount our main router
	app.use('/', routes)

	// Start server!
	var port = process.env.PORT || 4000
	app.listen(port)
	console.log("Express server listening on port: ", port)
}

//===== ELSE IN TEST MODE (make file importable) ==========
// currently primarily for testing
else {
	module.exports = routes
}
