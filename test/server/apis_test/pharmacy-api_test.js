const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Pharmacy = require(__server + '/models/pharmacy')

xdescribe('/pharmacy-api', function() {

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
          return Pharmacy.create(newPharmacy1)
        })
        .then(function() {
          newPharmacy2 = new TH.PharmacyAttributes(user1_id, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
        return Pharmacy.create(newPharmacy2)
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
              var got = JSON.parse(result.text)
              // console.log('got: ', got)
              expect(got).to.be.an('array')
              expect(got[0]).to.be.an('object')
              expect(got[0].current).to.be.true
              expect(TH.isValidPublicPharma(got[0])).to.be.true
              expect(TH.propsMatchExceptMaybeCurrent(got[0], newPharmacy1)).to.be.true
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
      var user1_token = undefined
      var newPharmacy_props = new TH.PharmacyAttributesNoUser('CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)

      it('returns the newly posted pharmacy', function() {
        return TH.createUserReturnIdAndToken(newUser1)
          .then(function(userAndToken) {
            user1_id = userAndToken.id_user
            return request(app)
              .post('/pharmacy')
              .set('x-access-token', userAndToken.token)
              .send({properties: newPharmacy_props})
              .expect(201)
              .then(function(result) {
                var newPharmacy = JSON.parse(result.text)
                expect(newPharmacy).to.be.an('object')
                //expect(TH.isValidPublicPharma(newPharmacy)).to.be.true
              })
          })
      })

      it('adds a pharmacy to the database', function() {
        return Pharmacy.getAllByUser(user1_id)
          .then(function(allPharmacy) {
            expect(allPharmacy).to.be.an('array')
            expect(allPharmacy).to.have.length(1)
            expect(TH.isValidPublicPharma(allPharmacy[0])).to.be.true
          })
      })

  })

  describe('PUT /pharmacy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      console.log('deleting everything - pharmacy api')
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newPharma1 = undefined
    var newPharma1_updated = undefined
    var newPharma1_id = undefined

      it('returns an updated pharmacy', function() {
        return TH.createUserReturnId(newUser1)
          .then(function(id) {
            user1_id = id
            newPharma1 = new TH.PharmacyAttributes(user1_id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
            newPharma1_updated = new TH.PharmacyAttributes(user1_id, 'Walgreens', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
            return TH.createPharmaReturnPharma(newPharma1)
          })
          .then(function(pharmacy) {
            newPharma1_id = pharmacy.id_pharmacy
            return Auth.createToken(newUser1.username)
          })
          .then(function(token) {
            var props = {id_pharmacy: newPharma1_id, business_name: newPharma1_updated.business_name}
            return request(app)
              .put('/pharmacy')
              .set('x-access-token', token)
              .send({properties: props})
              .expect(201)
              .then( function(result) {
                var ob = JSON.parse(result.text)
                expect(ob).to.be.an('object')
                expect(TH.propsMatchExceptMaybeCurrent(ob, newPharma1_updated)).to.be.true
                expect(TH.propsMatchExceptMaybeCurrent(ob, newPharma1)).to.be.false

              })
          })
      })


      it('modifies the specified pharmacy in the database', function() {
        return Pharmacy.getAllByUser(user1_id)
          .then(function(all) {
            expect(all).to.be.an('array')
            expect(all).to.have.length(1)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newPharma1_updated)).to.be.true
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newPharma1)).to.be.false
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
    var newPharma1_id = undefined

    it('returns a 200 on a successful delete', function() {
      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          return TH.createPharmaReturnPharma(new TH.PharmacyAttributes(user1_id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true))
        })
        .then(function(pharma) {
          newPharma1_id = pharma.id_pharmacy
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

















