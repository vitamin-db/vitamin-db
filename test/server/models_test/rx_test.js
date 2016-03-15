require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

// INSURANCE MODEL WRITTEN YET
const Rx = require(__server + '/models/rx')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const Pharmacy = require(__server + '/models/pharmacy')


describe('**************** Rx Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  xit('creates an Rx record', function () {

    // (id_user, id_pharmacy, id_doctor, refill_number, name, dosage, current)

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456') 
    var newTestDoctor1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
    var newPharmacy1 = new TH.PharmacyAttributes(id_user2, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
    var newRx1 = undefined


    var id_user1 = undefined, 
        id_doctor1 = undefined,
        id_pharma1 = undefined;

    return TH.createUserReturnId(newTestUser1)
      .then( function(userId) {
        id_user1 = userId;
        return TH.createDoctorReturnId(newTestDoctor1)
      })
      .then( function(doctorId) {
        id_doctor1 = doctorId;
        return TH.createPharmaReturnId(newPharmacy1)
      })
      .then( function(pharmaId) {
        id_pharma1 = pharmaId;
        newRx1 = new TH.RxAttributes(id_user1, id_pharma1, id_doctor1, 193723, 'Lunesta', '10mg', true)
      })
      .then( function(result) {
        expect( TH.isValidRx(result) ).to.be.true
        expect( TH.propsMatch(result, newRx1) ).to.be.true
      })
  })

  xit('retrieves all Rx records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newInsurance3 = new TH.InsuranceAttributes(id_user2, 'United', '392XJ33', '239843', 'jf93jaj3', false)
    var newInsurance4 = new TH.InsuranceAttributes(id_user2, 'Aetna', 'D3GR92D', '239384', 'asoiq983g', true)

    // return TH.createUserReturnUsername(newTestUser2)
    //   .then( function(user) {
    //     id_user2 = user.id_user;
    //     return Insurance.create(newInsurance3); 
    //   })
    //   .then( function() {
    //     return Insurance.create(newInsurance4)
    //   })
    //   // this may depend on a function extended from .getAll, to return everything associated
    //     // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
    //   .then( function() { return Insurance.getAll() })
    //   .then( function(allInsurance) {
    //     // console.log('got all insurance: ', allInsurance)
    //     resultFromDb = allInsurance
    //     return TH.propsMatch(resultFromDb[0], newInsurance3)
    //   })
    //   .then( function(result) {
    //     expect(result).to.be.true

    //     return TH.propsMatch(resultFromDb[1], newInsurance4)
    //   })
    //   .then( function(result) {
    //     expect(result).to.be.true
    //   })
  })

  xit('retrieves an Rx record by id', function() {

    var insurance_id5 = undefined

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newInsurance5 = new TH.InsuranceAttributes(id_user3, 'Blue Cross Blue Shield', 'J392DG', '393845', 'zmn32jk2', true)
    

    // return TH.createUserReturnUsername(newTestUser3)
    //   .then( function(user) {
    //     id_user3 = user.id_user;
    //     return Insurance.create(newInsurance5); 
    //   })
    //   .then( function() { return Insurance.getAll() })
    //   .then( function(allInsurance) {
    //     insurance_id5 = allInsurance[0]['id_insurance']
    //   })
    //   .then( function() { 
    //     return Insurance.findById(insurance_id5);
    //   })
    //   .then( function(result) { 
    //     // console.log('found insurance record by ID: ', result)
    //     return TH.propsMatch(result, newInsurance3)
    //   })
    //   .then( function(result) {
    //     expect(result).to.be.true
    //   })
  })

  xit('deletes an Rx record by id', function() {

    var insurance_id6 = undefined

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newInsurance6 = new TH.InsuranceAttributes(id_user4, 'Aetna Medical', 'JD349GS', '205922', 'pwie9381n', true)

    // return TH.createUserReturnUsername(newTestUser4)
    //   .then( function(user) {
    //     id_user4 = user.id_user;
    //     return Insurance.create(newInsurance6); 
    //   })
    //   .then( function() { return Insurance.getAll() })
    //   .then( function(allInsurance) {
    //     insurance_id6 = allInsurance[0]['id_insurance']
    //   })
    //   .then( function() { 
    //     return Insurance.deleteById(insurance_id6);
    //   })
    //   .then( function(deletedRecord) {
    //     expect(deletedRecord).to.equal(1)

    //     return Insurance.findById(insurance_id6)
    //   })
    //   .then(function(deletedRecord) {
    //     expect(deletedRecord).to.be.an('undefined')
    //   })
  })  

})
