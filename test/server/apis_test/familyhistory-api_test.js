const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const FamilyHistory = require(__server + '/models/familyhistory')
const FamilyMember = require(__server + '/models/familymembers')

describe('Family History, API', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	describe('GET /:id_familymember/familyhistory', function() {

		before(function() {
			return db.deleteEverything()
		})

		var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
		var user1_id = undefined
		var newFam1 = undefined
		var newFam1_id = undefined
		var newCondition1 = undefined
		var newCondition2 = undefined

		it('returns an array of conditions', function() {
			return TH.createUserReturnId(newUser1)
			  .then(function(id) {
			    user1_id = id

			    newFam1 = new TH.FamilyMemberAttributes(id, 'Mommy')
			    return FamilyMember.create(newFam1)
			  })
			  .then(function() {
			  	return FamilyMember.getAllByUser(user1_id)
			  })
			  .then(function(family) {
			  	newFam1_id = family[0].id_familymember

			  	newCondition1 = new TH.FamilyHistoryAttributes(newFam1_id, 'leprosy')
			  	return FamilyMember.create(newCondition1)
			  })
			  .then(function() {
			  	newCondition2 = new TH.FamilyHistoryAttributes(newFam1_id, 'smallpox')
			  	return FamilyMember.create(newCondition2)
			  })
			  .then(function() {
			  	return Auth.createToken(newUser1.username)
			  })
			  .then(function(token) {
			  	return request(app)
			  	  .get('/familyhistory/' + newFam1_id)
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  	  .then(function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('array')
			  	  	expect(got).to.have.length(2)
			  	  	expect(TH.allValidPublicFamilyHistory(got)).to.be.true
			  	  	expect(TH.propsMatch(got[0], newCondition1)).to.be.true
			  	  	expect(TH.propsMatch(got[1], newCondition2)).to.be.true
			  	  })
			  })
		})


	})







})
