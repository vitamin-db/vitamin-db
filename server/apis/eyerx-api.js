// handles routes that start with /eyerx

const EyeRx = require('../models/eyerx')
const User = require('../models/user')
const SendR = require('../sendresponse')

const EyeRxAPI = require('express').Router();

module.exports = EyeRxAPI

/* 
GET /eyerx
  Returns an object corresonding to the current prescription
*/
EyeRxAPI.get('/', function(req, res) {

	return User.findByUsername( req.decoded.username)
	  .then(function(user) {
	  	return EyeRx.getCurrentByUser(user.id_user)
	  })
	  .then(function(eyerx) {
	  	SendR.resData(res, 200, eyerx)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error getting current eyerx', err)
	  })
})



/*
POST /eyerx
  In the body of the request, takes an object with all the EyeRx attributes except id and current
    (it will automatically generate the primary key and set current to true)
    This EyeRx object should be in req.body.properties
  On a successful post, returns the newly created object with a 201 code
  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
    (THIS IS IMPORTANT)
*/
EyeRxAPI.post('/', function(req, res) {
	console.log('req body in post', req.body.properties)

	return User.findByUsername( req.decoded.username)
	  .then(function(user) {
	  	var attrs = {id_user: user.id_user}
	  	for (var prop in req.body.properties) {
	  		console.log('body prop', prop)
	  		attrs[prop] = req.body.prop
	  	}
	  	return EyeRx.createEyeRx(attrs)
	  })
	  .then(function(created) {
	  	SendR.resData(res, 201, created)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error posting eyerx', err)
	  })

})


/*
PUT /eyerx
  In the body of the request, takes an object with 1) the id_eyerx property equal to that of hte prescription to be updated
                                      and 2) the attributes to be updated with their new values
  On a successful post, returns the full updated object with a 201 code
  There should be no unsuccessful posts (outside of server errors) because of client-side input checking
    (THIS IS IMPORTANT)
*/
EyeRxAPI.put('/', function(req, res) {
	console.log('req body in put', req.body.properties)

	return EyeRx.updateByObj(req.body.properties)
	  .then(function(updated) {
	  	SendR.resData(res, 201, updated)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error updating eyerx', err)
	  })

})


/*
DELETE /eyerx
  In the body of the request, takes an object with the id_eyerx property equal to the record to be deleted
  Returns a 200 code on a successful delete
*/



