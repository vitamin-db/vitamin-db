const db = require('../db')
const Model = require('./model-helper')
const FamilyMember = require(__server + '/models/familymembers')

const FamilyHistory = new Model('familyhistory', ['id_famhist', 'id_familymember', 'condition'])
module.exports = FamilyHistory


/* GET ALL BY FAMILYMEMBER
  Returns an array of all family history records corresponding to one family member
*/
FamilyHistory.getAllByFamilyMember = function(id_familymember) {
  return this.findByAttribute('id_familymember', id_familymember)
}


/* GET ALL BY USER
  Returns an array of all family history records corresponding to the user
*/

// In order to get all by user, we need to:
  // 1. Find all family members associated with a user
  // 2. For each found family member, find all conditions associated with that family member,
        // and add those records to an object to return
FamilyHistory.getAllByUser = function(id_user) {

    var allUserFamilyHistory = [];
    return FamilyMember.getAllByUser(id_user)
    // [ { id_familymember: 110, id_user: 907, name: 'Mom' },
    //   { id_familymember: 111, id_user: 907, name: 'Dad' } ]
      .then(function(familyMembers) {
        return Promise.all(
          familyMembers.forEach(function(familyMember) { // cycle through each returned family member
            console.log('familyMember in loop: ', familyMember)
            return FamilyHistory.getAllByFamilyMember(familyMember.id_familymember) // get condition history for each family member
              .then(function(conditions) { // where records is the list of conditions associated with the family member
                conditions.forEach(function(condition) { // cycle through each condition
                  console.log('condition in loop: ', condition)
                  allUserFamilyHistory.push(condition);
                  console.log('allUserFamilyHistory in loop: ', allUserFamilyHistory)
                }) // end conditions.forEach
              }) // end then(conditions)
          }) // end familyMembers.forEach
        )
      }) //close .then(familyMembers)
    console.log('allUserFamilyHistory: ', allUserFamilyHistory)
    return allUserFamilyHistory
}

// FamilyMember.getAllByUser = function(id_user)
  // returns:
    // [ { id_familymember: 110, id_user: 907, name: 'Mom' },
    //   { id_familymember: 111, id_user: 907, name: 'Dad' } ]



