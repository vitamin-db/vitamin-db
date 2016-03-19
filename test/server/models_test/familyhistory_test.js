const TH = require(__test + '/test-helper')

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// FAMILYMEMBER MODEL NOT WRITTEN YET
const FamilyMember = require(__server + '/models/familymembers')
const FamilyHistory = require(__server + '/models/familyhistory')
const User = require(__server + '/models/user')

/*
Functions we need to write:
- FamilyMember.getAllByUser(id_user)
 >> returns an array of all family members corresponding to id_user
*/

/*

Functions written: 
- FamilyMember.getAllByUser(id_user)
 >> returns an array of all family members corresponding to id_user

Functions to write:
- FamilyHistory.getAllByFamilyMember(id_familymember)
 >> returns an array of all family history records corresponding to one family member (id_familymember)

- Ultimately:
 >> need to write a function that will take teh array output of FamilyMember.getAllByUser, and map over it to
    include the data gathered from FamilyHistory.getAllByFamilyMember, resulting in 'condition' information
    being included in the main user info object returned to the client

 /user GET

 main obj: {
    userprop: [{}, {}, {}, ...]
    doctors: [{}, {}, {}, ...]
    family: [{
      name:
      id:
      conditions: [ , , ,] <<<=//
    }]

 }

*/



xdescribe('**************** Family History Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })


  it('creates a familyhistory record and finds it by id', function () {

    var famhist_id1 = undefined;

    var newTestUser1 = new TH.UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456')
    var newFamilyMember1 = undefined
    var newFamilyHistory1 = undefined

    return TH.createUserReturnId(newTestUser1)
      .then( function(id_user) {
        newFamilyMember1 = new TH.FamilyMemberAttributes(id_user, 'Grandma Rose')
        return TH.createFamilyMemberReturnId(newFamilyMember1)
      })
      .then( function(id_familymember) {
        newFamilyHistory1 = new TH.FamilyHistoryAttributes(id_familymember, 'Arthritis')
        return TH.createFamilyHistoryReturnId(newFamilyHistory1)
      })
      .then( function(id) {
        famhist_id1 = id
        console.log('famhist_id1', famhist_id1)
        return FamilyHistory.findById(famhist_id1)
      })
      .then( function(familyhistory) {
        console.log('familyhistory: ', familyhistory)
        expect(familyhistory).to.be.an('object')
        expect( TH.isValidFamilyHistory(familyhistory) ).to.be.true
        expect( TH.propsMatch(familyhistory, newFamilyHistory1) ).to.be.true
      })
  })

  it('deletes a family history record by id', function() {

    var familymember_id2 = undefined,
    familyhistory_id2 = undefined

    var newTestUser2 = new TH.UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456')
    var newFamilyMember2 = undefined
    var newFamilyHistory2 = undefined

    return TH.createUserReturnId(newTestUser2)
      .then(function(id) {
        newFamilyMember2 = new TH.FamilyMemberAttributes(id, 'Uncle Pablo')
        return TH.createFamilyMemberReturnId(newFamilyMember2)
      })
      .then(function(id) {
        familymember_id2 = id
        newFamilyHistory2 = new TH.FamilyHistoryAttributes(familymember_id2, 'Heart Disease')
        return TH.createFamilyHistoryReturnId(newFamilyHistory2);
      })
      .then(function(id) {
        familyhistory_id2 = id
        return FamilyHistory.deleteById(familyhistory_id2)
      })
      .then(function(deletedRecords){
        expect(deletedRecords).to.equal(1)
        return FamilyHistory.findById(familyhistory_id2)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })

  }) 

  it('retrieves all family history records associated with a particular family member', function() {

    var newTestUser3 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
    var id_user3 = undefined

    var newFamilyMember3 = undefined
    var familymember_id3 = undefined

    var newFamilyHistory3 = undefined
    var newFamilyHistory4 = undefined

    return TH.createUserReturnId(newTestUser3)
      .then(function(id) {
        newFamilyMember3 = new TH.FamilyMemberAttributes(id, 'Uncle Jerry')
        return TH.createFamilyMemberReturnId(newFamilyMember3)
      })
      .then(function(id) {
        familymember_id3 = id
        newFamilyHistory3 = new TH.FamilyHistoryAttributes(familymember_id3, 'Pancreatic cancer')
        return TH.createFamilyHistoryReturnId(newFamilyHistory3);
      })
      .then(function(id) {
        newFamilyHistory4 = new TH.FamilyHistoryAttributes(familymember_id3, 'Osteoporosis')
        return TH.createFamilyHistoryReturnId(newFamilyHistory4);
      })
      .then( function() {
        return FamilyHistory.getAllByFamilyMember(familymember_id3)
      })
      .then( function(allByFamilyMember) {
        console.log('allByFamilyMember: ', allByFamilyMember)
        console.log('newFamilyHistory3: ', newFamilyHistory3)
        console.log('newFamilyHistory4: ', newFamilyHistory4)
        expect(allByFamilyMember).to.be.an('array')
        expect(allByFamilyMember).to.have.length(2)
        expect(TH.allValidFamilyHistory(allByFamilyMember)).to.be.true
        expect(TH.propsMatchExceptMaybeCurrent(allByFamilyMember[0], newFamilyHistory3)).to.be.true
        expect(TH.propsMatchExceptMaybeCurrent(allByFamilyMember[1], newFamilyHistory4)).to.be.true
      })
  }) 

  it('finds all family history records with a particular user', function() {
    var newTestUser4 = new TH.UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456')
    var id_user4 = undefined

    var newFamilyMember4 = undefined, newFamilyMember5 = undefined
    var familymember_id4 = undefined, familymember_id5 = undefined

    var newFamilyHistory5 = undefined
    var newFamilyHistory6 = undefined
    var newFamilyHistory7 = undefined
    var newFamilyHistory8 = undefined

    return TH.createUserReturnId(newTestUser4) // CREATE USER
      .then(function(id) {
        id_user4 = id;
        newFamilyMember4 = new TH.FamilyMemberAttributes(id, 'Uncle Jerry')
        return TH.createFamilyMemberReturnId(newFamilyMember4)
      })
      .then(function(id) {
        familymember_id4 = id
        newFamilyMember5 = new TH.FamilyMemberAttributes(id_user4, 'Uncle Pablo')
        return TH.createFamilyMemberReturnId(newFamilyMember5)
        })
      .then(function(id) {
        familymember_id5 = id
        newFamilyHistory5 = new TH.FamilyHistoryAttributes(familymember_id4, 'Pancreatic cancer')
        return TH.createFamilyHistoryReturnId(newFamilyHistory5);
      })
      .then(function() {
        newFamilyHistory6 = new TH.FamilyHistoryAttributes(familymember_id4, 'Heart disease')
        return TH.createFamilyHistoryReturnId(newFamilyHistory6);
      })
      .then(function() {
        newFamilyHistory7 = new TH.FamilyHistoryAttributes(familymember_id5, 'Osteoporosis')
        return TH.createFamilyHistoryReturnId(newFamilyHistory7);
      })
      .then(function() {
        newFamilyHistory8 = new TH.FamilyHistoryAttributes(familymember_id5, 'Bone Cancer')
        return TH.createFamilyHistoryReturnId(newFamilyHistory8);
      })
      .then(function() {
        return FamilyHistory.getAllByUser(id_user4);
      })
      .then(function(allHistory) {
        console.log('all family history by user: ', allHistory)
        expect(allHistory).to.be.an('array')
        expect(allHistory).to.have.length(4)
      })



  })

})
