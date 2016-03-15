const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const Pharmacy = require(__server + '/models/pharmacy')
const User = require(__server + '/models/user')


xdescribe('**************** Pharmacy Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('creates a pharmacy record', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    // var newPharmacy1 = new TH.PharmacyAttributes(id_user1, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
    var newPharmacy1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(id) {
        newPharmacy1 = new TH.PharmacyAttributes(id, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)
        return TH.createPharmaReturnPharma(newPharmacy1)
      })
      .then( function(result) {
        expect( TH.isValidPharma(result) ).to.be.true
        expect( TH.propsMatch(result, newPharmacy1) ).to.be.true
      })
  })

  it('retrieves all pharmacy records associated with user', function() {

    var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
    var id_user2 = undefined
    var newPharmacy2 = undefined
    var newPharmacy3 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        id_user2 = id

        newPharmacy2 = new TH.PharmacyAttributes(id_user2, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
        return TH.createPharmaReturnPharma(newPharmacy2)
      })
      .then( function() {
        newPharmacy3 = new TH.PharmacyAttributes(id_user2, '38th Street Pharmacy', '711 W 38th St C-3, Austin, TX 78705', '(512) 458-3784', false)
        return TH.createPharmaReturnPharma(newPharmacy3)
      })
      .then( function() {
        return Pharmacy.getAllByUserId(id_user2)
      })
      .then( function(allPharmacies) {
        expect(allPharmacies).to.be.an('array')
        expect(allPharmacies).to.have.length(2)
        expect( TH.allValidPharmas(allPharmacies) ).to.be.true
        expect( TH.propsMatch(allPharmacies[0], newPharmacy2) ).to.be.true
        expect( TH.propsMatch(allPharmacies[1], newPharmacy3) ).to.be.true
      })
  })

  it('retrieves a pharmacy record by id', function() {

    var newTestUser3 = new TH.UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456')
    var user_id3 = undefined

    var newPharmacy4 = undefined
    var pharmacy_id4 = undefined
    
    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        user_id3 = id
        newPharmacy4 = new TH.PharmacyAttributes(user_id3, 'H-E-B Pharmacy', '5808 Burnet Rd, Austin, TX 78756', '(512) 454-6691', true)
        return TH.createPharmaReturnId(newPharmacy4)
      })
      .then( function(id) {
        return Pharmacy.findById(id)
      })
      .then( function(pharmacy) {
        expect(pharmacy).to.be.an('object')
        expect( TH.isValidPharma(pharmacy) ).to.be.true
        expect( TH.propsMatch(pharmacy, newPharmacy4) ).to.be.true
      })
  })

  it('deletes a pharmacy record by id', function() {

    var newTestUser4 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456')
    id_user4 = undefined
    var newPharmacy5 = undefined
    var pharmacy_id5 = undefined

    return TH.createUserReturnId(newTestUser4)
      .then( function(id) {
        id_user4 = id

        newPharmacy5 = new TH.PharmacyAttributes(id_user4, 'Avella Specialty Pharmacy', '3016 Guadalupe St. Suite A, Austin, TX 78705', '(512) 454-6691', true)
        return TH.createPharmaReturnId(newPharmacy5)
      })
      .then( function(id) {
        pharmacy_id5 = id
        return Pharmacy.deleteById(pharmacy_id5)
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)
        return Pharmacy.findById(pharmacy_id5)
      })
      .then( function(deletedPharmacy) {
        expect(deletedPharmacy).to.be.an('undefined')
      })
  })

  it('toggles whether the pharmacy is current or not', function() {

    var newTestUser5 = new TH.UserAttributes('MyNameIsHello', 'mypasswordisshitty', 'isuck@hotmail.com', '3')
    id_user5 = undefined
    var newPharmacy5 = undefined
    var pharmacy_id6 = undefined

    return TH.createUserReturnId(newTestUser5)
      .then( function(id) {
        id_user5 = id
        newPharmacy5 = new TH.PharmacyAttributes(id_user5, 'CVS Probably', '456 City Road', '(512) 454-6691', true)
        return TH.createPharmaReturnId(newPharmacy5)
      })
      .then( function(id) {
        pharmacy_id6 = id
        return Pharmacy.toggleCurrent(pharmacy_id6)
      })
      .then( function(updated) {
        expect(updated).to.be.an('object')
        expect(updated.current).to.be.false
        return Pharmacy.findById(pharmacy_id6)
      })
      .then( function(pharmacy) {
        expect(pharmacy.current).to.be.false
        return Pharmacy.toggleCurrent(pharmacy_id6)
      })
      .then( function(updated) {
        expect(updated).to.be.an('object')
        expect(updated.current).to.be.true
        return Pharmacy.findById(pharmacy_id6)
      })
      .then( function(pharmacy) {
        expect(pharmacy.current).to.be.true
      })
      .catch( function(err) {
        expect(true).to.be.false
      })

  })



})

