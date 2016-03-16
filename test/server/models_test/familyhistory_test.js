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


  xit('creates a familyhistory record and finds it by id', function () {

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
        return FamilyHistory.findById(id)
      })
      .then( function(familyhistory) {
        expect(familyhistory).to.be.an('object')
        expect( TH.isValidFamilyHistory(familyhistory) ).to.be.true
        expect( TH.propsMatch(familyhistory, newFamilyHistory1) ).to.be.true
      })
  })

  xit('deletes a family history record by id', function() {

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

  xit('finds all family history records with a particular user', function() {

    /*
    
    
    */


  })

})
