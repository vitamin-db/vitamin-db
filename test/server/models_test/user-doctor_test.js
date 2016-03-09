require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')


describe('**************** User-Doctor Model ********', function() {

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
        // console.log('*************************')
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
        return UserDoctor.findAllDoctors( manual_id_user ) // UserDoctor.findAllDoctors takes user id
      })
      .then( function(result) {
        // console.log('(in test): got', result, 'via UserDoctor.findAllDoctors(id_user)')
        expect(result).to.be.an('array');
        expect(result).to.have.length(1)
        expect(result[0].name).to.equal('Dr. Smith')
        expect(result[0].street_address).to.equal('123 Main Street')
        expect(result[0].email).to.equal('doc@smith.com')
        expect(result[0].phone).to.equal('5869348594')
        expect(result[0].type).to.equal('primary')
      })

  }) // end 'retrieves all doctors associated with a particular user' test
}) // end describe User-Doctor Model
