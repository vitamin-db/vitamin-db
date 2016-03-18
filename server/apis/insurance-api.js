// handles routes that start with /insurance

const Insurance = require('../models/insurance')
const User = require('../models/user')
const SendR = require('../sendresponse')

const InsuranceAPI = require('express').Router();

module.exports = InsuranceAPI

/*
GET /insurance
  Returns all insurance records
*/
InsuranceAPI.get('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      return Insurance.getAllByUser(user.id_user) // takes id_user
    })
    .then(function(insurance) { // returned array of insurance objects
      // console.log('insurance: ', insurance);
      SendR.resData(res, 200, insurance)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error getting insurance records', err)
    })
})

/*
POST /insurance
  In the body of the request, takes an object with all the new insurance attributes except id (will automatically
  generate the primary key)

  The insurance object should be in req.body.properties

  On a successful post, returns the newly created object with a 201 code

  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
  (THIS IS IMPORTANT)
*/
InsuranceAPI.post('/', function(req, res) {

  return User.findByUsername( req.decoded.username )
    .then(function(user) {
      var attrs = {id_user: user.id_user}
      for (var prop in req.body.properties) {
        console.log('body prop', prop)
        attrs[prop] = req.body.properties[prop]
      }
      console.log('attrs in Insurance POST: ', attrs)
      return Insurance.createInsuranceReturnObj(attrs)
    })
    .then(function(created) {
      console.log('created insurance: ', created);
      //need to find the newly created object and return it
      SendR.resData(res, 201, created)
    })
    .catch( function(err) {
      SendR.error(res, 500, 'Server error posting new insurance record', err)
    })

})

