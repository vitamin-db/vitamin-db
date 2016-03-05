var db = require(__server + '/db')
var request = require('supertest-as-promised')
var UsersAPI = require(__server + 'apis/users-api')

describe("Users API", function() {

	//obviously this is temporary

	it("returns true", function() {
		expect(2===2).to.be.true
	})

	// var app = TestHelper.createApp()
	// app.use('/users', UsersAPI)
	// app.testReady()

	// beforeEach(function() {
	// 	return db.deleteEverything()
	// })
})