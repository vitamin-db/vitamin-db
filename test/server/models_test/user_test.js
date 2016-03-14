const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const User = require(__server + '/models/user')


xdescribe('**************** User Model ****************', function() {

	beforeEach(function() {
		return db.deleteEverything()
	})

	it('inserts user', function () {

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		return TH.createUserReturnUsername(newTestUser)
		  .then(function(username) {
		  	expect(username).to.equal(newTestUser.username)
		  })
	})

	it('retrieves all user data', function() {

		var newTestUser1 = new TH.UserAttributes('bob1', 'alice1', 'bob1@alice1.com', '123-789-3456')
		var newTestUser2 = new TH.UserAttributes('bob2', 'alice2', 'bob2@alice2.com', '123-789-3456')

		var resultFromDb = undefined

		return User.createUser(newTestUser1)
		  .then( function() { return User.createUser(newTestUser2) })
		  .then( function() { return User.getAll() })
		  .then( function(allUsers) {
		  	resultFromDb = allUsers

		  	expect( TH.isValidUser(resultFromDb[0]) ).to.be.true
		  	expect( TH.isValidUser(resultFromDb[1]) ).to.be.true

		  	return TH.userPropsMatch(resultFromDb[0], newTestUser1)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true

		  	return TH.userPropsMatch(resultFromDb[1], newTestUser2)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true

		  	return TH.userPropsMatch(resultFromDb[0], newTestUser2)
		  })
		  .then( function(result) {
		  	expect(result).to.be.false

		  	return TH.userPropsMatch(resultFromDb[1], newTestUser1)
		  })
		  .then( function(result) {
		  	expect(result).to.be.false
		  })
	})

	it('retrieves a user by id', function() {

		//these will be assigned after the db entries are created
		var testId1 = undefined
		var testId2 = undefined

		var newTestUser3 = new TH.UserAttributes('bob3', 'alice3', 'bob3@alice3.com', '123-789-3456')
		var newTestUser4 = new TH.UserAttributes('bob4', 'alice4', 'bob4@alice4.com', '123-789-3456')

		return TH.createUserReturnId(newTestUser3)
		  .then( function(id) {
		  	testId1 = id

		  	return TH.createUserReturnId(newTestUser4)
		  })
		  .then( function(id) {
		  	testId2 = id

		  	return User.findById(testId1)
		  })
		  .then( function(user) {
		  	expect( TH.isValidUser(user) ).to.be.true

		  	return TH.userPropsMatch(user, newTestUser3)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true

		  	return User.findById(testId2)
		  })
		  .then( function(user) {
		  	expect( TH.isValidUser(user) ).to.be.true

		  	return TH.userPropsMatch(user, newTestUser4)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true
		  })
	})

	it('deletes a user', function() {

		//this will be assigned after the db entries are created
		var testId = undefined

		var newTestUser5 = new TH.UserAttributes('bob5', 'alice5', 'bob5@alice5.com', '123-789-3456')

		return TH.createUserReturnId(newTestUser5)
		  .then( function(id) {
		  	testId = id
		  	return User.deleteById(testId)
		  })
		  .then( function(recordsDeleted) {
		  	expect(recordsDeleted).to.equal(1)

		  	return User.findById(testId)
		  })
		  .then(function(user) {
		  	expect(user).to.be.an('undefined')
		  	return User.getAll()
		  })
		  .then( function(allUsers) {
		  	expect(allUsers).to.have.length(0)
		  })

	})

	it('finds users by username', function() {

		var newTestUser7 = new TH.UserAttributes('bob7', 'alice7', 'bob7@alice7.com', '123-789-3456')

		return User.createUser(newTestUser7)
		  .then( function() {
		  	return User.findByUsername(newTestUser7.username)
		  })
		  .then( function(user) {
		  	expect(TH.isValidUser(user)).to.be.true
		  	return TH.userPropsMatch(user, newTestUser7)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true
		  })
	})

	it('finds users by email', function() {

		var newTestUser9 = new TH.UserAttributes('bob9', 'alice9', 'bob9@alice9.com', '123-789-3456')

		return User.createUser(newTestUser9)
		  .then( function() {
		  	return User.findByEmail('bob9@alice9.com')
		  })
		  .then( function(user) {
		  	expect( TH.isValidUser(user) ).to.be.true
		  	return TH.userPropsMatch(user, newTestUser9)
		  })
		  .then( function(result) {
		  	expect(result).to.be.true
		  })
	})

	it('validates passwords', function() {

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		return User.createUser(newTestUser)
		  .then( function(user) {
		  	return User.validPassword('bob', 'alice')
		  })
		  .then( function(result) {
		  	expect(result).to.be.true

		  	return User.validPassword('bob', 'alice2')
		  })
		  .then( function(result) {
		  	expect(result).to.be.false
		  })
	})

	it('checks if a user exists', function() {

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		return User.createUser(newTestUser)
		  .then( function() {
		  	return User.existsByUsername('bob')
		  })
		  .then( function(result) {
		  	expect(result).to.be.true

		  	return User.existsByUsername('alice')
		  })
		  .then( function(result) {
		  	expect(result).to.be.false
		  })
	})

	it('salts a password and adds that to the db', function() {

		var newTestUser = new TH.UserAttributes('bob11', 'alice11', 'bob11@alice.com', '113-789-3456')
		var hashedPw = undefined
		var correctPw = 'alice11'
		var incorrectPw = 'Alice11'

		return User.createUser(newTestUser)
		  .then(function(user) {
		  	hashedPw = user.password
		  	return User.passwordMatches(correctPw, hashedPw)
		  })
		  .then(function(result) {
		  	expect(result).to.be.true

		  	return User.passwordMatches(incorrectPw, hashedPw)
		  })
		  .then(function(result) {
		  	expect(result).to.be.false
		  })
	})

	it('filters out id and password', function() {

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		return TH.createUserReturnUser(newTestUser)
		  .then( function(user) {
		  	return User.getPublic(user)
		  	expect( TH.isValidPublicUser(user) ).to.be.false
		  })
		  .then( function(publicUser) {
		  	expect( TH.isValidPublicUser(publicUser) ).to.be.true
		  	return TH.propsMatch(publicUser, {username: newTestUser.username,
		  		                                  email: newTestUser.email,
		  		                                  phone: newTestUser.phone
		  	                                     })
		  })
		  .then( function(result) {
		  	expect(result).to.be.true
		  })

	})

})