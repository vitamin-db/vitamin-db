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
      return Allergy.getAllByUser(user.id_user) // takes id_user
    })
    .then(function(allergy) { // returned array of allergy objects
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
      return Allergy.createAllergyReturnObj(attrs)
    })
    .then(function(created) {
      console.log('created allergy: ', created);
      SendR.resData(res, 201, created)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error posting new allergy record', err)
    })

})

/*
PUT /allergy
  * In the body of the request, takes an object with:
    1) the id_allergy property equal to that of the allergy record to be updated
    2) the attributes to be updated with their new values
  
  * On a successful post, it returns the full updated object with a 201 code
  * There should be no unsuccessful posts (outside of server errors) because of client-side input checking
    (THIS IS IMPORTANT)
*/
AllergyAPI.put('/', function(req, res) {

  return Allergy.updateByObj(req.body.properties)
    .then(function(updated) {
      SendR.resData(res, 201, updated)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error updating allergy record', err)
    })

})

/*
DELETE /allergy
  In the body of the request, takes an object with the id_allergy property equal to the record to be deleted
  Returns a 200 code on a successful delete
*/
AllergyAPI.delete('/:id_allergy', function(req, res) {

  return Allergy.deleteById(req.params.id_allergy)
    .then(function() {
      SendR.sendStatus(res, 200)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error deleting allergy record', err)
    })

})



