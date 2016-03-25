require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Rx = require(__server + '/models/rx')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const Pharmacy = require(__server + '/models/pharmacy')


xdescribe('**************** Rx Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('creates an Rx record', function () {

    var id_user1 = undefined, 
        id_doctor1 = undefined,
        id_pharma1 = undefined;

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456') 
    var newTestDoctor1 = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')
    var newTestPharmacy1 = new TH.PharmacyAttributes(id_user1, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
    var newRx1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(userId) {
        id_user1 = userId;
        return TH.createDoctorReturnId(newTestDoctor1)
      })
      .then( function(doctorId) {
        id_doctor1 = doctorId;
        return TH.createPharmaReturnId(newTestPharmacy1)
      })
      .then( function(pharmaId) {
        id_pharma1 = pharmaId;
        newRx1 = new TH.RxAttributes(id_user1, id_pharma1, id_doctor1, 193723, 'Lunesta', '10mg', true)
        return TH.createRxReturnRx(newRx1)
      })
      .then( function(result) {
        expect( TH.isValidRx(result) ).to.be.true
        expect( TH.propsMatch(result, newRx1) ).to.be.true
      })
  })

  it('retrieves all Rx records associated with user', function() {

    var id_user2 = undefined, 
    id_doctor2 = undefined,
    id_pharma2 = undefined;

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
    var newTestDoctor2 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary')
    var newTestPharmacy2 = new TH.PharmacyAttributes(id_user2, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
    var newRx2 = undefined
    var newRx3 = undefined


    return TH.createUserReturnId(newTestUser2)
      .then( function(userId) {
        id_user2 = userId;
        return TH.createDoctorReturnId(newTestDoctor2)
      })
      .then( function(doctorId) {
        id_doctor2 = doctorId;
        return TH.createPharmaReturnId(newTestPharmacy2)
      })
      .then( function(pharmaId) {
        id_pharma2 = pharmaId;
        newRx2 = new TH.RxAttributes(id_user2, id_pharma2, id_doctor2, 193723, 'Prozac', '50mg', true)
        return TH.createRxReturnRx(newRx2)
      })
      .then( function() {
        newRx3 = new TH.RxAttributes(id_user2, id_pharma2, id_doctor2, 193723, 'Lortab', '25mg', true)
        return Rx.create(newRx3)
      })
      .then( function() { return Rx.getAllByUser(id_user2) })
      .then( function(allRx) {
        expect(allRx).to.be.an('array')
        expect(allRx).to.have.length(2)
        expect( TH.allValidRx(allRx) ).to.be.true
        expect( TH.propsMatch(allRx[0], newRx2) ).to.be.true
        expect( TH.propsMatch(allRx[1], newRx3) ).to.be.true
      })
  })

  it('retrieves an Rx record by id', function() {

    var id_user3 = undefined, 
    id_doctor3 = undefined,
    id_pharma3 = undefined,
    id_rx4 = undefined;

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456')
    var newTestDoctor3 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist')
    var newTestPharmacy3 = new TH.PharmacyAttributes(id_user3, '38th Street Pharmacy', '711 W 38th St C-3, Austin, TX 78705', '(512) 458-3784', false)
    var newRx4 = undefined

    return TH.createUserReturnId(newTestUser3)
      .then( function(userId) {
        id_user3 = userId;
        return TH.createDoctorReturnId(newTestDoctor3)
      })
      .then( function(doctorId) {
        id_doctor3 = doctorId;
        return TH.createPharmaReturnId(newTestPharmacy3)
      })
      .then( function(pharmaId) {
        id_pharma3 = pharmaId;
        newRx4 = new TH.RxAttributes(id_user3, id_pharma3, id_doctor3, 193723, 'Zoloft', '15mg', true)
        return TH.createRxReturnId(newRx4)
      })
      .then( function(rxId) {
        id_rx4 = rxId
        return Rx.findById(id_rx4)
      })
      .then( function(rx) {
        expect( TH.isValidRx(rx) ).to.be.true
        expect( TH.propsMatch(rx, newRx4) ).to.be.true
      })
  })

  it('deletes an Rx record by id', function() {

    var id_user4 = undefined, 
    id_doctor4 = undefined,
    id_pharma4 = undefined,
    id_rx5 = undefined;

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456')
    var newTestDoctor4 = new TH.DoctorAttributes('Dr. Rick', '4563 First Street', 'Austin', 'TX', 78751, 'doc@rick.com', 'docrick.com', '1234567890', 'therapist')
    var newTestPharmacy4 = new TH.PharmacyAttributes(id_user4, 'H-E-B Pharmacy', '5808 Burnet Rd, Austin, TX 78756', '(512) 454-6691', true)
    var newRx5 = new TH.RxAttributes(id_user4, id_pharma4, id_doctor4, 193723, 'Wellbutrin', '55mg', true)

    return TH.createUserReturnId(newTestUser4)
      .then( function(userId) {
        id_user4 = userId;
        return TH.createDoctorReturnId(newTestDoctor4)
      })
      .then( function(doctorId) {
        id_doctor4 = doctorId;
        return TH.createPharmaReturnId(newTestPharmacy4)
      })
      .then( function(pharmaId) {
        id_pharma4 = pharmaId;
        return TH.createRxReturnId(newRx5)
      })
      .then( function(rxId) {
        id_rx5 = rxId
        return Rx.deleteById(id_rx5)
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return Rx.findById(id_rx5)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
