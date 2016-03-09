require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')


describe('**************** User-Doctor Model ****************', function() {


  beforeEach(function() {
    return db.deleteEverything()
  })

  var UserAttributes = function(username, password, email, phone) {
    this.username = username
    this.password = password
    this.email = email
    this.phone = phone
  }

  var DoctorAttributes = function(name, street_address, city, state_abbrev, zip, email, web, phone, type) {
    this.name = name
    this.street_address = street_address
    this.city = city
    this.state_abbrev = state_abbrev
    this.zip = zip
    this.email = email
    this.web = web
    this.phone = phone
    this.type = type
  }

  var UserDoctorAttributes = function(id_user, id_doctor, type_usermade) {
    this.id_user = id_user;
    this.id_doctor = id_doctor;
    this.type_usermade = type_usermade;
  }

  it('retrieves all doctors associated with a particular user', function () {

    var newTestUser = new UserAttributes('patricia', 'bobpass123', 'bob@alice.com', '123-789-3456')
    var newTestDoctor = new DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '5869348594', 'primary')

    var manual_id_user = undefined;
    var manual_id_doctor = undefined;

    // var newTestDoctor2 = new DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary')
    // var newTestDoctor3 = new DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist')
    
    // var newTestUserDoctor2 = new UserDoctorAttributes(1, 2, 'primary');
    // var newTestUserDoctor3 = new UserDoctorAttributes(1, 3, 'hypnotist');

    return User.create(newTestUser)
      .then( function() {
        return User.findByUsername('patricia') 
      })
      .then( function(user) {
        manual_id_user = user.id_user;
        return Doctor.create(newTestDoctor) 
      })
      .then( function(doctor) {
        return Doctor.findByName('Dr. Smith')
      })
      .then( function(doctor) { 
        manual_id_doctor = doctor.id_doctor;
      })
      .then( function() { 
        var newTestUserDoctor = new UserDoctorAttributes(manual_id_user, manual_id_doctor, 'primary'); 
        return UserDoctor.create(newTestUserDoctor) 
      })
      .then( function(userdoctor) {
        return UserDoctor.findAllDoctors( manual_id_user ) // UserDoctor.findAllDoctors takes user_id
      })
      .then( function(result) {

        expect(result).to.be.an('array');
        expect(result).to.have.length(1)
        expect(result[0].name).to.equal('Dr. Smith')
        expect(result[0].street_address).to.equal('123 Main Street')
        expect(result[0].email).to.equal('doc@smith.com')
        expect(result[0].phone).to.equal('5869348594')
        expect(result[0].type).to.equal('primary')
      })

  })



  it('retrieves all doctors associated with a particular user, of certain type', function () {
    var newTestUser2 = new UserAttributes('Wally', 'w4ly5p45sw0rd', 'wally@wally.com', '123-789-3456')
    var newTestDoctor2 = new DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'awesome primary')
    var newTestDoctor3 = new DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'primary')
    var newTestDoctor4 = new DoctorAttributes('Dr. Otherman', '235 Franklin Ave', 'Austin', 'TX', 29384, 'otherman@doc.com', 'theotherdoc.com', '0987654321', 'hypnotist')

    var manual_id_user2 = undefined;
    var manual_id_doctor2 = undefined;
    var manual_id_doctor3 = undefined;
    var manual_id_doctor4 = undefined;

    return User.create(newTestUser2)
      .then( function() {
        return User.findByUsername('Wally') 
      })
      .then( function(user) {
        manual_id_user2 = user.id_user;
        return Doctor.create(newTestDoctor2) 
      })
      .then( function(doctor) {
        return Doctor.findByName('Dr. Walker')
      })
      .then( function(doctor) { 
        manual_id_doctor2 = doctor.id_doctor;
        return Doctor.create(newTestDoctor3)
      })
      .then( function(doctor) {
        return Doctor.findByName('Dr. Rando')
      })
      .then( function(doctor) { 
        manual_id_doctor3 = doctor.id_doctor;
        return Doctor.create(newTestDoctor4)
      })
      .then( function(doctor) {
        return Doctor.findByName('Dr. Otherman')
      })
      .then( function(doctor) { 
        manual_id_doctor4 = doctor.id_doctor;
      })
      .then( function() { 
        var newTestUserDoctor2 = new UserDoctorAttributes(manual_id_user2, manual_id_doctor2, 'My Primary'); 
        return UserDoctor.create(newTestUserDoctor2) 
      })
      .then( function() { 
        var newTestUserDoctor3 = new UserDoctorAttributes(manual_id_user2, manual_id_doctor3, 'My Primary'); 
        return UserDoctor.create(newTestUserDoctor3) 
      })
      .then( function() { 
        var newTestUserDoctor4 = new UserDoctorAttributes(manual_id_user2, manual_id_doctor4, 'Hypno'); 
        return UserDoctor.create(newTestUserDoctor4) 
      })
      .then( function() {
        return UserDoctor.findAllDoctorsOfType( manual_id_user2, 'My Primary' )  // UserDoctor.findAllDoctorsOfType takes user_id, type_usermade
      })
      .then( function(result) {
        expect(result).to.be.an('array');
        expect(result).to.have.length(2)
        expect(result[0].name).to.equal('Dr. Walker')
        expect(result[0].street_address).to.equal('125 Walnut Street')
        expect(result[0].type).to.equal('awesome primary')
        expect(result[1].email).to.equal('doc@rando.com')
        expect(result[1].phone).to.equal('0987654321')
        expect(result[1].type).to.equal('primary')
      })

  }) // end 'retrieves all doctors associated with a particular user' test
}) // end describe User-Doctor Model

