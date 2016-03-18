// handles routes that start with /allergy

const Allergy = require('../models/allergy')
const User = require('../models/user')
const SendR = require('../sendresponse')

const AllergyAPI = require('express').Router();

module.exports = AllergyAPI

/*
GET /allergy
  Returns all allergy records
*/
AllergyAPI.get('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      console.log('ima user?', user)
      return Allergy.getAllByUser(user.id_user) // takes id_user
    })
    .then(function(allergy) { // returned array of allergy objects
      // console.log('allergy: ', allergy);
      SendR.resData(res, 200, allergy)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error getting allergy records', err)
    })
})
