require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

// ALLERGY MODEL NOT WRITTEN YET
const Allergy = require(__server + '/models/allergy')
const User = require(__server + '/models/user')


xdescribe('**************** Allergy Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  xit('creates an allergy record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newAllergy1 = new TH.AllergyAttributes(id_user1, 'pollen', true)

    return TH.createUserReturnUsername(newTestUser1)
      .then( function(user) {
        id_user1 = user.id_user;
        return Allergy.create(newAllergy1); 
      })
      .then( function(allergy) {
        return TH.propsMatch(allergy, newAllergy1)
      })
      .then( function(result) {
        expect(result).to.be.true
      })
  })

  xit('retrieves all allergy records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newAllergy2 = new TH.AllergyAttributes(id_user2, 'hay', true)
    var newAllergy3 = new TH.AllergyAttributes(id_user2, 'dogs', false)

    return TH.createUserReturnUsername(newTestUser2)
      .then( function(user) {
        id_user2 = user.id_user;
        return Allergy.create(newAllergy2); 
      })
      .then( function() {
        return Allergy.create(newAllergy3)
      })
      // this may depend on a function extended from .getAll, to return everything associated
        // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
      .then( function() { return Allergy.getAll() })
      .then( function(allAllergy) {
        // console.log('got all allergy: ', allAllergy)
        resultFromDb = allAllergy
        expect( TH.propsMatch(resultFromDb[0], newAllergy2) ).to.be.true
        expect( TH.propsMatch(resultFromDb[1], newAllergy3) ).to.be.true
      })
  })

  xit('retrieves an allergy record by id', function() {

    var allergy_id4 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newAllergy4 = new TH.AllergyAttributes(id_user3, 'grass', true)
    

    return TH.createUserReturnUsername(newTestUser3)
      .then( function(user) {
        id_user3 = user.id_user;
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

  xit('deletes an allergy record by id', function() {

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
