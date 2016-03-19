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
	  	console.log('successful creation, looking for id', req.body.properties.id_familymember)
	  	return FamilyHistory.getMostRecentByFamilyMember(req.body.properties.id_familymember)
	  })
	  .then(function(famHist) {
	  	console.log('got back from get all by family member id', famHist)
	  	SendR.resData(res, 201, FamilyHistory.getPublicOb(famHist))
	  })
	  .catch( function(err) {
	  	SendR.error(res, 500, 'Server error posting condition', err)
	  })
})