const db = require('../db')
const Model = require('./model-helper')

const Insurance = new Model('insurance', ['id_insurance', 'id_user', 'plan_name', 'group_id', 'plan_id', 'rx_bin', 'current'])
module.exports = Insurance


/* GET ALL BY USER
  Takes the id of the user
  Returns an array of all insurance records associated with the specified user
*/
Insurance.getAllByUser = function(id_user) {
  return this.findByAttribute('id_user', id_user)
}

Insurance.createInsuranceReturnObj = function(insuranceAttrs) {
  return Insurance.create(insuranceAttrs)
    .then(function(attrs) {
      return db.select('*').from('insurance').where(attrs)
    })
    .then(function(allMatching) {
      return allMatching.reduce(function(mostRecent, current) {
        return mostRecent.id_insurance > current.id_insurance ? mostRecent : current
      })
    })
}

