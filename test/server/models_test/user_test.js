require(TEST_HELPER)

const User = require(__server + '/models/user')
console.log('testing user', User)


describe('User Model', function() {

	var UserAttributes = function(username, password, email, phone) {
		this.username = username
		this.password = password
		this.email = email
		this.phone = phone
	}

	it_('inserts user', function * () {

		var newTestUser = new UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		yield User.create(newTestUser)
		  .then(function(user) {
		  	console.log('got back ', user)
		  	expect(user.username).to.equal(newTestUser.username)
		  })
	})


})