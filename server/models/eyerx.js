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
  NOTE: attrs does not have a current yet because we're not giving the user the option to choose no
     >>> so we have to add it
*/
EyeRx.createEyeRx = function(attrs) {
	return EyeRx.getCurrentByUser(attrs.id_user)
	  .then(function(eyerx) {
	  	return eyerx ? EyeRx.toggleCurrent(eyerx.id_eyerx) : eyerx //toggles current and returns updated or returns undefined
	  })
	  .then( function() {
	  	return EyeRx.create( EyeRx.package( EyeRx.validateAttrs(attrs) ) )
	  })
	  .then( function() {
	  	return EyeRx.getCurrentByUser(attrs.id_user)
	  })
	  .catch(function() {
	  	throw new Error('Please enter valid numbers')
	  })
}


/* PACKAGE
  Packages a passed-in object for addition to the database by giving it a 'current' property set to true
*/
EyeRx.package = function(attrs) {
	var packaged = EyeRx.validateAttrs(attrs)
	packaged.current = true
	return packaged
}

/* VALIDATE ATTRS
 Returns an object that contains the orginally passed in values, but in the format needed
   (ie truncated )
 If no errors, returns an object with all of the values in the format required
 If some of them can't be coerced into the desired values, throws an error
*/
EyeRx.validateAttrs = function(attrs) {

	var validated = {}

	var types = {
		sphere_right: 'dec'
		sphere_left: 'dec'
		cylinder_right: 'dec',
		cylinder_left: 'dec',
		axis_right: 'int',
		axis_left: 'int',
		add_right: 'dec',
		add_left: 'dec'
	}

	for (var p in attrs) {
		if (p !== 'id_user' && p!== 'current') {
			if ( !EyeRx.isNumber(attrs[p]) ) {
				throw Error
			} else {
				if (types[p] === 'int') {
					validated[p] = EyeRx.getInt(attrs[p])
				} else { //decimal
					if (attrs[p] > 99) {
						throw Error
					} else {
						validated[p] = EyeRx.roundDecimal(attrs[p], 2)
					}
				}
			}
		}
	}

	if(attrs.current !== undefined) {
		validated.current = attrs.current
	}

	it(attrs.id_user !== undefined) {
		validated.id_user = attrs.id_user
	}

	return validated
}

