const db = require('../db')
const Model = require('./model-helper')

const Pharmacy = new Model('pharmacy', ['id_pharmacy', 'id_user', 'business_name', 'address', 'phone', 'current'])
module.exports = Pharmacy


/* GET ALL BY USERID
  Takes the id of the relevant user
  Returns an array of all pharmacies associated with that user
*/
Pharmacy.getAllByUser = function(id_user) {
	return this.findByAttribute('id_user', id_user)
}

/* TOGGLE CURRENT
  Takes the id of the pharmacy
  Reverses the truth value of the 'current' record
  Returns the updated pharmacy object
*/
Pharmacy.toggleCurrent = function(id_pharmacy) {
	return this.findById(id_pharmacy)
	  .then( function(pharmacy) {
	  	var updatedVal = {current: !pharmacy.current}
	  	return Pharmacy.updateById(id_pharmacy, updatedVal)
	  })
}

