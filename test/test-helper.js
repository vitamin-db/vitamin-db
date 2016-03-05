process.env.NODE_ENV = 'test'

//Store the location of the server and client folders
global.__server = __dirname + '/../server'
global.__client = __dirname + '/../client'

//Make chai's 'expect' accessible from everywhere
var chai = require('chai')
global.expect = chai.expect
//Could instead make everything should-able:
  // chai.should()

//
//Helper Functions
//

global.TestHelper = {};

//
//Exportable function setting up app for testing
//

var express = require('express')

TestHelper.createApp = function(loader) {

	var app = express()
	app.use(require('body-parser').json())

	app.testReady = function() {
		//Log errors
		app.use(function(err, req, res, next) {
			console.error('==Error==')
			console.error(' ' + err.stack)
			next(err)
		})
	}

	return app

}

