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
      SendR.error(res, 500, 'Server error getting allergy records', err)
    })
})
