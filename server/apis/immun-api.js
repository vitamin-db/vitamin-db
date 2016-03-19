// handles routes that start with /allergy

const Immun = require('../models/immun')
const User = require('../models/user')
const SendR = require('../sendresponse')

const ImmunAPI = require('express').Router();

module.exports = ImmunAPI

/* GET /immun
  Returns an array of all immunizations matching the user
*/
ImmunAPI.get('/', function(req, res) {

	return User.findByUsername( req.decoded.username )
	  .then(function(user) {
	    return Immun.getAllByUser(user.id_user) // takes id_user
	  })
	  .then(function(allImmun) {
	  	var publicImmuns = allImmun.map( immun => Immun.getPublicOb(immun))
	  	SendR.resData(res, 200, publicImmuns)
	  })
	  .catch( function(err) {
	    SendR.error(res, 500, 'Server error getting immunization records', err)
	  })
})

/* POST /immun
    In the body of the request, takes an object with all the new immunization attributes 
    except id (will automatically generate the primary key) and id_user (which will be added based on the token)

  The immun object should be in req.body.properties

  On a successful post, returns the newly created object with a 201 code
*/
ImmunAPI.post('/', function(req, res) {

	return Immun.packageCreateReturn(req.decoded.username, req.body.properties)
	  .then(function(newOb) {
	  	SendR.resData(res, 201, Immun.getPublicOb(newOb))
	  })
	  .catch(function(err) {
	  	SendR.error(res, 500, 'Server error posting immunization records', err)
	  })
})

/* PUT /immun
  In req.body.properties, put the id_immun to be updated and the attributes to be updated
  On success, returns 201 and the updated object
*/
ImmunAPI.put('/', function(req, res) {

	return Immun.updateByObj(req.body.properties)
	  .then(function(updated) {
	  	SendR.resData(res, 201, Immun.getPublicOb(updated))
	  })
	  catch(function(err) {
	  	SendR.error(res, 500, 'Server error updated immunization records', err)
	  })
})

/* DELETE /immun/:id_immun
  Deletes the immunzatoin record corresponding to the id in the url
  On a success, returns 200
*/
ImmunAPI.delete('/:id_immun', function(req, res) {

	return Immun.deleteById(req.params.id_immun)
	  .then(function() {
	  	SendR.sendStatus(res, 200)
	  })
	  .catch(function(err) {
	  	SendR.error(res, 500, 'Server error deleting immunization record', err)
	  })
})



