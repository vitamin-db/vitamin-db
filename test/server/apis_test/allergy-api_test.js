const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Allergy = require(__server + '/models/allergy')

xdescribe('/allergy-api', function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET /allergy', function() {

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newAllergy1 = undefined
    var newAllergy2 = undefined

    it('returns all current allergy records', function() {

      // can have multiple current allergy records

      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          newAllergy1 = new TH.AllergyAttributes(id, 'pollen', true)
          return Allergy.create(newAllergy1)
        })
        .then(function() {
          newAllergy2 = new TH.AllergyAttributes(user1_id, 'hay', true)
          return Allergy.create(newAllergy2)
        })
        .then(function() {
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .get('/allergy')
            .set('x-access-token', token)
            .expect(200)
            .then(function(result) {
              var got = JSON.parse(result.text)
              console.log('got: ', got)
              expect(got).to.be.an('array')
              expect(got[0]).to.be.an('object')
              expect(got[0].current).to.be.true
              expect(TH.isValidPublicAllergy(got[0])).to.be.true
              expect(TH.propsMatchExceptMaybeCurrent(got[0], newAllergy1)).to.be.true
            })
        })

    })
  })

  describe('POST /allergy', function() {

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
      var newAllergy_props = new TH.AllergyAttributesNoUser('dogs', false)

      it('returns the newly posted allergy', function() {
        return TH.createUserReturnIdAndToken(newUser1)
          .then(function(userAndToken) {
            user1_id = userAndToken.id_user
            return request(app)
              .post('/allergy')
              .set('x-access-token', userAndToken.token)
              .send({properties: newAllergy_props})
              .expect(201)
              .then(function(result) {
                var newAllergy = JSON.parse(result.text)
                expect(newAllergy).to.be.an('object')
                //expect(TH.isValidPublicAllergy(newAllergy)).to.be.true
              })
          })
      })

      it('adds an allergy record to the database', function() {
        return Allergy.getAllByUser(user1_id)
          .then(function(allAllergy) {
            expect(allAllergy).to.be.an('array')
            expect(allAllergy).to.have.length(1)
            expect(TH.isValidPublicAllergy(allAllergy[0])).to.be.true
          })
      })

  })

  describe('PUT /allergy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      console.log('deleting everything - allergy api')
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newAllergy1 = undefined
    var newAllergy1_updated = undefined
    var newAllergy1_id = undefined

      it('returns an updated allergy', function() {
        return TH.createUserReturnId(newUser1)
          .then(function(id) {
            user1_id = id
            newAllergy1 = new TH.AllergyAttributes(id, 'grass', true)
            newAllergy1_updated = new TH.AllergyAttributes(id, 'peanuts', true)
            return TH.createAllergyReturnAllergy(newAllergy1)
          })
          .then(function(allergy) {
            newAllergy1_id = allergy.id_allergy
            return Auth.createToken(newUser1.username)
          })
          .then(function(token) {
            var props = {id_allergy: newAllergy1_id, allergen: newAllergy1_updated.allergen}
            return request(app)
              .put('/allergy')
              .set('x-access-token', token)
              .send({properties: props})
              .expect(201)
              .then( function(result) {
                var ob = JSON.parse(result.text)
                expect(ob).to.be.an('object')
                expect(TH.propsMatchExceptMaybeCurrent(ob, newAllergy1_updated)).to.be.true
                expect(TH.propsMatchExceptMaybeCurrent(ob, newAllergy1)).to.be.false

              })
          })
      })


      it('modifies the specified allergy in the database', function() {
        return Allergy.getAllByUser(user1_id)
          .then(function(all) {
            expect(all).to.be.an('array')
            expect(all).to.have.length(1)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newAllergy1_updated)).to.be.true
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newAllergy1)).to.be.false
          })
      })


  })

  describe('DELETE /allergy/:id_allergy', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newAllergy1_id = undefined

    it('returns a 200 on a successful delete', function() {
      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          return TH.createAllergyReturnAllergy(new TH.AllergyAttributes(id, 'peanuts', true))
        })
        .then(function(allergy) {
          newAllergy1_id = allergy.id_allergy
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .del('/allergy/' + newAllergy1_id)
            .set('x-access-token', token)
            .expect(200)
        })
    })

    it('removes the allergy from the database', function() {
      return Allergy.findById(newAllergy1_id)
        .then(function(deleted) {
          expect(deleted).to.be.an('undefined')
        })
    })
  })
})
