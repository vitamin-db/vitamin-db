require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// EYERX MODEL NOT WRITTEN YET
const EyeRx = require(__server + '/models/eyerx')
const User = require(__server + '/models/user')


describe('**************** EyeRx Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  xit('creates an eyerx record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newEyeRx1 = new TH.EyeRxAttributes(id_user1, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2, true)

    return TH.createUserReturnId(newTestUser1)
      .then( function(id) {
        id_user1 = id
        return EyeRx.create(newEyeRx1); 
      })
      .then( function(eyerx) {
        expect( TH.propsMatch(eyerx, newEyeRx1) ).to.be.true
      })
  })

  xit('retrieves all eyerx records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newEyeRx2 = new TH.EyeRxAttributes(id_user2, 2.50, 1.75, 2.00, -1.00, 24, 42, 1.50, 1, true)
    var newEyeRx3 = new TH.EyeRxAttributes(id_user2, 2.50, 1.50, 2.00, -.75, 30, 10, .5, 1.5, false)

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        id_user2 = id
        return EyeRx.create(newEyeRx2);
      })
      .then( function() { return EyeRx.create(newEyeRx3) })
      // this may depend on a function extended from .getAll, to return everything associated
        // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyeRx) {
        resultFromDb = allEyeRx
        expect( TH.propsMatch(resultFromDb[0], newEyeRx2) ).to.be.true
        expect( TH.propsMatch(resultFromDb[1], newEyeRx3) ).to.be.true
      })
  })

  xit('retrieves an eyerx record by id', function() {

    var eyerx_id4 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newEyeRx4 = new TH.EyeRxAttributes(id_user2, 1.00, 1.25, 1.25, 1.00, 20, 20, 1.00, 1.00, true)
    

    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        id_user3 = id
        return EyeRx.create(newEyeRx4); 
      })
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyeRx) {
        eyerx_id4 = allEyeRx[0]['id_eyerx']
      })
      .then( function() { 
        return EyeRx.findById(eyerx_id4);
      })
      .then( function(eyerx) {
        expect( TH.propsMatch(eyerx, newEyeRx4) ).to.be.true
      })
  })

  xit('deletes an eyerx record by id', function() {

    var eyerx_id5 = undefined

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newEyeRx5 = new TH.EyeRxAttributes(id_user2, -1.00, -1.25, -1.25, -1.00, 10, 10, -1.00, -1.00, false)

    return TH.createUserReturnId(newTestUser4)
      .then( function(id) {
        id_user4 = id
        return EyeRx.create(newEyeRx5); 
      })
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyerx) {
        eyerx_id5 = allEyeRx[0]['id_eyerx']
      })
      .then( function() { 
        return EyeRx.deleteById(eyerx_id5);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return EyeRx.findById(eyerx_id5)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
