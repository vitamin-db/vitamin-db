const db = require('../db')
const Model = require('./model-helper')

const FamilyMember = new Model('familymembers', ['id_familymember', 'id_user', 'name'])
module.exports = FamilyMember


/* GET ALL BY USER
  Takes the id of the user
  Returns an array of all family members associated with the specified user
*/
FamilyMember.getAllByUser = function(id_user) {
	return this.findByAttribute('id_user', id_user)
}