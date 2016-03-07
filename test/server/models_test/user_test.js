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
		  	// console.log('got back from create', user)
		  	expect(user.username).to.equal(newTestUser.username)
		  })
	})

	it('retrieves all user data', function() {

		var newTestUser1 = new UserAttributes('bob1', 'alice1', 'bob1@alice1.com', '123-789-3456')
		var newTestUser2 = new UserAttributes('bob2', 'alice2', 'bob2@alice2.com', '123-789-3456')

		return User.create(newTestUser1)
		  .then( function() { return User.create(newTestUser2) })
		  .then( function() { return User.getAll() })
		  .then( function(allUsers) {
		  	// console.log('got all users: ', allUsers)
		  	expect(allUsers).to.have.length(2)
		  	expect(allUsers[0]['username']).to.equal('bob1')
		  	expect(allUsers[0]['password']).to.equal('alice1')
		  	expect(allUsers[0]['email']).to.equal('bob1@alice1.com')
		  	expect(allUsers[0]['phone']).to.equal('123-789-3456')
		  	expect(allUsers[1]['username']).to.equal('bob2')
		  	expect(allUsers[1]['password']).to.equal('alice2')
		  	expect(allUsers[1]['email']).to.equal('bob2@alice2.com')
		  	expect(allUsers[1]['phone']).to.equal('123-789-3456')
		  })
	})

	it('retrieves a user by id', function() {

		//these will be assigned after the db entries are created
		var testId1 = undefined
		var testId2 = undefined

		var newTestUser3 = new UserAttributes('bob3', 'alice3', 'bob3@alice3.com', '123-789-3456')
		var newTestUser4 = new UserAttributes('bob4', 'alice4', 'bob4@alice4.com', '123-789-3456')

		return User.create(newTestUser3)
		  .then( function() { return User.create(newTestUser4) })
		  .then( function() { return User.getAll() })
		  .then( function(allUsers) {

		  	//set id variables to test
		  	testId1 = allUsers[0]['id_user']
		  	testId2 = allUsers[1]['id_user']

		  	return User.findById(testId1)
		  })
		  .then( function(result) {
		  	// console.log('got', result, 'by id')
		  	expect(result.id_user).to.equal(testId1)
		  	expect(result.username).to.equal('bob3')
		  	expect(result.password).to.equal('alice3')
		  	expect(result.email).to.equal('bob3@alice3.com')
		  	expect(result.phone).to.equal('123-789-3456')

		  	return User.findById(testId2)
		  })
		  .then( function(result) {
		  	// console.log('got', result, 'by id')
		  	expect(result.id_user).to.equal(testId2)
		  	expect(result.username).to.equal('bob4')
		  	expect(result.password).to.equal('alice4')
		  	expect(result.email).to.equal('bob4@alice4.com')
		  	expect(result.phone).to.equal('123-789-3456')
		  })

	})

	it('deletes a user', function() {


		//this will be assigned after the db entries are created
		var testId = undefined

		var newTestUser5 = new UserAttributes('bob5', 'alice5', 'bob5@alice5.com', '123-789-3456')
		var newTestUser6 = new UserAttributes('bob6', 'alice6', 'bob6@alice6.com', '123-789-3456')

		return User.create(newTestUser5)
		  .then( function() { return User.create(newTestUser6) })
		  .then( function() { return User.getAll() })
		  .then( function(allUsers) {

		  	//set id variable to test
		  	testId = allUsers[0]['id_user']

		  	return User.deleteById(testId)
		  })
		  .then( function(recordsDeleted) {
		  	expect(recordsDeleted).to.equal(1)

		  	return User.findById(testId)
		  })
		  .then(function(deletedRecord) {
		  	expect(deletedRecord).to.be.an('undefined')

		  	return User.getAll()
		  })
		  .then( function(allUsers) {
		  	expect(allUsers).to.have.length(1)
		  	expect(allUsers[0]['username']).to.equal('bob6')
		  	expect(allUsers[0]['password']).to.equal('alice6')
		  	expect(allUsers[0]['email']).to.equal('bob6@alice6.com')
		  	expect(allUsers[0]['phone']).to.equal('123-789-3456')
		  })

	})

	it('finds users by username', function() {

		var newTestUser7 = new UserAttributes('bob7', 'alice7', 'bob7@alice7.com', '123-789-3456')
		var newTestUser8 = new UserAttributes('bob8', 'alice8', 'bob8@alice8.com', '123-789-3456')

		return User.create(newTestUser7)
		  .then( function() { return User.create(newTestUser8) })
		  .then( function() {
		  	return User.findByUsername('bob8')
		  })
		  .then( function(user) {
		  	expect(user).to.be.an('object')
		  	expect(user).to.have.any.keys('id_user', 'username', 'password', 'email', 'phone')
		  	expect(user.username).to.equal('bob8')
		  	expect(user.password).to.equal('alice8')
		  	expect(user.email).to.equal('bob8@alice8.com')
		  	expect(user.phone).to.equal('123-789-3456')
		  })

	})

	it('finds users by email', function() {

		var newTestUser9 = new UserAttributes('bob9', 'alice9', 'bob9@alice9.com', '123-789-3456')
		var newTestUser10 = new UserAttributes('bob10', 'alice10', 'bob10@alice10.com', '123-789-3456')

		return User.create(newTestUser9)
		  .then( function() { return User.create(newTestUser10) })
		  .then( function() {
		  	return User.findByEmail('bob10@alice10.com')
		  })
		  .then( function(user) {
		  	expect(user).to.be.an('object')
		  	expect(user).to.have.any.keys('id_user', 'username', 'password', 'email', 'phone')
		  	expect(user.username).to.equal('bob10')
		  	expect(user.password).to.equal('alice10')
		  	expect(user.email).to.equal('bob10@alice10.com')
		  	expect(user.phone).to.equal('123-789-3456')
		  })

	})

})