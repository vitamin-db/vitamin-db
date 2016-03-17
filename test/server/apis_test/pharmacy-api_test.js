const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Pharmacy = require(__server + '/models/pharmacy')

describe('/pharmacy-api', function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET /pharmacy', function() {

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newPharmacy1 = undefined
    var newPharmacy2 = undefined

    it('returns all current pharmacies', function() {

      // can have multiple current pharmacies

      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          newPharmacy1 = new TH.PharmacyAttributes(id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
          return Pharmacy.createPharmacy(newPharmacy1)
        })
        .then(function() {
          newPharmacy2 = new TH.PharmacyAttributes(id_user2, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
        return Pharmacy.createPharmacy(newPharmacy2)
        })
        .then(function() {
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .get('/pharmacy')
            .set('x-access-token', token)
            .expect(200)
            .then(function(result) {
              // var got = JSON.parse(result.text)
              // expect(got).to.be.an('object')
              // expect(got.pharmacy).to.be.an('object')
              // expect(got.pharmacy.current).to.be.true
              // expect(TH.isValidPublicEyerx(got.pharmacy)).to.be.true
              // expect(TH.propsMatchExceptMaybeCurrent(got.pharmacy, newEyeRx2)).to.be.true
            })
        })

    })
  })

  describe('POST /pharmacy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      return db.deleteEverything()
    })


      var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
      var user1_id = undefined
      var newPharma1 = undefined

      it('returns the newly posted prescription', function() {
        return TH.createUserReturnIdAndToken(newUser1)
          .then(function(userAndToken) {
            user1_id = userAndToken.id_user
            newPharma1 = new TH.PharmacyAttributes(user1_id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
            return TH.createPharmaReturnPharma(newPharma1)
          })
          .then(function(newPharmaObj) {
            return request(app)
              .post('/pharmacy')
              .set('x-access-token', userAndToken.token)
              .send(newPharmaObj)
              .expect(201)
              .then(function(result) {
                var newPharmaParsed = JSON.parse(result)
                expect(newPharmaParsed).to.be.an('object')
                expect(TH.isValidPublicPharma(pharma)).to.be.true
                expect(TH.propsMatchExceptMaybeCurrent(newPharmaParsed, newPharma1)).to.be.true
              })
          })
      })

      it('adds a prescription to the database', function() {
        return Pharmacy.getAllByUser(user1_id)
          .then(function(allPharma) {
            expect(allPharma).to.be.an('array')
            expect(allPharma).to.have.length(1)
            expect(TH.isValidPublicPharma(allPharma[0])).to.be.true
            expect(TH.propsMatchExceptMaybeCurrent(allPharma[0], newPharma1)).to.be.true
          })
      })

  })

  describe('PUT /pharmacy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      console.log('deleting everything - eyerx api')
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newPharma1 = undefined
    var newPharma1_updated = undefined
    var pharma1_id = undefined

      it('returns an updated pharmacy record', function() {
        return TH.createUserReturnId(newUser1)
          .then(function(id) {
            user1_id = id
            newPharma1 = new TH.PharmacyAttributes(user1_id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
            newPharma1_updated = new TH.PharmacyAttributes(user1_id, 'Walgreens', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
            return TH.createPharmaReturnPharma(newPharma1)
          })
          .then(function(createdPharma1) {
            pharma1_id = createdPharma1.id_pharmacy
            return Auth.createToken(newUser1.username)
          })
          .then(function(token) {
            return request(app)
              .put('/pharmacy')
              .set('x-access-token', token)
              .send(JSON.stringify({id_pharmacy: pharma1_id, name: newPharma1_updated.name}))
              .expect(201)
              .then( function(result) {
                var obj = JSON.parse(result)
                expect(obj).to.be.an('object')
                expect(TH.propsMatchExceptMaybeCurrent(obj, newPharma1_updated).to.be.true)
                expect(TH.propsMatchExceptMaybeCurrent(obj, newPharma1).to.be.false)

              })
          })
      })

      it('modifies the specified pharmacy in the database', function() {
        return Pharmacy.getAllByUser()
          .then(function(all) {
            expect(all).to.be.an('array')
            expect(all).to.have.length(1)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newPharma1_updated).to.be.true)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newPharma1).to.be.false)
          })
      })
  })

  describe('DELETE /pharmacy/:id_pharmacy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newPharma1 = undefined
    var newPharma1_id = undefined

    it('returns a 200 on a successful delete', function() {
      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          newPharma1 = new TH.PharmacyAttributes(user1_id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
          return TH.createPharmaReturnPharma(newPharma1)
        })
        .then(function(newPharma) {
          newPharma1_id = newPharma.id_pharmacy
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .del('/pharmacy/' + newPharma1_id)
            .set('x-access-token', token)
            .expect(200)
        })
    })

    it('removes the pharmacy from the database', function() {
      return Pharmacy.findById(newPharma1_id)
        .then(function(deleted) {
          expect(deleted).to.be.an('undefined')
        })
    })
  })
})

















