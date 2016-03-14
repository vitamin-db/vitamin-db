require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// FAMILYMEMBER MODEL NOT WRITTEN YET
const FamilyMember = require(__server + '/models/familymembers')
const User = require(__server + '/models/user')


describe('**************** Family Member Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  var UserAttributes = function(username, password, email, phone) {
    this.username = username
    this.password = password
    this.email = email
    this.phone = phone
  }

  var FamilyMemberAttributes = function(id_user, name) {
    this.id_user = id_user
    this.name = name
  }

  xit('creates a family member record', function () {

    var newTestUser1 = new UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newFamilyMember1 = new FamilyMemberAttributes(id_user1, 'Grandma Rose');

    return User.createUser(newTestUser1)
      .then( function() {
        return User.findByUsername('Betsy') 
      })
      .then( function(user) {
        id_user1 = user.id_user;
        return FamilyMember.create(newFamilyMember1); 
      })
      .then( function(result) {
        // console.log('got new family member record: ', result);
        expect(result.id_user).to.equal(id_user1)
        expect(result.name).to.equal('Grandma Rose')
      })
  })

  xit('deletes a family member record by id', function() {

    var familymember_id2 = undefined

    var newTestUser2 = new UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user2 = undefined
    var newFamilyMember2 = new FamilyMemberAttributes(id_user2, 'Uncle Pablo')

    return User.createUser(newTestUser2)
      .then( function() {
        return User.findByUsername('Ralf') 
      })
      .then( function(user) {
        id_user4 = user.id_user;
        return FamilyMember.create(newFamilyMember2); 
      })
      .then( function() { return FamilyMember.getAll() })
      .then( function(allInsurance) {
        insurance_id6 = allInsurance[0]['id_familymember']
      })
      .then( function() { 
        return FamilyMember.deleteById(familymember_id2);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return FamilyMember.findById(familymember_id2)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
