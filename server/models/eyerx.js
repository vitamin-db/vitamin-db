const db = require('../db')
const Model = require('./model-helper')

const EyeRx = new Model('eyerx', ['id_eyerx', 'id_user', 'sphere_right', 'sphere_left', 'cylinder_right', 
	                              'cylinder_left', 'axis_right', 'axis_left', 'add_right', 'add_left', 'current'])
module.exports = EyeRx


/* TOGGLE CURRENT
  Flips the value of current of the EyeRx referenced by the id
  Returns the updated object
*/
EyeRx.toggleCurrent = function(id) {
	return EyeRx.findById(id)
	  .then( function(eyerx) {
	  	return EyeRx.updateById(id, {current: !eyerx.current})
	  })
	  .then(function(updated) {
	  	return updated
	  })
	  .catch(function(err) {
	  	console.log('associated user does not exist')
	  	return err
	  })
}


/* GET ALL BY USER
  Returns an array of all eye prescriptions corresponding to the user
*/
EyeRx.getAllByUser = function(id_user) {
	return this.findByAttribute('id_user', id_user)
}


/* GET CURRENT
  Returns an object representing the user's current eye prescription
*/
EyeRx.getCurrentByUser = function(id_user) {
	return this.getAllByUser(id_user)
	  .then(function(allRx) {
	  	return current = allRx.filter(function(rx) {
	  		return rx.current
	  	})[0]
	  })
}


/* CREATE EYERX
  If the user specified in attributes has a prescription and the attributes have a current value of true:
    - Switches that prescription to not current
  Creates a new eyeRx and returns that object
*/
EyeRx.createEyeRx = function(attrs) {
	if (attrs.current === true) {
		return EyeRx.getCurrentByUser(attrs.id_user)
		  .then(function(eyerx) {
		  	return eyerx ? EyeRx.toggleCurrent(eyerx.id_eyerx) : eyerx //toggles current and returns updated or returns undefined
		  })
		  .then( function() {
		  	return EyeRx.create(attrs)
		  })
		  .then( function() {
		  	return EyeRx.getCurrentByUser(attrs.id_user)
		  })
	} else {
		return EyeRx.create(attrs)
		  .then(function() {
		  	return EyeRx.getAllByUser(attrs.id_user)
		  })
		  .then(function(allRx) {
		  	return allRx.reduce(function(mostRecent, current) {
		  		return current.id_eyerx > mostRecent.id_eyerx ? current.id_eyerx : mostRecent.id_eyerx
		  	})
		  })
	} 

}






