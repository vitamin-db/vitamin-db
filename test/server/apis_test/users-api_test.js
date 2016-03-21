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


describe("GET /user", function() {

	//set up app
	var app = TH.createApp()
	app.use('/', routes)
	app.testReady()

	beforeEach(function() {
		return db.deleteEverything()
	})

	it("returns 403 if no token is passed", function() {
		
		return request(app)
		  .get('/user')
		  .expect(403)

	})

	it("returns stored info if token is passed in", function() {

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

		var myToken = undefined

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
		  	allergy1 = TH.AllergyAttributes(userId, 'cats', false)
		  	return Allergy.create(allergy1)
		  })
		  .then( function() {
		  	allergy2 = TH.AllergyAttributes(userId, 'medicine', true)
		  	return Allergy.create(allergy2)
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
		  	myToken = token

		  	return request(app)
		  	  .get('/user')
		  	  .set('x-access-token', myToken)
		  	  .expect(200)
		  	  .then( function(result) {

		  	  	var objForClient = JSON.parse(result.text)

		  	  	expect(objForClient).to.be.an('object')

		  	  	//user
		  	  	expect(TH.isValidPublicUser(objForClient['user']) ).to.be.true

		  	  	//array of doctors
		  	  	expect(objForClient['doctors']).to.be.an('array')
		  	  	expect(objForClient['doctors']).to.have.length(2)
		  	  	expect(TH.allValidDoctors(objForClient['doctors'])).to.be.true

		  	  	//array of appointments (grouped by doctor)

		  	  	//eye rx
		  	  	expect(objForClient['eyerx']).to.be.an('object')
		  	  	expect(TH.isValidPublicEyerx(objForClient['eyerx'])).to.be.true

		  	  	//array of appointments
		  	  	expect(objForClient['appointments']).to.be.an('array')
		  	  	expect(objForClient['appointments']).to.have.length(2)
		  	  	expect(objForClient['appointments'][0]).to.be.an('object')
		  	  	expect(objForClient['appointments'][0].id_doctor).to.equal(doc1Id)
		  	  	expect(objForClient['appointments'][0].appointments).to.be.an('array')
		  	  	expect(objForClient['appointments'][0].appointments).to.have.length(2)
		  	  	expect(TH.allValidPublicAppts(objForClient['appointments'][0].appointments)).to.be.true
		  	  	expect(objForClient['appointments'][0]['appointments'][0]).to.be.an('object')
		  	  	expect(TH.propsMatch(objForClient['appointments'][0]['appointments'][0], appointment1)).to.be.true
		  	  	expect(objForClient['appointments'][0]['appointments'][1]).to.be.an('object')
		  	  	expect(TH.propsMatch(objForClient['appointments'][0]['appointments'][1], appointment2)).to.be.true
		  	  	expect(objForClient['appointments'][1].id_doctor).to.equal(doc2Id)
		  	  	expect(objForClient['appointments'][1].appointments).to.be.an('array')
		  	  	expect(objForClient['appointments'][1].appointments).to.have.length(1)
		  	  	expect(TH.allValidPublicAppts(objForClient['appointments'][1].appointments)).to.be.true
		  	  	expect(TH.propsMatch(objForClient['appointments'][1]['appointments'][0], appointment3)).to.be.true

		  	  	//array of allergies
		  	  	expect(objForClient['allergies']).to.be.an('array')
		  	  	expect(objForClient['allergies']).to.have.length(2)
		  	  	expect(objForClient['allergies'][0]).to.be.an('object')
		  	  	expect(objForClient['allergies'][1]).to.be.an('object')
		  	  	expect(TH.allValidPublicAllergy(objForClient['allergies'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['allergies'][0], allergy1)).to.be.true
		  	  	expect(TH.propsMatch(objForClient['allergies'][1], allergy2)).to.be.true

		  	  	//array of family conditions, grouped by family member
		  	  	expect(objForClient['family']).to.be.an('array')
		  	  	expect(objForClient['family']).to.have.length(2)
		  	  	expect(objForClient['family'][0].id_familymember).to.equal(famMem1_id)
		  	  	expect(objForClient['family'][0]['history']).to.be.an('array')
		  	  	expect(objForClient['family'][0]['history']).to.have.length(2)
		  	  	expect(TH.allValidPublicFamilyHistory(objForClient['family'][0]['history'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['family'][0]['history'][0], famHist1)).to.be.true
		  	  	expect(TH.propsMatch(objForClient['family'][0]['history'][1], famHist2)).to.be.true
		  	  	expect(objForClient['family'][1].id_familymember).to.equal(famMem2_id)
		  	  	expect(objForClient['family'][0]['history']).to.be.an('array')
		  	  	expect(objForClient['family'][0]['history']).to.have.length(0)
		  	  	expect(TH.allValidPublicFamilyHistory(objForClient['family'][1]['history'])).to.be.true

		  	  	//array of insurance info
		  	  	expect(objForClient['insurance']).to.be.an('array')
		  	  	expect(objForClient['insurance']).to.have.length(1)
		  	  	expect(TH.allValidPublicInsurance(objForClient['insurance'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['insurance'][0]), insurance1).to.be.true

		  	  	//array of pharmacy info
		  	  	expect(objForClient['pharmacies']).to.be.an('array')
		  	  	expect(objForClient['pharmacies']).to.have.length(2)
		  	  	expect(TH.allValidPublicPharmas(objForClient['pharmacies'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['pharmacies'][0], pharma1)).to.be.true
		  	  	expect(TH.propsMatch(objForClient['pharmacies'][1], pharma2)).to.be.true

		  	  	//array of rx
		  	  	expect(objForClient['rx']).to.be.an('array')
		  	  	expect(objForClient['rx']).to.have.length(1)
		  	  	expect(TH.allValidPublicRx(objForClient['rx'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['rx'][0], rx1)).to.be.true

		  	  	//array of immunizations
		  	  	expect(objForClient['immunizations']).to.be.an('array')
		  	  	expect(objForClient['immunizations']).to.have.length(1)
		  	  	expect(TH.allValidPublicImmun(objForClient['immunizations'])).to.be.true
		  	  	expect(TH.propsMatch(objForClient['immunizations'], immun)).to.be.true

		  	  })
		  })

	})





})


