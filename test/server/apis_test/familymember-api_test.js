const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')

const TH = require(__test + '/test-helper')

const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const FamilyMember = require(__server + '/models/familymembers')

describe('/familymember-api', function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET /familymember', function() {

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newFamilyMember1 = undefined
    var newFamilyMember2 = undefined

    it('returns all current familymember records', function() {

      // can have multiple current familymember records

      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          newFamilyMember1 = new TH.FamilyMemberAttributes(id, 'Grandma Rose')
          return FamilyMember.create(newFamilyMember1)
        })
        .then(function() {
          newFamilyMember2 = new TH.FamilyMemberAttributes(user1_id, 'Uncle Pablo')
          return FamilyMember.create(newFamilyMember2)
        })
        .then(function() {
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .get('/familymember')
            .set('x-access-token', token)
            .expect(200)
            .then(function(result) {
              var got = JSON.parse(result.text)
              console.log('got: ', got)
              expect(got).to.be.an('array')
              expect(got[0]).to.be.an('object')
              expect(TH.isValidPublicFamilyMember(got[0])).to.be.true
              expect(TH.propsMatchExceptMaybeCurrent(got[0], newFamilyMember1)).to.be.true
            })
        })

    })
  })

  xdescribe('POST /familymember', function() {

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
      var newFamilyMember_props = new TH.FamilyMemberAttributesNoUser('Mom')

      it('returns the newly posted familymember', function() {
        return TH.createUserReturnIdAndToken(newUser1)
          .then(function(userAndToken) {
            console.log('userAndToken: ', userAndToken)
            user1_id = userAndToken.id_user
            console.log('user1_id: ', user1_id)
            return request(app)
              .post('/familymember')
              .set('x-access-token', userAndToken.token)
              .send({properties: newFamilyMember_props})
              .expect(201)
              .then(function(result) {
                var newFamilyMember = JSON.parse(result.text)
                expect(newFamilyMember).to.be.an('object')
                //expect(TH.isValidPublicFamilyMember(newFamilyMember)).to.be.true
              })
          })
      })

      it('adds an familymember record to the database', function() {
        return FamilyMember.getAllByUser(user1_id)
          .then(function(allFamilyMembers) {
            expect(allFamilyMembers).to.be.an('array')
            expect(allFamilyMembers).to.have.length(1)
            expect(TH.isValidPublicFamilyMember(allFamilyMembers[0])).to.be.true
          })
      })

  })

  xdescribe('PUT /familymember', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      console.log('deleting everything - familymember api')
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newFamilyMember1 = undefined
    var newFamilyMember_updated = undefined
    var newFamilyMember1_id = undefined

      it('returns an updated familymember', function() {
        return TH.createUserReturnId(newUser1)
          .then(function(id) {
            user1_id = id
            newFamilyMember1 = new TH.FamilyMemberAttributes(id, 'Dad')
            newFamilyMember_updated = new TH.FamilyMemberAttributes(id, 'Aunt Jo')
            return TH.createFamilyMemberReturnFamilyMember(newFamilyMember1)
          })
          .then(function(familymember) {
            newFamilyMember1_id = familymember.id_familymember
            return Auth.createToken(newUser1.username)
          })
          .then(function(token) {
            var props = {id_familymember: newFamilyMember1_id, name: newFamilyMember_updated.name}
            return request(app)
              .put('/familymember')
              .set('x-access-token', token)
              .send({properties: props})
              .expect(201)
              .then( function(result) {
                var ob = JSON.parse(result.text)
                expect(ob).to.be.an('object')
                expect(TH.propsMatchExceptMaybeCurrent(ob, newFamilyMember_updated)).to.be.true
                expect(TH.propsMatchExceptMaybeCurrent(ob, newFamilyMember1)).to.be.false

              })
          })
      })


      it('modifies the specified familymember in the database', function() {
        return FamilyMember.getAllByUser(user1_id)
          .then(function(all) {
            expect(all).to.be.an('array')
            expect(all).to.have.length(1)
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newFamilyMember_updated)).to.be.true
            expect(TH.propsMatchExceptMaybeCurrent(all[0], newFamilyMember1)).to.be.false
          })
      })


  })

  xdescribe('DELETE /familymember/:id_familymember', function() {

    //set up app
    var app = TH.createApp()
    app.use('/', routes)
    app.testReady()

    before(function() {
      return db.deleteEverything()
    })

    var newUser1 = new TH.UserAttributes('imauser', 'password', 'something@gmail.com', '453-245-2423')
    var user1_id = undefined
    var newFamilyMember1_id = undefined

    it('returns a 200 on a successful delete', function() {
      return TH.createUserReturnId(newUser1)
        .then(function(id) {
          user1_id = id
          return TH.createFamilyMemberReturnFamilyMember(new TH.FamilyMemberAttributes(id, 'Grandpa Joe'))
        })
        .then(function(familymember) {
          newFamilyMember1_id = familymember.id_familymember
          return Auth.createToken(newUser1.username)
        })
        .then(function(token) {
          return request(app)
            .del('/familymember/' + newFamilyMember1_id)
            .set('x-access-token', token)
            .expect(200)
        })
    })

    it('removes the familymember from the database', function() {
      return FamilyMember.findById(newFamilyMember1_id)
        .then(function(deleted) {
          expect(deleted).to.be.an('undefined')
        })
    })
  })
})
