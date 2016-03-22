const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')
const EyeRx = require(__server + '/models/eyerx')
const Allergy = require(__server + '/models/allergy')
const Appointment = require(__server + '/models/appointment')
const FamilyHistory = require(__server + '/models/familyhistory')
const FamilyMember = require(__server + '/models/familymembers')
const Immun = require(__server + '/models/immun')
const Insurance = require(__server + '/models/insurance')
const Pharmacy = require(__server + '/models/pharmacy')
const Rx = require(__server + '/models/rx')


describe('user API', function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	describe("GET /user", function() {

		before(function() {
			return db.deleteEverything()
		})

		it("returns 403 if no token is passed", function() {
			
			return request(app)
			  .get('/user')
			  .expect(403)
		})

		var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')

		var newTestDoctor1 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary', true)
		var newTestDoctor2 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist', false)
		
		var newEyeRx1 = undefined

		var userId = undefined
		var doc1Id = undefined
		var doc2Id = undefined

		var appointment1 = undefined
		var appointment2 = undefined
		var appointment3 = undefined

		var allergy1 = undefined
		var allergy2 = undefined

		var famMem1 = undefined
		var famMem1_id = undefined
		var famMem2 = undefined
		var famMem2_id = undefined

		var famHist1 = undefined
		var famHist2 = undefined

		var insurance1 = undefined

		var pharma1 = undefined
		var pharma2 = undefined

		var pharmaIdForRx = undefined
		var rx1 = undefined

		var immun1 = undefined

		var objForClient = undefined

		it("returns 200 if a token is passed in", function() {

			return TH.createUserReturnId(newTestUser)
			  .then( function(id) {
			  	userId = id

			  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor1, 'primary', true)
			  })
			  .then( function(doctor) {
			  	doc1Id = doctor.id_doctor
			  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor2, 'nonprimary', true)
			  })
			  .then( function(doctor) {
			  	doc2Id = doctor.id_doctor
			  	newEyeRx1 = new TH.EyeRxAttributes(userId, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2)
			  	return EyeRx.createEyeRx(newEyeRx1)
			  })
			  .then( function() {
			  	allergy1 = new TH.AllergyAttributes(userId, 'cats', false)
			  	return Allergy.createAllergyReturnObj(allergy1)
			  })
			  .then( function() {
			  	allergy2 = new TH.AllergyAttributes(userId, 'medicine', true)
			  	return Allergy.createAllergyReturnObj(allergy2)
			  })
			  .then( function() {
			  	return Appointment.createAndReturn(newTestUser.username, doc1Id, {date: '05/23/2017', time: '10:00am'})
			  })
			  .then( function(apt) {
			  	appointment1 = apt
			  	return Appointment.createAndReturn(newTestUser.username, doc1Id, {date: '10/30/2016', time: 'noon'})
			  })
			  .then( function(apt) {
			  	appointment2 = apt
			  	return Appointment.createAndReturn(newTestUser.username, doc2Id, {date: '12/13/2018', time: '2:30pm'})
			  })
			  .then( function(apt) {
			  	appointment3 = apt
			  	famMem1 = new TH.FamilyMemberAttributes(userId, 'Mom')
			  	return FamilyMember.createFamilyMemberReturnObj(famMem1)
			  })
			  .then( function(familyMember) {
			  	famMem1_id = familyMember.id_familymember
			  	famMem2 = new TH.FamilyMemberAttributes(userId, 'Dad')
			  	return FamilyMember.createFamilyMemberReturnObj(famMem2)
			  })
			  .then( function(familyMember) {
			  	famMem2_id = familyMember.id_familymember
			  	famHist1 = new TH.FamilyHistoryAttributes(famMem1_id, 'arthritis')
			  	return FamilyHistory.create(famHist1)
			  })
			  .then( function() {
			  	famHist2 = new TH.FamilyHistoryAttributes(famMem1_id, 'diabetes')
			  	return FamilyHistory.create(famHist2)
			  })
			  .then( function() {
			  	insurance1 = new TH.InsuranceAttributes(userId, 'Aetna', '39jf9', '289rjf', '230f9j', true)
			  	return Insurance.create(insurance1)
			  })
			  .then( function() {
			  	pharma1 = new TH.PharmacyAttributes(userId, 'CVS', 'sum address iduno', '44902', true)
			  	return Pharmacy.create(pharma1)
			  })
			  .then( function() {
				  pharma2 = new TH.PharmacyAttributes(userId, 'Walgreesn', '39023 Everywehre Road', '342-9929', true)
				  return Pharmacy.create(pharma2)	
			  })
			  .then( function() {
			  	return Pharmacy.getAllByUser(userId)
			  })
			  .then( function(pharmas) {
			  	pharmaIdForRx = pharmas[0].id_pharmacy
			  	rx1 = new TH.RxAttributes(userId, pharmaIdForRx, doc2Id, 3549, 'med', 'some', false)
			  	return Rx.createAndReturn(rx1)
			  })
			  .then(function(rx) {
			  	immun1 = new TH.ImmunAttributes(userId, '01/01/1993', 'measles', 'need booster soon')
			  	return Immun.createAndReturn(immun1)
			  })
			  .then( function(immun) {
			  	return Auth.createToken(newTestUser.username)
			  })
			  .then( function(token) {

			  	return request(app)
			  	  .get('/user')
			  	  .set('x-access-token', token)
			  	  .expect(200)
			  	  .then( function(result) {

			  	  	objForClient = JSON.parse(result.text)

			  	  	expect(objForClient).to.be.an('object')
			  	  })
			  })
		})

	    it('returns a user object', function() {
	    	expect(TH.isValidPublicUser(objForClient['user']) ).to.be.true
	    })

	    it('returns an array of doctors associated with the user', function() {
		  	expect(objForClient['doctors']).to.be.an('array')
		  	expect(objForClient['doctors']).to.have.length(2)
		  	expect(TH.allValidDoctors(objForClient['doctors'])).to.be.true
	    })

	    it('returns the current eye prescription', function() {
		  	expect(objForClient['eyerx']).to.be.an('object')
		  	expect(TH.isValidPublicEyerx(objForClient['eyerx'])).to.be.true
	    })

		it("returns stored info if token is passed in", function() {

			var newTestUser = new TH.UserAttributes('bob', 'alice', 'bob@alice.com', '123-789-3456')
			var newTestDoctor1 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary', true)
			var newTestDoctor2 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist', false)
			var newEyeRx1 = undefined

			var userId = undefined
			var doc1Id = undefined
			var doc2Id = undefined

			var myToken = undefined

			return TH.createUserReturnId(newTestUser)
			  .then( function(id) {
			  	userId = id

			  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor1, 'primary', true)
			  })
			  .then( function() {
			  	return TH.createUserdoctorReturnDoctor(userId, newTestDoctor2, 'nonprimary', true)
			  })
			  .then( function() {
			  	newEyeRx1 = new TH.EyeRxAttributes(userId, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2)
			  	return EyeRx.createEyeRx(newEyeRx1)
			  })
			  .then( function() {
			  	return Auth.createToken(newTestUser.username)
			  })
			  .then( function(token) {
			  	myToken = token

			  	return request(app)
			  	  .get('/user')
			  	  .set('x-access-token', myToken)
			  	  .expect(200)
			  	  .then( function(result) {

			  	  	objForClient = JSON.parse(result.text)

			  	  	expect(objForClient).to.be.an('object')
			  	  })
			  })

		})

	    it('returns the user\'s appointments, grouped by doctor', function() {
	  	  	expect(objForClient['appointments']).to.be.an('array')
	  	  	expect(objForClient['appointments']).to.have.length(2)

	  	  	expect(objForClient['appointments'][0]).to.be.an('object')
	  	  	expect(objForClient['appointments'][1]).to.be.an('object')
	  	  	expect(objForClient['appointments'][0].appointments).to.be.an('array')
	  	  	expect(objForClient['appointments'][1].appointments).to.be.an('array')

	  	  	//doc1 should have 2 appointments, doc2 1 appointment
	  	  	//due to asynchronous behavior, can't guarantee which will have what position in array
	  	  	var doc1ApptObj = objForClient['appointments'][0].appointments.length > 1 ? objForClient['appointments'][0] : objForClient['appointments'][1]
	  	  	var doc2ApptObj = objForClient['appointments'][0].appointments.length > 1 ? objForClient['appointments'][1] : objForClient['appointments'][0]

	  	  	expect(doc1ApptObj.id_doctor).to.equal(doc1Id)
	  	  	expect(doc1ApptObj.appointments).to.have.length(2)
	  	  	expect(TH.allValidPublicAppts(doc1ApptObj.appointments)).to.be.true
	  	  	expect(doc1ApptObj['appointments'][0]).to.be.an('object')
	  	  	expect(TH.propsMatch(doc1ApptObj['appointments'][0], appointment1)).to.be.true
	  	  	expect(doc1ApptObj['appointments'][1]).to.be.an('object')
	  	  	expect(TH.propsMatch(doc1ApptObj['appointments'][1], appointment2)).to.be.true
	  	  	expect(doc2ApptObj.id_doctor).to.equal(doc2Id)
	  	  	expect(doc2ApptObj.appointments).to.be.an('array')
	  	  	expect(doc2ApptObj.appointments).to.have.length(1)
	  	  	expect(TH.allValidPublicAppts(doc2ApptObj.appointments)).to.be.true
	  	  	expect(TH.propsMatch(doc2ApptObj['appointments'][0], appointment3)).to.be.true
	    })

	    it('returns the user\'s allergies', function() {
		  	expect(objForClient['allergies']).to.be.an('array')
		  	expect(objForClient['allergies']).to.have.length(2)
		  	expect(objForClient['allergies'][0]).to.be.an('object')
		  	expect(objForClient['allergies'][1]).to.be.an('object')
		  	expect(TH.allValidPublicAllergy(objForClient['allergies'])).to.be.true
		  	expect(TH.propsMatch(objForClient['allergies'][0], allergy1)).to.be.true
		  	expect(TH.propsMatch(objForClient['allergies'][1], allergy2)).to.be.true
	    })

	    it('returns the family history, grouped by family member', function() {

	    	expect(objForClient['family']).to.be.an('array')
	    	expect(objForClient['family']).to.have.length(2)

	    	//famMem1 should have two conditions
	    	//famMem2 should have none
	    	//need to define it this way because asynchrony can mess up the order
	    	var fam1Obj = objForClient['family'][0]['history'].length > 1 ? objForClient['family'][0] : objForClient['family'][1]
	    	var fam2Obj = objForClient['family'][0]['history'].length > 1 ? objForClient['family'][1] : objForClient['family'][0]

		  	expect(fam1Obj.id_familymember).to.equal(famMem1_id)
		  	expect(fam1Obj['history']).to.be.an('array')
		  	expect(fam1Obj['history']).to.have.length(2)
		  	expect(TH.allValidPublicFamilyHistory(fam1Obj['history'])).to.be.true
		  	expect(TH.propsMatch(fam1Obj['history'][0], famHist1)).to.be.true
		  	expect(TH.propsMatch(fam1Obj['history'][1], famHist2)).to.be.true
		  	expect(fam2Obj.id_familymember).to.equal(famMem2_id)
		  	expect(fam2Obj['history']).to.be.an('array')
		  	expect(fam2Obj['history']).to.have.length(0)
		  	expect(TH.allValidPublicFamilyHistory(fam2Obj['history'])).to.be.true    	
	    })

	    it('returns insurance info', function() {
		  	expect(objForClient['insurance']).to.be.an('array')
		  	expect(objForClient['insurance']).to.have.length(1)
		  	expect(TH.allValidPublicInsurance(objForClient['insurance'])).to.be.true
		  	expect(TH.propsMatch(objForClient['insurance'][0], insurance1)).to.be.true
	    })

	    it('returns pharmacy info', function() {
		  	expect(objForClient['pharmacies']).to.be.an('array')
		  	expect(objForClient['pharmacies']).to.have.length(2)
		  	expect(TH.allValidPublicPharmas(objForClient['pharmacies'])).to.be.true
		  	expect(TH.propsMatch(objForClient['pharmacies'][0], pharma1)).to.be.true
		  	expect(TH.propsMatch(objForClient['pharmacies'][1], pharma2)).to.be.true  	
	    })

	    it('returns prescription info', function() {
	    	expect(objForClient['rx']).to.be.an('array')
	    	expect(objForClient['rx']).to.have.length(1)
	    	expect(TH.allValidPublicRx(objForClient['rx'])).to.be.true
	    	expect(TH.propsMatch(objForClient['rx'][0], rx1)).to.be.true 	
	    })

	    it('returns immunizations', function() {
		  	expect(objForClient['immunizations']).to.be.an('array')
		  	expect(objForClient['immunizations']).to.have.length(1)
		  	expect(TH.allValidPublicImmun(objForClient['immunizations'])).to.be.true
		  	expect(TH.propsMatch(objForClient['immunizations'][0], immun1)).to.be.true
		})

	})


	describe('PUT /user', function() {

		var user1 = new TH.UserAttributes('Mary', 'littlelamb', 'ilikelambs@llama.com', '453-583-3929')
		var initialHashed = undefined
		var newusername = 'Merry'
		var newUnhashed = 'Pippin'
		var newEmail = 'elevensies@secondbreakfast.org'

		it('returns a 201 on successful change and the updated object', function() {
			return User.createUser(user1)
			  .then(function() {
			  	return User.findByUsername('Mary')
			  })
			  .then(function(user) {
			  	initialHashed = user.password
			  	return Auth.createToken(user.username)
			  })
			  .then(function(token) {
			  	var props = {password: newUnhashed, username: newusername, email: newEmail}
			  	return request(app)
			  	  .put('/user')
			  	  .set('x-access-token', token)
			  	  .send({properties: props})
			  	  .expect(201)
			  	  .then( function(result) {
			  	  	var got = JSON.parse(result.text)
			  	  	expect(got).to.be.an('object')
			  	  	expect(TH.isValidPublicUser(got)).to.be.true
			  	  })
			  })
		})


		it('updates data in the database', function() {
			return User.getAll()
			  .then( function(all) {
			  	expect(all).to.be.an('array')
			  	expect(all).to.have.length(1)
			  	expect(all.phone).to.equal(user1.phone)
			  	expect(all.email).to.equal(newEmail)
			  	expect(all.username).to.equal(newusername)
			  })
		})

		it('hashes a password and changes the user\'s password in the database', function() {
			return User.getAll()
			  .then(function(all) {
			  	expect(all[0].password === initialPw).to.be.false
			  	expect(all[0].password === newUnhashed).to.be.false
			  })
		})

		it('returns a 400 and an error message if the user tries to change to a username that exists', function() {
			return User.createUser( new TH.UserAttributes('Frodo', 'isuckatpasswords', 'anything@yahoo', '453-583-3823'))
			  .then( function() {
			  	return Auth.createToken('Frodo')
			  })
			  .then( function(token) {
			  	var props = {username: 'Merry'}
			  	return request(app)
			  	  .put('/user')
			  	  .set('x-access-token', token)
			  	  .send({properties: props})
			  	  .expect(400)
			  	  .then(function(result) {
			  	  	var error = JSON.parse(result.text)
			  	  	console.log('got error')
			  	  	//expect error to be something
			  	  })
			  })
		})

		it('doesn\'t update for duplicate usernames', function() {
			return User.getAll()
			  .then(function(all) {
			  	expect(all).to.have.length(2)
			  	expect(all[0].username).to.equal('Merry')
			  	expect(all[1].username).to.equal('Frodo')
			  })
		})


    })




})
