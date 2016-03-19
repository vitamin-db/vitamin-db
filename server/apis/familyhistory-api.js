// handles routes that start with /eyerx

const FamilyHistory = require('../models/familyhistory')
const FamilyMember = require('../models/familymembers')
const User = require('../models/user')
const SendR = require('../sendresponse')

const FamilyHistoryAPI = require('express').Router();

module.exports = FamilyHistoryAPI

/* GET /familyhistory/:id_familymember
  Returns 200 and an array of all conditions associated with the family member specified in the URL
*/
FamilyHistoryAPI.get('/:id_familymember', function(req, res) {

	return FamilyHistory.getAllByFamilyMember(req.params.id_familymember)
	  .then(function(array) {
	  	var public = array.map( x => FamilyHistory.getPublicOb(x))
	  	SendR.resData(res, 200, public)
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error getting family member conditions', err)
	  })
})


/* POST /familyhistory
  Expects req.body.properties to equal the new object to be created
  Returns the newly created object
*/
FamilyHistoryAPI.post('/', function(req, res) {

	return FamilyHistory.create(req.body.properties)
	  .then(function() {
	  	return FamilyHistory.getMostRecentByFamilyMember(req.body.properties.id_familymember)
	  })
	  .then(function(famHist) {
	  	SendR.resData(res, 201, FamilyHistory.getPublicOb(famHist))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error posting condition', err)
	  })
})



/* PUT /familyhistory
  Expects req.body.properties to contain an object with the id_familyhistory to be updated and the properties to update
  Returns the updated object
*/
FamilyHistoryAPI.put('/', function(req, res) {

	return FamilyHistory.updateByObj(req.body.properties)
	  .then(function(updated) {
	  	SendR.resData(res, 201, FamilyHistory.getPublicOb(updated))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error updating condition', err)
	  })

})


/* DELETE /familyhistory/:id_famhist
  Deletes the object specified in the url from the database
  Returns a 200
*/
FamilyHistoryAPI.delete('/:id_famhist', function(req, res) {
	return FamilyHistory.deleteById(req.params.id_famhist)
	  .then(function() {
	  	SendR.sendStatus(res, 200)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error deleting family history record', err)
	  })
})

