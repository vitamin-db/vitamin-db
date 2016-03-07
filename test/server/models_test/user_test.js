require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/user')


describe('User Model', function() {

	beforeEach(function() {
		return db.deleteEverything()
	})


	var UserAttributes = function(username, password, email, phone) {
		this.username = username
		this.password = password
		this.email = email
		this.phone = phone
	}

	it('inserts user', function () {

		var newTestUser = new UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		return User.create(newTestUser)
		  .then(function(user) {
		  	console.log('got back ', user)
		  	expect(user.username).to.equal(newTestUser.username)
		  })
	})


})