require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// EYERX MODEL NOT WRITTEN YET
const EyeRx = require(__server + '/models/eyerx')
const User = require(__server + '/models/user')

/*
Methods to write:
 - addNew - takes new attrs as the argument
 - if there is a current one, makes the current one not current
 - adds the new as ahte current

 -Toggle current
 - getAllById

*/
describe('**************** EyeRx Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('creates an eyerx record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
    var id_user1 = undefined
    var newEyeRx1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(id) {
        id_user1 = id
        newEyeRx1 = new TH.EyeRxAttributes(id_user1, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2, true)
        return EyeRx.createEyeRx(newEyeRx1)
      })
      .then( function(eyerx) {
        expect(eyerx).to.be.an('object')
        expect(TH.propsMatch(eyerx, newEyeRx1)).to.be.true
        expect(TH.isValidEyerx(eyerx)).to.be.true
      })
  })

  it('retrieves all eyerx records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
    var id_user2 = undefined
    var newEyeRx2 = undefined
    var newEyeRx3 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        id_user2 = id
        newEyeRx2 = new TH.EyeRxAttributes(id_user2, 2.50, 1.75, 2.00, -1.00, 24, 42, 1.50, 1, true)
        newEyeRx3 = new TH.EyeRxAttributes(id_user2, 2.50, 1.50, 2.00, -.75, 30, 10, .5, 1.5, false)
        return EyeRx.createEyeRx(newEyeRx2)
      })
      .then( function() {
        return EyeRx.createEyeRx(newEyeRx3)
      })
      .then( function() {
        return EyeRx.getAllByUser(id_user2)
      })
      .then( function(allEyeRx) {
        expect(allEyeRx).to.be.an('array')
        expect(allEyeRx).to.have.length(2)
        expect(TH.allValidEyeRx(allEyeRx)).to.be.true
        expect(TH.propsMatchExceptMaybeCurrent(allEyeRx[0], newEyeRx2)).to.be.true
        expect(TH.propsMatchExceptMaybeCurrent(allEyeRx[1], newEyeRx3)).to.be.true
      })
  })

  it('retrieves an eyerx record by id', function() {

    var eyerx_id4 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456')
    var newEyeRx4 = undefined
    

    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        newEyeRx4 = new TH.EyeRxAttributes(id, 1.00, 1.25, 1.25, 1.00, 20, 20, 1.00, 1.00, true)
        return EyeRx.createEyeRx(newEyeRx4)
      })
      .then( function() {
        return EyeRx.getAll()
      })
      .then( function(allEyeRx) {
        eyerx_id4 = allEyeRx[0]['id_eyerx']
        return EyeRx.findById(eyerx_id4)
      })
      .then( function(eyerx) {
        expect(eyerx).to.be.an('object')
        expect( TH.isValidEyerx(eyerx) ).to.be.true
        expect( TH.propsMatch(eyerx, newEyeRx4) ).to.be.true
      })
  })

  it('deletes an eyerx record by id', function() {

    var eyerx_id5 = undefined

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456')
    var id_user4 = undefined
    var newEyeRx5 = new TH.EyeRxAttributes(id_user4, -1.00, -1.25, -1.25, -1.00, 10, 10, -1.00, -1.00, false)

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
