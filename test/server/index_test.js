var request = require('supertest')
var routes = require(__server + '/index.js')

describe("The Server", function() {

	//set up app
	var app = TestHelper.createApp()
	app.use('/', routes)
	app.testReady()

	//start tests!

	//obviously this is temporary
	it("returns true", function() {
		expect(2===2).to.be.true
	})

})