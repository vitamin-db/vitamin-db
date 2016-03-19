// handles routes that start with /familymember

const FamilyMember = require('../models/familymembers')
const User = require('../models/user')
const SendR = require('../sendresponse')

const FamilyMemberAPI = require('express').Router();

module.exports = FamilyMemberAPI

/*
GET /familymember
  Returns all familymember records
*/
FamilyMemberAPI.get('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      return FamilyMember.getAllByUser(user.id_user) // takes id_user
    })
    .then(function(familymember) { // returned array of familymember objects
      SendR.resData(res, 200, familymember)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error getting familymember records', err)
    })
})


/*
POST /familymember
  In the body of the request, takes an object with all the new familymember attributes except id (will automatically
  generate the primary key)

  The familymember object should be in req.body.properties

  On a successful post, returns the newly created object with a 201 code

  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
  (THIS IS IMPORTANT)
*/
FamilyMemberAPI.post('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      var attrs = {id_user: user.id_user}
      for (var prop in req.body.properties) {
        console.log('body prop', prop)
        attrs[prop] = req.body.properties[prop]
      }
      return FamilyMember.createFamilyMemberReturnObj(attrs)
    })
    .then(function(created) {
      console.log('created familymember: ', created);
      SendR.resData(res, 201, created)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error posting new familymember record', err)
    })

})

/*
PUT /familymember
  * In the body of the request, takes an object with:
    1) the id_familymember property equal to that of the familymember record to be updated
    2) the attributes to be updated with their new values
  
  * On a successful post, it returns the full updated object with a 201 code
  * There should be no unsuccessful posts (outside of server errors) because of client-side input checking
    (THIS IS IMPORTANT)
*/
FamilyMemberAPI.put('/', function(req, res) {

  return FamilyMember.updateByObj(req.body.properties)
    .then(function(updated) {
      SendR.resData(res, 201, updated)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error updating familymember record', err)
    })

})

/*
DELETE /familymember
  In the body of the request, takes an object with the id_familymember property equal to the record to be deleted
  Returns a 200 code on a successful delete
*/
FamilyMemberAPI.delete('/:id_familymember', function(req, res) {

  return FamilyMember.deleteById(req.params.id_familymember)
    .then(function() {
      SendR.sendStatus(res, 200)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error deleting familymember record', err)
    })

})

