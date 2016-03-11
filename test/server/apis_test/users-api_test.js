const db = require(__server + '/db')
const request = require('supertest-as-promised')
const UsersAPI = require(__server + '/apis/users-api')

xdescribe("GET /users", function() {

	var app = TestHelper.createApp()
	app.use('/users', UsersAPI)
	app.testReady()

	// beforeEach(function() {
	// 	return db.deleteEverything()
	// })


	it("returns 403 if no token is passed", function() {
		expect(true).to.be.false
	})

})