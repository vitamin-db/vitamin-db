require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

// INSURANCE MODEL WRITTEN YET
const Insurance = require(__server + '/models/insurance')
const User = require(__server + '/models/user')


describe('**************** Insurance Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  xit('creates an insurance record', function () {

    var newTestUser1 = new UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newInsurance2 = new InsuranceAttributes(id_user1, 'BlueCross', '13AX423B', '124039', 'rkd233kd', true)

    return User.createUser(newTestUser1)
      .then( function() {
        return User.findByUsername('Betsy') 
      })
      .then( function(user) {
        id_user1 = user.id_user;
        return Insurance.create(newInsurance2); 
      })
      .then( function(result) {
        // console.log('got new Insurance record: ', createdInsurance);
        expect(result.id_user).to.equal(id_user1)
        expect(result.plan_name).to.equal('BlueCross')
        expect(result.group_id).to.equal('13AX423B')
        expect(result.plan_id).to.equal('124039')
        expect(result.rx_bin).to.equal('rkd233kd')
        expect(result.current).to.equal(true)
      })
  })

  xit('retrieves all insurance records associated with user', function() {

    var newTestUser2 = new UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newInsurance3 = new InsuranceAttributes(id_user2, 'United', '392XJ33', '239843', 'jf93jaj3', false)
    var newInsurance4 = new InsuranceAttributes(id_user2, 'Aetna', 'D3GR92D', '239384', 'asoiq983g', true)

    return User.createUser(newTestUser2)
      .then( function() {
        return User.findByUsername('Ferdie') 
      })
      .then( function(user) {
        id_user2 = user.id_user;
        return Insurance.create(newInsurance3); 
      })
      .then( function() { return Insurance.create(newInsurance4) })
      // this may depend on a function extended from .getAll, to return everything associated
        // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
      .then( function() { return Insurance.getAll() })
      .then( function(allInsurance) {
        // console.log('got all insurance: ', allInsurance)
        expect(allInsurance).to.have.length(2)
        expect(allInsurance[0]['plan_name']).to.equal('United')
        expect(allInsurance[0]['group_id']).to.equal('392XJ33')
        expect(allInsurance[0]['plan_id']).to.equal('239843')
        expect(allInsurance[1]['rx_bin']).to.equal('asoiq983g')
        expect(allInsurance[1]['current']).to.equal('true')
      })
  })

  xit('retrieves an insurance record by id', function() {

    var insurance_id5 = undefined

    var newTestUser3 = new UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newInsurance5 = new InsuranceAttributes(id_user3, 'Blue Cross Blue Shield', 'J392DG', '393845', 'zmn32jk2', true)
    

    return User.createUser(newTestUser3)
      .then( function() {
        return User.findByUsername('Merritt') 
      })
      .then( function(user) {
        id_user3 = user.id_user;
        return Insurance.create(newInsurance5); 
      })
      .then( function() { return Insurance.getAll() })
      .then( function(allInsurance) {
        insurance_id5 = allInsurance[0]['id_insurance']
      })
      .then( function() { 
        return Insurance.findById(insurance_id5);
      })
      .then( function(result) { 
        // console.log('found insurance record by ID: ', result)
        expect(result.id_insurance).to.equal(insurance_id5)
        expect(result.plan_name).to.equal('Blue Cross Blue Shield')
        expect(result.group_id).to.equal('J392DG')
        expect(result.plan_id).to.equal('393845')
        expect(result.rx_bin).to.equal('zmn32jk2')
        expect(result.current).to.equal(true)
      })
  })

  xit('deletes an insurance record by id', function() {

    var insurance_id6 = undefined

    var newTestUser4 = new UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newInsurance6 = new InsuranceAttributes(id_user4, 'Aetna Medical', 'JD349GS', '205922', 'pwie9381n', true)

    return User.createUser(newTestUser4)
      .then( function() {
        return User.findByUsername('Ralf') 
      })
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
