const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Immun = require(__server + '/models/immun')

xdescribe('/immun-api', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	describe('GET /immun', function() {

		before(function() {
		  return db.deleteEverything()
		})

		var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
		var id_user1 = undefined
		var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
		var id_user2 = undefined
		var imm1 = undefined
		var id_imm1 = undefined
		var imm2
		var id_imm2 = undefined

		it('returns all immunization records associated with a user', function() {
			return TH.createUserReturnId(newTestUser1)
			  .then(function(id) {
			  	id_user1 = id
			  	imm1 = new TH.ImmunAttributes(id_user1, '2003-11-04', 'pox', 'need booster in 10 years')
			  	return TH.create(imm1)
			  })
			  .then( function() {
			  	return TH.createUserReturnId(newTestUser2)
			  })
			  .then(function(id) {
			  	id_user2 = id
			  	imm2 = new TH.ImmunAttributes(id_user2, '1986-03-23', 'mumps', 'needs booster 3 yrs')
			  	return TH.create(imm2)
			  })
			  .then( function() {
			  	return Auth.createToken(newTestUser1.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	  .get('/immun')
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('array')
			  	  	expect(got).to.have.length(1)
			  	  	expect(got[0]).to.be.an('object')
			  	  	expect(TH.isValidPublicImmun(got[0])).to.be.true
			  	  	expect(TH.propsMatch(got[0], imm2)).to.be.false
			  	  	expect(TH.propsMatch(got[0], imm1)).to.be.true
			  	  })
			  })
		})

	})

	describe('POST /immun', function() {

		before(function() {
		  return db.deleteEverything()
		})

		var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
		var imm1 = undefined

		it('returns 201 and the posted object', function() {

			return TH.createUserReturnIdAndToken(newUser1)
			  .then(function(userAndToken) {
			  	imm1 = new TH.ImmunAttributes(userAndToken.id_user, '2003-11-04', 'pox', 'need booster in 10 years')
			  	return request(app)
			  	  .post('/immun')
			  	  .set('x-access-token', token)
			  	  .send({properties: imm1})
			  	  .expect(201)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(TH.isValidPublicImmun(got)).to.be.true
			  	  	expect(TH.propsMatch(got, imm1)).to.be.true
			  	  })
			  })

		})

		it('adds an immunization record to the database', function() {

			return Immun.getAll()
			  .then(function(all) {
			  	expect(all).to.be.an('array')
			  	expect(all).to.have.length(1)
			  	expect(TH.propsMatch(all[0], imm1)).to.be.true
			  	expect(TH.allValidPublicImmun(all)).to.be.true
			  })

		})
	})


	describe('PUT /immun', function() {

		before(function() {
		  return db.deleteEverything()
		})

		var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
		var id_user1 = undefined
		var imm1 = undefined
		var id_imm1 = undefined

		it('returns 201 and the updated immunization', function() {

			return TH.createUserReturnId(newTestUser1)
			  .then(function(id) {
			  	id_user1 = id
			  	imm1 = new TH.ImmunAttributes(id_user1, '2003-11-04', 'pox', 'need booster in 10 years')
			  	return TH.create(imm1)
			  })
			  .then(function() {
			  	return Immun.getAll()
			  })
			  .then(function(all) {
			  	id_imm1 = all[0].id_immun
			  })
			  .then(function() {
			  	return Auth.createToken(newTestUser1.username)
			  })
			  .then(function(token) {
			  	var updateOb = {id_immun: id_imm1, type: 'bigpox'}
			  	return request(app)
			  	  .put('/immun')
			  	  .set('x-access-token', token)
			  	  .send({properties: updateOb})
			  	  .expect(201)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(TH.isValidPublicImmun(got)).to.be.true
			  	  	expect(TH.propsMatch(got, imm1)).to.be.false
			  	  	expect(got.id_user).to.equal(imm1.id_user)
			  	  	expect(got.type).to.equal(updateOb.type)
			  	  })
			  })
		})

		it('changes the immunization database', function() {
			return Immun.getAll()
			  .then(function(all) {
			  	expect(all).to.be.an('array')
			  	expect(all).to.have.length(1)
			  	expect(TH.allValidImmun(all)).to.be.true
			  	expect(TH.propsMatch(all[0], imm1)).to.be.false
			  	expect(all[0].notes).to.equal(imm1.notes)
			  	expect(all[0].type).to.equal('bigpox')
			  })
		})
	})


	describe('DELETE /immun/:id_immun', function() {

		before(function() {
		  return db.deleteEverything()
		})

		var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
		var id_user1 = undefined
		var imm1 = undefined
		var id_imm1 = undefined

		it('returns 200 on a successful delete', function() {
			return TH.createUserReturnId(newTestUser1)
			  .then(function(id) {
			  	id_user1 = id
			  	imm1 = new TH.ImmunAttributes(id_user1, '2003-11-04', 'pox', 'need booster in 10 years')
			  	return TH.create(imm1)
			  })
			  .then(function() {
			  	return Immun.getAll()
			  })
			  .then(function(all) {
			  	expect(all).to.have.length(1)
			  	id_imm1 = all[0].id_immun
			  	return Auth.createToken(newTestUser1.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	  .del('/immun/' + id_imm1)
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  })
		})

		it('deletes from the database', function() {
			return Immun.getAll()
			  .then(function(all) {
			  	expect(all).to.have.length(0)
			  })
		})
	})


})