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


  describe('POST /rx', function() {
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

  		it('returns 201 and the newly posted prescription', function() {
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

  			  	return Auth.createToken(newUser1.username)
  			  })
  			  .then(function(token) {
  			  	return request(app)
  			  	  .post('/rx')
  			  	  .set('x-access-token', token)
  			  	  .send({properties: rx1})
  			  	  .expect(201)
  			  	  .then( function(result) {
  			  	  	var got = JSON.parse(result.text)
  			  	  	expect(got).to.be.an('object')
  			  	  	expect(TH.isValidPublicRx(got)).to.be.true
  			  	  	expect(TH.propsMatch(got, rx1)).to.be.true
  			  	  })
  			  })
  		})

  		it('adds an rx to the database', function() {
  			return Rx.getAll()
  			  .then(function(allRx) {
  			  	expect(allRx).to.be.an('array')
  			  	expect(allRx).to.have.length(1)
  			  	expect(TH.isValidRx(allRx[0])).to.be.true
  			  	expect(TH.propsMatch(allRx[0], rx1)).to.be.true
  			  })
  		})

      it('returns a 400 and an error message if the refill number is not parsable to an integer', function() {
        var rx2 = new TH.RxAttributes(user1_id, newPharmacy1_id, doc1_id, 'afea', 'some stuff', 'a pill', false)

        return Auth.createToken(newUser1.username)
          .then( function(token) {
            return request(app)
              .post('/rx')
              .set('x-access-token', token)
              .send({properties: rx2})
              .expect(400)
              .then( function(result) {
                var got = JSON.parse(result.text)
                expect(got).to.be.an('object')
                expect(got).to.have.keys('error', 'msg')
                expect(got.msg).to.equal('Please enter a valid refill number')
              })
          })
      })
  })

 })


  describe('PUT /rx', function() {

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
  	var rx1_id = undefined


  	it('returns the newly updated object', function() {
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
  		  .then(function(rx) {
  		  	rx1_id = rx.id_rx
  		  	return Auth.createToken(newUser1.username)
  		  })
  		  .then(function(token) {
  		  	var update = {id_rx: rx1_id, dosage: '1 pill/hour'}
  		  	return request(app)
  		  	  .put('/rx')
  		  	  .set('x-access-token', token)
  		  	  .send({properties: update})
  		  	  .expect(201)
  		  	  .then( function(result) {
  		  	  	var got = JSON.parse(result.text)
  		  	  	expect(got).to.be.an('object')
  		  	  	expect(TH.isValidPublicRx(got))
  		  	  	expect(got.dosage).to.equal('1 pill/hour')
  		  	  })
  		  })
  	})

  	it('updates the prescription in the database', function() {
  		return Rx.findById(rx1_id)
  		  .then( function(rx) {
  		  	expect(rx).to.be.an('object')
  		  	expect(TH.propsMatch(rx, doc1)).to.be.false
  		  	expect(rx.name).to.equal('antibiotic scientificus')
  		  	expect(rx.dosage).to.equal('1 pill/hour')
  		  })
  	})

    it('returns a 400 and an error message if the refill number is not parsable to an integer', function() {
      var props = {id_rx: rx1_id, refill_number: 'afafwfa', name: 'more pillz'}

      return Auth.createToken(newUser1.username)
        .then( function(token) {
          return request(app)
            .put('/rx')
            .set('x-access-token', token)
            .send({properties: props})
            .expect(400)
            .then( function(result) {
              var got = JSON.parse(result.text)
              expect(got).to.be.an('object')
              expect(got).to.have.keys('error', 'msg')
              expect(got.msg).to.equal('Please enter a valid refill number')
            })
        })
    })

  })

  describe('DELETE /rx/:id_rx', function() {

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
  	var rx1_id = undefined


  	it('returns a 200 code', function() {
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
  		  .then(function(rx) {
  		  	rx1_id = rx.id_rx
  		  	return Auth.createToken(newUser1.username)
  		  })
  		  .then( function(token) {
  		  	return request(app)
  		  	  .del('/rx/' + rx1_id)
  		  	  .set('x-access-token', token)
  		  	  .expect(200)
  		  })
  	})

  	it('deletes the entry from the database', function() {
  		return Rx.findById(rx1_id)
  		  .then(function(rx) {
  		  	expect(rx).to.be.an('undefined')

  		  	return Rx.getAll()
  		  })
  		  .then(function(all) {
  		  	expect(all).to.be.an('array')
  		  	expect(all).to.have.length(0)
  		  })
  	})

  })





})





