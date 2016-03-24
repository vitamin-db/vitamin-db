// handles routes that start with /rx

const Rx = require('../models/rx')
const User = require('../models/user')
const SendR = require('../sendresponse')

const RxAPI = require('express').Router();

module.exports = RxAPI


/* GET /rx
  Returns an array of all prescriptions associated with the user
*/
RxAPI.get('/', function(req, res) {
	return User.findByUsername( req.decoded.username )
	  .then(function(user) {
	    return Rx.getAllByUser(user.id_user)
	  })
	  .then(function(rxArray) {
	  	var public = rxArray.map( rx => Rx.getPublicOb(rx))
	    SendR.resData(res, 200, public)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error getting rx records', err)
	  })
})


/* POST /rx
  Creates the rx specified in the properties key in the body
  Returns 200 and the rx
  If the refill number is not an integer or parsable to an integer:
  - Returns 400 
  - Returns an error with message: 'Please enter a refill number'
  VERY IMPORTANT: The doctor and pharmacy must be selected via drop-down menu - otherwise, the foreign keys will break this
*/
RxAPI.post('/', function(req, res) {

	return User.findByUsername( req.decoded.username )
	  .then(function(user) {
	  	var rx = req.body.properties
	  	rx.id_user = user.id_user
	  	return Rx.createAndReturn(rx)
	  })
	  .then(function(newRx) {
	  	SendR.resData(res, 201, Rx.getPublicOb(newRx))
	  })
	  .catch( function(err) {
	  	if (err.message === 'Please enter a valid refill number') {
	  		SendR.error(res, 400, err.message, err)
	  	} else {
	  		SendR.error(res, 500, 'Server error posting rx', err)
	  	}
	  })
})

/* PUT /rx
  Updates the rx based on the res.body.properties
    >> res.body.properties.id_rx specifies the prescription to be updated
    >> res.body.properties will also contain the updated elements
  Returns the updated object
  If the refill number is not an integer or parsable to an integer:
  - Returns 400 
  - Returns an error with message: 'Please enter a refill number'
*/
RxAPI.put('/', function(req, res) {

	return Rx.updateAndReturn(req.body.properties)
	  .then(function(updated) {
	    SendR.resData(res, 201, Rx.getPublicOb(updated))
	  })
	  .catch( function(err) {
	  	if (err.message === 'Please enter a valid refill number') {
	  		SendR.error(res, 400, err.message, err)
	  	} else {
		    SendR.error(res, 500, 'Server error updating prescription record', err)
	    }
	  })
})


/* DELETE /rx/:id_rx
  Deletes the prescription specified in the url
  Returns a 200 on success
*/
RxAPI.delete('/:id_rx', function(req, res) {

	return Rx.deleteById(req.params.id_rx)
	  .then(function() {
	    SendR.sendStatus(res, 200)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error deleting prescription record', err)
	  })

})







