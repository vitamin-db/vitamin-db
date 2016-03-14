const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')


describe('**************** User-Doctor Model ****************', function() {


  beforeEach(function() {
    return db.deleteEverything()
  })

  it('retrieves all doctors associated with a particular user', function () {

    var newTestUser = new TH.UserAttributes('patricia', 'bobpass123', 'bob@alice.com', '123-789-3456')
    var newTestDoctor = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '5869348594', 'primary', false)

    var manual_id_user = undefined;
    var manual_id_doctor = undefined;
    var manual_user_doctor = undefined

    // var newTestDoctor2 = new DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary')
    // var newTestDoctor3 = new DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist')
    
    // var newTestUserDoctor2 = new UserDoctorAttributes(1, 2, 'primary');
    // var newTestUserDoctor3 = new UserDoctorAttributes(1, 3, 'hypnotist');

    return TH.createUserReturnId(newTestUser)
      .then( function(id) {
        manual_id_user = id

        return TH.createDoctorReturnId(newTestDoctor)
      })
      .then( function(id) {
        manual_id_doctor = id
        manual_user_doctor = new TH.UserDoctorAttributes(manual_id_user, manual_id_doctor, 'primary')
        return UserDoctor.create(manual_user_doctor)
      })
      .then( function() {
        return UserDoctor.findAllDoctors(manual_id_user)
      })
      .then( function(result) {
        expect(result).to.be.an('array')
        expect(result).to.have.length(1)
        expect( TH.allValidDoctors(result) ).to.be.true
        expect( TH.propsMatch(result[0], newTestDoctor) ).to.be.true
      })

  })



  it('retrieves all doctors associated with a particular user, of certain type', function () {
    var newTestUser2 = new TH.UserAttributes('Wally', 'w4ly5p45sw0rd', 'wally@wally.com', '123-789-3456')
    var newTestDoctor2 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'awesome primary', true)
    var newTestDoctor3 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'primary', false)
    var newTestDoctor4 = new TH.DoctorAttributes('Dr. Otherman', '235 Franklin Ave', 'Austin', 'TX', 29384, 'otherman@doc.com', 'theotherdoc.com', '0987654321', 'hypnotist', true)

    var manual_id_user2 = undefined;
    var manual_createdDoctor2 = undefined
    var manual_createdDoctor3 = undefined
    var manual_createdDoctor4 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then( function(id) {
        manual_id_user2 = id
        console.log('user id', id)

        return TH.createUserdoctorReturnDoctor(manual_id_user2, newTestDoctor2, 'My Primary', false)
      })
      .then( function(doctor) {
        manual_createdDoctor2 = doctor

        return TH.createUserdoctorReturnDoctor(manual_id_user2, newTestDoctor3, 'My Primary', true)
      })
      .then( function(doctor) {
        manual_createdDoctor3 = doctor
        return TH.createUserdoctorReturnDoctor(manual_id_user2, newTestDoctor4, 'hypno', true)
      })
      .then( function(doctor) {
        manual_createdDoctor4 = doctor
        return UserDoctor.findAllDoctorsOfType( manual_id_user2, 'My Primary' )
      })
      .then( function(result) {
        console.log('got result', result)
        expect(result).to.be.an('array')
        expect(result).to.have.length(2)
        expect( TH.allValidDoctors(result) ).to.be.true
        expect( TH.propsMatch(result[0], newTestDoctor2) ).to.be.true
        expect( TH.propsMatch(result[1], newTestDoctor3) ).to.be.true
      })

  }) // end 'retrieves all doctors associated with a particular user' test
}) // end describe User-Doctor Model

