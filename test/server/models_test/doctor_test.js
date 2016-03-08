require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const User = require(__server + '/models/doctor')


describe('Doctor Model', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

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

  it('inserts doctor', function () {

  })

  it('retrieves all doctor data', function() {

  })

  it('retrieves a doctor by id', function() {

  })

  it('deletes a doctor', function() {

  })

})

