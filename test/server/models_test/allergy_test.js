require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Allergy = require(__server + '/models/allergy')
const User = require(__server + '/models/user')


describe('**************** Allergy Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('creates an allergy record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newAllergy1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(id) {
        newAllergy1 = new TH.AllergyAttributes(id, 'pollen', true)
        return TH.createAllergyReturnAllergy(newAllergy1);
      })
      .then ( function(result) {
        expect( TH.propsMatch(result, newAllergy1) ).to.be.true
        return Allergy.getAll()
      })
      .then(function(allAllergies) {
        expect(allAllergies).to.be.an('array')
        expect(allAllergies).to.have.length(1)
      })
  })

  it('retrieves all allergy records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newAllergy2 = undefined
    var newAllergy3 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        id_user2 = id;
        newAllergy2 = new TH.AllergyAttributes(id_user2, 'hay', true)
        return Allergy.create(newAllergy2); 
      })
      .then( function() {
        newAllergy3 = new TH.AllergyAttributes(id_user2, 'dogs', false)
        return Allergy.create(newAllergy3)
      })
      .then( function() { return Allergy.getAllByUser(id_user2) })
      .then( function(allAllergy) {
        // console.log('got all allergy: ', allAllergy)
        resultFromDb = allAllergy
        expect( TH.propsMatch(resultFromDb[0], newAllergy2) ).to.be.true
        expect( TH.propsMatch(resultFromDb[1], newAllergy3) ).to.be.true
      })
  })

  it('retrieves an allergy record by id', function() {

    var allergy_id4 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456')
    var newAllergy4 = undefined
    

    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        newAllergy4 = new TH.AllergyAttributes(id, 'grass', true)
        return Allergy.create(newAllergy4); 
      })
      .then( function() { return Allergy.getAll() })
      .then( function(allAllergy) {
        allergy_id4 = allAllergy[0]['id_allergy']
      })
      .then( function() { 
        return Allergy.findById(allergy_id4);
      })
      .then( function(result) { 
        expect( TH.propsMatch(result, newAllergy4) ).to.be.true
      })
  })

  it('deletes an allergy record by id', function() {

    var allergy_id5 = undefined

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newAllergy5 = new TH.AllergyAttributes(id_user4, 'peanuts', true)

    return TH.createUserReturnUsername(newTestUser4)
      .then( function(user) {
        id_user4 = user.id_user;
        return Allergy.create(newAllergy5); 
      })
      .then( function() { return Allergy.getAll() })
      .then( function(allAllergy) {
        allergy_id5 = allAllergy[0]['id_allergy']
      })
      .then( function() { 
        return Allergy.deleteById(allergy_id5);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return Allergy.findById(allergy_id5)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
