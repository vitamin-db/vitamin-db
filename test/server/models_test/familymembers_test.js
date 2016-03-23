const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')


const FamilyMember = require(__server + '/models/familymembers')
const User = require(__server + '/models/user')


xdescribe('**************** Family Member Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })


  it('creates a family member record and finds it by id', function () {

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
    var newFamilyMember1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(id) {
        newFamilyMember1 = new TH.FamilyMemberAttributes(id, 'Grandma Rose')
        return TH.createFamilyMemberReturnId(newFamilyMember1)
      })
      .then( function(id) {
        return FamilyMember.findById(id)
      })
      .then( function(fam) {
        expect(TH.isValidFamilyMember(fam)).to.be.true
        expect(TH.propsMatch(fam, newFamilyMember1)).to.be.true
      })
  })

  it('deletes a family member record by id', function() {

    var familymember_id2 = undefined

    var newTestUser2 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456')
    var newFamilyMember2 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then(function(id) {
        newFamilyMember2 = new TH.FamilyMemberAttributes(id, 'Uncle Pablo')
        return TH.createFamilyMemberReturnId(newFamilyMember2)
      })
      .then(function(id) {
        familymember_id2 = id

        return FamilyMember.getAll()
      })
      .then( function(all) {
        expect(all).to.be.an('array')
        expect(all).to.have.length(1)

        return FamilyMember.deleteById(familymember_id2)
      })
      .then(function(deletedRecords) {
        expect(deletedRecords).to.equal(1)
        return FamilyMember.findById(familymember_id2)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
        return FamilyMember.getAll()
      })
      .then(function(all) {
        expect(all).to.be.an('array')
        expect(all).to.have.length(0)
      })

  })  

  it('finds all family members associated with a particular user', function() {

    var newTestUser3 = new TH.UserAttributes('Mary Jo Bob', 'passwordy', 'mjb@mjb.com', '345-234-4572')
    var user_id3 = undefined

    var newFamilyMember3 = undefined
    var newFamilyMember4 = undefined

    return TH.createUserReturnId(newTestUser3)
      .then( function(id) {
        user_id3 = id

        newFamilyMember3 = new TH.FamilyMemberAttributes(user_id3, 'Mom')
        return TH.createFamilyMemberReturnId(newFamilyMember3)
      })
      .then(function(id) {
        newFamilyMember4 = new TH.FamilyMemberAttributes(user_id3, 'Dad')
        return TH.createFamilyMemberReturnId(newFamilyMember4)
      })
      .then(function(id) {
        return FamilyMember.getAllByUser(user_id3) //we need to write this
      })
      .then(function(family) {
        console.log('all family by user: ', family)
        expect(family).to.be.an('array')
        expect(family).to.have.length(2)
        expect(TH.allValidFamilyMembers(family)).to.be.true
        expect(TH.propsMatch(family[0], newFamilyMember3)).to.be.true
        expect(TH.propsMatch(family[1], newFamilyMember4)).to.be.true
      })


  })

})
