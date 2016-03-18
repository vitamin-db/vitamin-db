const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Pharmacy = require(__server + '/models/pharmacy')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')
const Rx = require(__server + '/models/rx')


describe('/rx-api', function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET /rx', function() {

  	before(function() {
  	  return db.deleteEverything()
  	})

  	var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
  	var user1_id = undefined
  	var newPharmacy1 = undefined
  	var newPharmacy1_id = undefined
  	var doc1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
  	var doc1_id = undefined
  	var rx1 = undefined
  	var rx2 = undefined

  	it ('returns 200 and an array of all prescriptions', function() {
		return TH.createUserReturnId(newUser1)
		  .then(function(id) {
		    user1_id = id
		    newPharmacy1 = new TH.PharmacyAttributes(id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
		    return TH.createPharmaReturnId(newPharmacy1)
		  })
		  .then(function(id) {
		  	newPharmacy1_id = id

		  	return UserDoctor.createDoctor(doc1, user1_id, 'primary', true)
		  })
		  .then(function(doctor) {
		  	doc1_id = doctor.id_doctor

		  	rx1 = new TH.RxAttributes(user1_id, newPharmacy1_id, doc1_id, 3493, 'antibiotic scientificus', '1 pill per day', true)
		  	return TH.createRxReturnRx(rx1)
		  })
		  .then(function() {
		  	rx2 = new TH.RxAttributes(user1_id, newPharmacy1_id, doc1_id, 384798, 'vicodin', 'however many House takes', false)
		  	return TH.createRxReturnRx(rx2)
		  })
		  .then(function() {
		  	return Auth.createToken(newUser1.username)
		  })
		  .then(function(token) {
		  	return request(app)
		  	  .get('/rx')
		  	  .set('x-access-token', token)
		  	  .expect(200)
		  	  .then( function(result) {
		  	  	var got = JSON.parse(result.text)
		  	  	console.log('got', got)
		  	  	expect(got).to.be.an('array')
		  	  	expect(got).to.have.length(2)
		  	  	expect(TH.allValidPublicRx(got)).to.be.true
		  	  	expect(TH.propsMatch(got[0], rx1)).to.be.true
		  	  	expect(TH.propsMatch(got[1], rx2)).to.be.true
		  	  })
		  })
  	})



  })



 })





