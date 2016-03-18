require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Insurance = require(__server + '/models/insurance')
const User = require(__server + '/models/user')


describe('**************** Insurance Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('creates an insurance record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newInsurance1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then (function(id) {
        newInsurance1 = new TH.InsuranceAttributes(id, 'BlueCross', '13AX423B', '124039', 'rkd233kd', true)
        return TH.createInsuranceReturnInsurance(newInsurance1)
      })
      .then( function(result) {
        expect( TH.propsMatch(result, newInsurance1) ).to.be.true
      })
     
  })

  it('retrieves all insurance records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newInsurance3 = undefined
    var newInsurance4 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        id_user2 = id;
        newInsurance3 = new TH.InsuranceAttributes(id_user2, 'United', '392XJ33', '239843', 'jf93jaj3', false)
        return Insurance.create(newInsurance3); 
      })
      .then( function() {
        newInsurance4 = new TH.InsuranceAttributes(id_user2, 'Aetna', 'D3GR92D', '239384', 'asoiq983g', true)
        return Insurance.create(newInsurance4)
      })
      .then( function() { return Insurance.getAllByUser(id_user2) })
      .then( function(allInsurance) {
        resultFromDb = allInsurance
        expect( TH.propsMatch(resultFromDb[0], newInsurance3) ).to.be.true
        expect( TH.propsMatch(resultFromDb[1], newInsurance4) ).to.be.true
      })
  })

  it('retrieves an insurance record by id', function() {

    var insurance_id5 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newInsurance5 = undefined
    

    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        id_user3 = id;
        newInsurance5 = new TH.InsuranceAttributes(id_user3, 'Blue Cross Blue Shield', 'J392DG', '393845', 'zmn32jk2', true)
        return Insurance.create(newInsurance5); 
      })
      .then( function() { 
        return Insurance.getAll() 
      })
      .then( function(allInsurance) {
        insurance_id5 = allInsurance[0]['id_insurance']
      })
      .then( function() {
        return Insurance.findById(insurance_id5);
      })
      .then( function(result) {
        expect( TH.propsMatch(result, newInsurance5) ).to.be.true
      })
  })

  it('deletes an insurance record by id', function() {

    var insurance_id6 = undefined

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newInsurance6 = new TH.InsuranceAttributes(id_user4, 'Aetna Medical', 'JD349GS', '205922', 'pwie9381n', true)

    return TH.createUserReturnUser(newTestUser4)
      .then( function(user) {
        id_user4 = user.id_user;
        return Insurance.create(newInsurance6); 
      })
      .then( function() { return Insurance.getAll() })
      .then( function(allInsurance) {
        insurance_id6 = allInsurance[0]['id_insurance']
      })
      .then( function() { 
        return Insurance.deleteById(insurance_id6);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return Insurance.findById(insurance_id6)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
