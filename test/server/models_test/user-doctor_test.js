const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')
const Appointment = require(__server + '/models/appointment')


describe('**************** User-Doctor Model ****************', function() {


  beforeEach(function() {
    return db.deleteEverything()
  })


  it('returns the id_user_doctor based on a username and id_doctor', function() {

    var newTestUser = new TH.UserAttributes('patricia', 'bobpass123', 'bob@alice.com', '123-789-3456')
    var newTestDoctor = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '5869348594', 'primary')
    var id_doc = undefined
    var createdUserDoctor = undefined

    return TH.createUserReturnId(newTestUser)
      .then(function(id) {
        return UserDoctor.createDoctor(newTestDoctor, id, 'new primary', false)
      })
      .then(function(doctor) {
        id_doc = doctor.id_doctor
        return UserDoctor.getAll()
      })
      .then(function(all) {
        createdUserDoctor = all[0]
        return UserDoctor.findId(newTestUser.username, id_doc)
      })
      .then(function(id) {
        expect(id).to.equal(createdUserDoctor.id_user_doctor)
      })

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


  it('adds a doctor to both the doctors and user_doctor tables', function() {

    var newTestUser3 = new TH.UserAttributes('Wally', 'w4ly5p45sw0rd', 'wally@wally.com', '123-789-3456')
    var manual_id_user3 = undefined
    var newTestDoctor5 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'chair')
    var newTestDoctor6 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'water bottle')
    var manual_id_doctor5 = undefined
    var manual_id_doctor6 = undefined

    return TH.createUserReturnId(newTestUser3)
      .then(function(id) {
        manual_id_user3 = id

        return UserDoctor.createDoctor(newTestDoctor5, manual_id_user3, 'super primary', false)
      })
      .then(function(doctor) {
        manual_id_doctor5 = doctor.id_doctor

        expect(doctor).to.be.an('object')
        expect(TH.isValidDoctor(doctor)).to.be.true
        expect(TH.propsMatch(doctor, newTestDoctor5)).to.be.true

        return UserDoctor.createDoctor(newTestDoctor6, manual_id_user3, 'a primary', true)
      })
      .then(function(doctor) {
        manual_id_doctor6 = doctor.id_doctor

        expect(doctor).to.be.an('object')
        expect(TH.isValidDoctor(doctor)).to.be.true
        expect(TH.propsMatch(doctor, newTestDoctor6)).to.be.true

        return UserDoctor.findAllDoctors(manual_id_user3)
      })
      .then(function(allDoctors) {
        expect(allDoctors).to.be.an('array')
        expect(allDoctors).to.have.length(2)
        expect(TH.allValidDoctors(allDoctors)).to.be.true
        expect(TH.propsMatch(allDoctors[0], newTestDoctor5)).to.be.true
        expect(TH.propsMatch(allDoctors[1], newTestDoctor6)).to.be.true
        return UserDoctor.getAll()
      })
      .then(function(all) {
        expect(all).to.be.an('array')
        expect(all).to.have.length(2)
        expect(TH.propsMatch(all[0], {id_user: manual_id_user3, id_doctor: manual_id_doctor5, 
                                      type_usermade: 'super primary', current: false})).to.be.true
        expect(TH.propsMatch(all[1], {id_user: manual_id_user3, id_doctor: manual_id_doctor6, 
                                      type_usermade: 'a primary', current: true})).to.be.true
      })

  })

  it('deletes all appointments associated with a userdoctor', function() {

    var newTestUser = new TH.UserAttributes('patricia', 'bobpass123', 'bob@alice.com', '123-789-3456')
    var newTestDoctor = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '5869348594', 'primary')
    var id_doc = undefined
    var appt1 = undefined
    var appt2 = undefined

    return TH.createUserReturnId(newTestUser)
      .then(function(id) {
        return UserDoctor.createDoctor(newTestDoctor, id, 'new primary', false)
      })
      .then(function(doctor) {
        id_doc = doctor.id_doctor
        return UserDoctor.getAll()
      })
      .then( function(all) {
        expect(all).to.be.an('array')
        expect(all).to.have.length(1)
        return Appointment.createAndReturn(newTestUser.username, id_doc, {date: '08/01/2016', time: '9am'}, 'blah3')
      })
      .then(function(appt) {
        appt1 = appt
        return Appointment.createAndReturn(newTestUser.username, id_doc, {date: '06/01/2016', time: '10am'}, 'blah4')
      })
      .then(function(appt) {
        appt2 = appt
        expect(appt1.id_user_doctor).to.equal(appt2.id_user_doctor)

        return Appointment.findByUsernameAndDocId(newTestUser.username, id_doc)
      })
      .then(function(allAppts) {
        expect(allAppts).to.be.an('array')
        expect(allAppts).to.have.length(2)
        return UserDoctor.deleteUserDoctor(appt1.id_user_doctor)
      })
      .then(function() {
        return UserDoctor.getAll()
      })
      .then(function(allUserDocs) {
        expect(allUserDocs).to.have.length(0)
        return Appointment.getAll()
      })
      .then(function(appts) {
        expect(appts).to.have.length(0)
      })

  })

  it('deletes all userdoctors and appointments associated with a doctor', function() {

    var newTestUser = new TH.UserAttributes('patricia', 'bobpass123', 'bob@alice.com', '123-789-3456')
    var newTestDoctor = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '5869348594', 'primary')
    var id_doc = undefined
    var appt1 = undefined
    var appt2 = undefined

    return TH.createUserReturnId(newTestUser)
      .then(function(id) {
        return UserDoctor.createDoctor(newTestDoctor, id, 'new primary', false)
      })
      .then(function(doctor) {
        id_doc = doctor.id_doctor
        return Doctor.getAll()
      })
      .then(function(allDocs) {
        expect(allDocs).to.be.an('array')
        expect(allDocs).to.have.length(1)

        id_doc = allDocs[0].id_doctor

        return UserDoctor.getAll()
      })
      .then( function(allUserDocs) {
        expect(allUserDocs).to.be.an('array')
        expect(allUserDocs).to.have.length(1)
        return Appointment.createAndReturn(newTestUser.username, id_doc, {date: '08/01/2016', time: '9am'})
      })
      .then(function(appt) {
        appt1 = appt
        return Appointment.createAndReturn(newTestUser.username, id_doc, {date: '06/01/2016', time: '10am'})
      })
      .then(function(appt) {
        appt2 = appt
        expect(appt1.id_user_doctor).to.equal(appt2.id_user_doctor)

        return Appointment.findByUsernameAndDocId(newTestUser.username, id_doc)
      })
      .then(function(allAppts) {
        expect(allAppts).to.be.an('array')
        expect(allAppts).to.have.length(2)
        return UserDoctor.deleteDoctor(id_doc)
      })
      .then(function() {
        return Doctor.getAll()
      })
      .then(function(allDocs) {
        expect(allDocs).to.have.length(0)

        return UserDoctor.getAll()
      })
      .then(function(allUserDocs) {
        expect(allUserDocs).to.have.length(0)
        return Appointment.getAll()
      })
      .then(function(appts) {
        expect(appts).to.have.length(0)
      })

  })

}) // end describe User-Doctor Model

