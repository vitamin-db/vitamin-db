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

/*
POST /allergy
  In the body of the request, takes an object with all the new allergy attributes except id (will automatically
  generate the primary key)

  The allergy object should be in req.body.properties

  On a successful post, returns the newly created object with a 201 code

  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
  (THIS IS IMPORTANT)
*/
AllergyAPI.post('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      var attrs = {id_user: user.id_user}
      for (var prop in req.body.properties) {
        console.log('body prop', prop)
        attrs[prop] = req.body.properties[prop]
      }
      console.log('attrs in allergy POST: ', attrs)
      return Allergy.createAllergyReturnObj(attrs)
    })
    .then(function(created) {
      console.log('created allergy: ', created);
      //need to find the newly created object and return it
      SendR.resData(res, 201, created)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error posting new allergy record', err)
    })

})





