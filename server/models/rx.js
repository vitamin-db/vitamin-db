const db = require('../db')
const Model = require('./model-helper')

const Rx = new Model('rx', ['id_rx', 'id_user', 'id_pharmacy', 'id_doctor', 'refill_number', 'name', 'dosage', 'current'])
module.exports = Rx

/* GET ALL BY USER
  Returns an array of all rx records corresponding to the user
*/
Rx.getAllByUser = function(id_user) {
  return this.findByAttribute('id_user', id_user)
}


/* GET CURRENT
  Returns an object containing multiple current rx records (if exists)
*/
Rx.getCurrentByUser = function(id_user) {
  return this.getAllByUser(id_user)
    .then(function(allRx) {
      return current = allRx.filter(function(rx) {
        return rx.current
      })//[0]
    })
}


