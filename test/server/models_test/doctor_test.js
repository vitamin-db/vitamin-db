const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const Doctor = require(__server + '/models/doctor')


describe('**************** Doctor Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  it('inserts doctor', function () {

    var newTestDoctor = new TH.DoctorAttributes('Dr. Smith', '123 Main Street', 'Austin', 'TX', 12345, 'doc@smith.com', 'docsmith.com', '1233839292', 'primary')

    return TH.createDoctorReturnDoctor(newTestDoctor)
      .then(function(doctor) {
        expect( TH.isValidDoctor(doctor) ).to.be.true
        expect( TH.propsMatch(doctor, newTestDoctor) ).to.be.true
      })
  })

  it('retrieves all doctor data', function() {
    var newTestDoctor2 = new TH.DoctorAttributes('Dr. Walker', '125 Walnut Street', 'Austin', 'TX', 78751, 'doc@walker.com', 'docwalker.com', '1234567890', 'primary')
    var newTestDoctor3 = new TH.DoctorAttributes('Dr. Rando', '3495 Avenue B', 'Austin', 'TX', 32532, 'doc@rando.com', 'docrando.com', '0987654321', 'hypnotist')

    return Doctor.create(newTestDoctor2)
      .then( function() { return Doctor.create(newTestDoctor3) })
      .then( function() { return Doctor.getAll() })
      .then( function(allDoctors) {
        expect(allDoctors).to.have.length(2)
        expect( TH.isValidDoctor(allDoctors[0]) ).to.be.true
        expect( TH.isValidDoctor(allDoctors[1]) ).to.be.true
        expect( TH.propsMatch(allDoctors[0], newTestDoctor2) ).to.be.true
        expect( TH.propsMatch(allDoctors[1], newTestDoctor3) ).to.be.true
      })

  })

  it('retrieves a doctor by name', function() {
    var newTestDoctor4 = new TH.DoctorAttributes('Dr. Rick', '4563 First Street', 'Austin', 'TX', 78751, 'doc@rick.com', 'docrick.com', '1234567890', 'therapist')
    
    return Doctor.create(newTestDoctor4)
      .then( function() { 
        return Doctor.findByName( newTestDoctor4.name ) 
      })
      .then( function(doctor) {
        expect( TH.isValidDoctor(doctor) ).to.be.true
        expect( TH.propsMatch(doctor, newTestDoctor4) ).to.be.true
      })
  })

  it('retrieves a doctor by id', function() {

    // Note: Assigned after the db entries are created
    var testDoctorId4 = undefined
    var testDoctorId5 = undefined

    var newTestDoctor4 = new TH.DoctorAttributes('Dr. Rick', '4563 First Street', 'Austin', 'TX', 78751, 'doc@rick.com', 'docrick.com', '1234567890', 'therapist')
    var newTestDoctor5 = new TH.DoctorAttributes('Dr. Martha', '3532 Halloway Drive', 'Austin', 'TX', 23532, 'marthadoc@practice.com', 'marthadoc.com', '2349350293', 'dentist')

    return Doctor.create(newTestDoctor4)
      .then( function() { return Doctor.create(newTestDoctor5) })
      .then( function() { return Doctor.getAll() })
      .then( function(allDoctors) {

        //set id variables to test
        testDoctorId4 = allDoctors[0]['id_doctor']
        testDoctorId5 = allDoctors[1]['id_doctor']

        return Doctor.findById(testDoctorId4)
      })
      .then( function(doctor) {
        expect( TH.isValidDoctor(doctor) ).to.be.true
        expect( TH.propsMatch(doctor, newTestDoctor4) ).to.be.true

        return Doctor.findById(testDoctorId5)
     })
    .then( function(doctor) {
        expect( TH.isValidDoctor(doctor) ).to.be.true
        expect( TH.propsMatch(doctor, newTestDoctor5) ).to.be.true
    })
  })

  it('deletes a doctor', function() {
    // Note: assigned after the db entries are created
    var testDoctorId6 = undefined
    var testDoctorId7 = undefined

    var newTestDoctor6 = new TH.DoctorAttributes('Dr. Kinney', '1292 Wandering Drive', 'Dallas', 'TX', 23948, 'wanderpractice@gmail.com', 'wanderpractice.com', '2938493049', 'homepathic specialist')
    var newTestDoctor7 = new TH.DoctorAttributes('Dr. Namaste', '09238 Bell Lane', 'Austin', 'TX', 93832, 'nama@stay.com', 'namastay.com', '3940399922', 'life coach')

    return TH.createDoctorReturnId(newTestDoctor6)
      .then( function(id) {
        testDoctorId6 = id

        return TH.createDoctorReturnId(newTestDoctor7)
      })
      .then( function(id) {
        testDoctorId7 = id

        return Doctor.deleteById(testDoctorId7)
      })
      .then( function(recordsDeleted) {
        expect(recordsDeleted).to.equal(1)

        return Doctor.findById(testDoctorId7)
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')

        return Doctor.getAll()
      })
      .then( function(allDoctors) {
        expect(allDoctors).to.have.length(1)
      })

  })

})

