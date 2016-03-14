require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// PHARMACY MODEL WRITTEN YET
const Pharmacy = require(__server + '/models/pharmacy')
const User = require(__server + '/models/user')


describe('**************** Pharmacy Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  var UserAttributes = function(username, password, email, phone) {
    this.username = username
    this.password = password
    this.email = email
    this.phone = phone
  }

  var PharmacyAttributes = function(id_user, business_name, address, phone, current) {
    this.id_user = id_user
    this.business_name = business_name
    this.address = address
    this.phone = phone
    this.current = current
  }

  xit('creates a pharmacy record', function () {

    var newTestUser1 = new UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newPharmacy1 = new PharmacyAttributes(id_user1, 'CVS', '2927 Guadalupe St, Austin, TX 78705', '(512) 474-2323', true)

    return User.createUser(newTestUser1)
      .then( function() {
        return User.findByUsername('Betsy') 
      })
      .then( function(user) {
        id_user1 = user.id_user;
        return Pharmacy.create(newPharmacy1); 
      })
      .then( function(result) {
        // console.log('got new Pharmacy record: ', result);
        expect(result.id_user).to.equal(id_user1)
        expect(result.business_name).to.equal('CVS')
        expect(result.address).to.equal('2927 Guadalupe St, Austin, TX 78705')
        expect(result.phone).to.equal('(512) 474-2323')
        expect(result.current).to.equal(true)
      })
  })

  xit('retrieves all pharmacy records associated with user', function() {

    var newTestUser2 = new UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newPharmacy2 = new PharmacyAttributes(id_user2, 'Walgreens', '2501 S Lamar Blvd, Austin, TX 78704', '(512) 443-7534', true)
    var newPharmacy3 = new PharmacyAttributes(id_user2, '38th Street Pharmacy', '711 W 38th St C-3, Austin, TX 78705', '(512) 458-3784', false)

    return User.createUser(newTestUser2)
      .then( function() {
        return User.findByUsername('Ferdie') 
      })
      .then( function(user) {
        id_user2 = user.id_user;
        return Pharmacy.create(newPharmacy2); 
      })
      .then( function() { return Pharmacy.create(newPharmacy3) })
      // this may depend on a function extended from .getAll, to return everything associated
        // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
      .then( function() { return Pharmacy.getAll() })
      .then( function(allPharmacy) {
        // console.log('got all Pharmacy: ', allPharmacy)
        expect(allPharmacy).to.have.length(2)
        expect(allPharmacy[0]['id_user']).to.equal(id_user2)
        expect(allPharmacy[0]['business_name']).to.equal('38th Street Pharmacy')
        expect(allPharmacy[0]['address']).to.equal('711 W 38th St C-3, Austin, TX 78705')
        expect(allPharmacy[1]['id_user']).to.equal(id_user2)
        expect(allPharmacy[1]['phone']).to.equal('(512) 458-3784')
        expect(allPharmacy[1]['current']).to.equal(false)
      })
  })

  xit('retrieves a pharmacy record by id', function() {

    var pharmacy_id4 = undefined

    var newTestUser3 = new UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newPharmacy4 = new PharmacyAttributes(id_user3, 'H-E-B Pharmacy', '5808 Burnet Rd, Austin, TX 78756', '(512) 454-6691', true)
    

    return User.createUser(newTestUser3)
      .then( function() {
        return User.findByUsername('Merritt') 
      })
      .then( function(user) {
        id_user3 = user.id_user;
        return Pharmacy.create(newPharmacy4); 
      })
      .then( function() { return Pharmacy.getAll() })
      .then( function(allPharmacy) {
        pharmacy_id4 = allPharmacy[0]['id_pharmacy']
      })
      .then( function() { 
        return Pharmacy.findById(pharmacy_id4);
      })
      .then( function(result) { 
        // console.log('found pharmacy record by ID: ', result)
        expect(result.id_pharmacy).to.equal(pharmacy_id4)
        expect(result.id_user).to.equal(id_user3)
        expect(result.business_name).to.equal('H-E-B Pharmacy')
        expect(result.address).to.equal('5808 Burnet Rd, Austin, TX 78756')
        expect(result.phone).to.equal('(512) 454-6691')
        expect(result.current).to.equal(true)
      })
  })

  xit('deletes a pharmacy record by id', function() {

    var pharmacy_id5 = undefined

    var newTestUser4 = new UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newPharmacy5 = new PharmacyAttributes(id_user3, 'Avella Specialty Pharmacy', '3016 Guadalupe St. Suite A, Austin, TX 78705', '(512) 454-6691', true)

    return User.createUser(newTestUser4)
      .then( function() {
        return User.findByUsername('Ralf') 
      })
      .then( function(user) {
        id_user4 = user.id_user;
        return Pharmacy.create(newPharmacy5); 
      })
      .then( function() { return Pharmacy.getAll() })
      .then( function(allPharmacy) {
        pharmacy_id5 = allPharmacy[0]['id_pharmacy']
      })
      .then( function() { 
        return Pharmacy.deleteById(pharmacy_id5);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return Pharmacy.findById(pharmacy_id5)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
