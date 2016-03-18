const db = require('../db')
const Model = require('./model-helper')

const Allergy = new Model('allergies', ['id_allergy', 'id_user', 'allergen', 'current'])
module.exports = Allergy


/* GET ALL BY USER
  Takes the id of the user
  Returns an array of all allergy records associated with the specified user
*/
Allergy.getAllByUser = function(id_user) {
  return this.findByAttribute('id_user', id_user)
}

Allergy.createAllergyReturnObj = function(allergyAttrs) {
  return Allergy.create(allergyAttrs)
    .then(function(attrs) {
      return db.select('*').from('allergies').where(attrs)
    })
    .then(function(allMatching) {
      return allMatching.reduce(function(mostRecent, current) {
        return mostRecent.id_allergy > current.id_allergy ? mostRecent : current
      })
    })
}

