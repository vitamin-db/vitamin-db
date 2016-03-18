// handles routes that start with /pharmacy

const Pharmacy = require('../models/pharmacy')
const User = require('../models/user')
const SendR = require('../sendresponse')

const PharmacyAPI = require('express').Router();

module.exports = PharmacyAPI

/* 
GET /pharmacy
  Returns all pharmacy records
*/
PharmacyAPI.get('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      return Pharmacy.getAllByUser(user.id_user) // takes id_user
    })
    .then(function(pharmacy) { // returned array of pharmacy objects
      // console.log('pharmacy: ', pharmacy);
      SendR.resData(res, 200, pharmacy)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error getting pharmacy records', err)
    })
})

/*
POST /pharmacy
  In the body of the request, takes an object with all the new Pharmacy attributes except id (will automatically 
  generate the primary key)

  The pharmacy object should be in req.body.properties

  On a successful post, returns the newly created object with a 201 code
  
  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
  (THIS IS IMPORTANT)
*/
PharmacyAPI.post('/', function(req, res) {

  return User.findByUsername( req.decoded.username)
    .then(function(user) {
      var attrs = {id_user: user.id_user}
      for (var prop in req.body.properties) {
        console.log('body prop', prop)
        attrs[prop] = req.body.properties[prop]
      }
      return Pharmacy.create(attrs)
    })
    .then(function(created) {
      console.log('created pharma: ', created);
      SendR.resData(res, 201, created)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error posting new pharmacy', err)
    })

})


/*
PUT /pharmacy
  * In the body of the request, takes an object with:
    1) the id_pharmacy property equal to that of the pharmacy record to be updated
    2) the attributes to be updated with their new values
  
  * On a successful post, it returns the full updated object with a 201 code
  * There should be no unsuccessful posts (outside of server errors) because of client-side input checking
    (THIS IS IMPORTANT)
*/
PharmacyAPI.put('/', function(req, res) {

  return Pharmacy.updateByObj(req.body.properties)
    .then(function(updated) {
      SendR.resData(res, 201, updated)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error updating pharmacy record', err)
    })

})


/*
DELETE /pharmacy
  In the body of the request, takes an object with the id_pharmacy property equal to the record to be deleted
  Returns a 200 code on a successful delete
*/
PharmacyAPI.delete('/:id_pharmacy', function(req, res) {

  return Pharmacy.deleteById(req.params.id_pharmacy)
    .then(function() {
      SendR.sendStatus(res, 200)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error deleting pharmacy record', err)
    })

})

























