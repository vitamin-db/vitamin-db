require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

const TH = require(__test + '/test-helper')

const Immun = require(__server + '/models/immun')
const User = require(__server + '/models/user')


describe('**************** Immunization Model ****************', function() {

  before(function() {
    return db.deleteEverything()
  })

  var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
  var id_user1 = undefined
  var newTestUser2 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
  var id_user2 = undefined
  var imm1 = undefined
  var id_imm1 = undefined
  var imm2
  var id_imm2 = undefined

  it('creates a new immunization record', function() {
  	return TH.createUserReturnId(newTestUser1)
  	  .then(function(id) {
  	  	id_user1 = id
  	  	imm1 = new TH.ImmunAttributes(id_user1, '2003-11-04', 'pox', 'need booster in 10 years')
  	  	return Immun.create(imm1)
  	  })
  	  .then( function() {
  	  	return TH.createUserReturnId(newTestUser2)
  	  })
  	  .then(function(id) {
  	  	id_user2 = id
  	  	imm2 = new TH.ImmunAttributes(id_user2, '1986-03-23', 'mumps', 'needs booster 3 yrs')
  	  	return Immun.create(imm2)
  	  })
  	  .then(function() {
  	  	return Immun.getAll()
  	  })
  	  .then(function(all) {
  	  	id_imm1 = all[0].id_immun
  	  	id_imm2 = all[1].id_immun

  	  	expect(all).to.be.an('array')
  	  	expect(all).to.have.length(2)
  	  	expect(all[0]).to.be.an('object')
  	  	expect(all[1]).to.be.an('object')
  	  	expect(TH.isValidImmun(all[0])).to.be.true
  	  	expect(TH.isValidImmun(all[1])).to.be.true
  	  	expect(TH.propsMatch(all[0], imm1)).to.be.true
  	  	expect(TH.propsMatch(all[1], imm2)).to.be.true
  	  })
  })

  it('retrieves all immunization records associated with a user', function() {
  	return Immun.getAllByUser(id_user2)
  	  .then(function(result) {
  	  	expect(result).to.be.an('array')
  	  	expect(result).to.have.length(1)
  	  	expect(TH.isValidImmun(result[0])).to.be.true
  	  	expect(TH.propsMatch(result[0], imm2)).to.be.true
  	  })
  })

  it('retrieves an immunization record by id', function() {
  	return Immun.findById(id_imm1)
  	  .then(function(immun) {
  	  	expect(immun).to.be.an('object')
  	  	expect(TH.isValidImmun(immun)).to.be.true
  	  	expect(TH.propsMatch(immun, imm1)).to.be.true
  	  })
  })

  it('deletes an immunization record by id', function() {
  	return Immun.deleteById(id_imm1)
  	  .then(function(deleted) {
  	  	expect(deleted).to.equal(1)
  	  	return Immun.findById(id_imm1)
  	  })
  	  .then(function(immun) {
  	  	expect(immun).to.be.an('undefined')
  	  })
  })

  it('updates an immunization record by object passed in', function() {
  	var updateOb = {id_immun: id_imm2, notes: 'schedule for next year(2017)'}
  	var returnedResult = undefined

  	return Immun.updateByObj(updateOb)
    .then(function(result) {
    	returnedResult = result

    	expect(result).to.be.an('object')
    	expect(TH.isValidImmun(result)).to.be.true
    	expect(TH.propsMatch(result, imm2)).to.be.false
    	expect(result.notes).to.equal(updateOb.notes)
    	expect(result.type).to.equal(imm2.type)
    	return Immun.findById(id_imm2)
    })
    .then(function(immun) {
    	expect(TH.propsMatch(immun, imm2)).to.be.false
    	expect(TH.propsMatch(immun, updateOb)).to.be.true
    })

  })


})