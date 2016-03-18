const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Insurance = require(__server + '/models/insurance')

describe('/insurance-api', function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET /insurance', function() {

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newInsurance1 = undefined
    var newInsurance2 = undefined

    it('returns all current insurance records', function() {

      // can have multiple current insurance records

      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          newInsurance1 = new TH.InsuranceAttributes(id, 'BlueCross', '13AX423B', '124039', 'rkd233kd', true)
          return Insurance.create(newInsurance1)
        })
        .then(function() {
          newInsurance2 = new TH.InsuranceAttributes(user1_id, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
        return Insurance.create(newInsurance2)
        })
        .then(function() {
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .get('/insurance')
            .set('x-access-token', token)
            .expect(200)
            .then(function(result) {
              var got = JSON.parse(result.text)
              // console.log('got: ', got)
              expect(got).to.be.an('array')
              expect(got[0]).to.be.an('object')
              expect(got[0].current).to.be.true
              expect(TH.isValidPublicInsurance(got[0])).to.be.true
              expect(TH.propsMatchExceptMaybeCurrent(got[0], newInsurance1)).to.be.true
            })
        })

    })
  })

  describe('POST /insurance', function() {

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
      var newInsurance_props = new TH.InsuranceAttributesNoUser('Aetna', 'D3GR92D', '239384', 'asoiq983g', true)

      it('returns the newly posted insurance', function() {
        return TH.createUserReturnIdAndToken(newUser1)
          .then(function(userAndToken) {
            user1_id = userAndToken.id_user
            return request(app)
              .post('/insurance')
              .set('x-access-token', userAndToken.token)
              .send({properties: newInsurance_props})
              .expect(201)
              .then(function(result) {
                var newInsurance = JSON.parse(result.text)
                expect(newInsurance).to.be.an('object')
                //expect(TH.isValidPublicInsurance(newInsurance)).to.be.true
              })
          })
      })

      it('adds an insurance record to the database', function() {
        return Insurance.getAllByUser(user1_id)
          .then(function(allInsurance) {
            expect(allInsurance).to.be.an('array')
            expect(allInsurance).to.have.length(1)
            expect(TH.isValidPublicInsurance(allInsurance[0])).to.be.true
          })
      })

  })

  describe('PUT /insurance', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      console.log('deleting everything - insurance api')
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newInsurance1 = undefined
    var newInsurance1_updated = undefined
    var newInsurance1_id = undefined

      it('returns an updated insurance', function() {
        return TH.createUserReturnId(newUser1)
          .then(function(id) {
            user1_id = id
            newInsurance1 = new TH.InsuranceAttributes(id, 'BlueCross', '13AX423B', '124039', 'rkd233kd', true)
            newInsurance1_updated = new TH.InsuranceAttributes(id, 'Aetna', '13AX423B', '124039', 'rkd233kd', true)
            return TH.createInsuranceReturnInsurance(newInsurance1)
          })
          .then(function(insurance) {
            newInsurance1_id = insurance.id_insurance
            return Auth.createToken(newUser1.username)
          })
          .then(function(token) {
            var props = {id_insurance: newInsurance1_id, plan_name: newInsurance1_updated.plan_name}
            return request(app)
              .put('/insurance')
              .set('x-access-token', token)
              .send({properties: props})
              .expect(201)
              .then( function(result) {
                var ob = JSON.parse(result.text)
                expect(ob).to.be.an('object')
                expect(TH.propsMatchExceptMaybeCurrent(ob, newInsurance1_updated)).to.be.true
                expect(TH.propsMatchExceptMaybeCurrent(ob, newInsurance1)).to.be.false

              })
          })
      })


      it('modifies the specified insurance in the database', function() {
        return Insurance.getAllByUser(user1_id)
          .then(function(all) {
            expect(all).to.be.an('array')
            expect(all).to.have.length(1)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newInsurance1_updated)).to.be.true
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newInsurance1)).to.be.false
          })
      })


  })

  xdescribe('DELETE /insurance/:id_insurance', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newInsurance1_id = undefined

    it('returns a 200 on a successful delete', function() {
      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          return TH.createInsuranceReturnInsurance(new TH.InsuranceAttributes(id, 'BlueCross', '13AX423B', '124039', 'rkd233kd', true))
        })
        .then(function(insurance) {
          newInsurance1_id = insurance.id_insurance
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .del('/insurance/' + newInsurance1_id)
            .set('x-access-token', token)
            .expect(200)
        })
    })

    it('removes the insurance from the database', function() {
      return Insurance.findById(newInsurance1_id)
        .then(function(deleted) {
          expect(deleted).to.be.an('undefined')
        })
    })
  })
})

















