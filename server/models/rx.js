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

/* CREATE AND RETURN
  Adds a new Rx to the database
  Returns it
  - Throws an error with message 'Please enter a valid refill number' if the refill number is not parseable to integer
*/
Rx.createAndReturn = function(attrs) {
	return Rx.prepData(attrs)
	  .then(function(data) {
	  	return Rx.create(data)
	  })
	  .then(function(attrs) {
	  	return db.select('*').from('rx').where(attrs)
	  })
	  .then(function(allMatching) {
	    return allMatching.reduce(function(mostRecent, current) {
	      return mostRecent.id_rx > current.id_rx ? mostRecent : current
	    })
	  })
}


/* UPDATE AND RETURN
  Updates based on the attrs object - returns that object
- Throws an error with message 'Please enter a valid refill number' if the refill number is not parseable to integer
*/
Rx.updateAndReturn = function(attrs) {
	return Rx.prepData(attrs)
	  .then(function(data) {
	  	return Rx.updateByObj(data)
	  })
}


/* PREP DATA
  Returns an object with all the original properties except refill_number has been coerced into an integer
  If refill_number can't be an integer, throws an error 'Please enter a valid refill number' 
*/
Rx.prepData = function(attrs) {
	return new Promise( function(resolve, reject) {
		var prepped = {}
		for (var p in attrs) {
			if (p === 'refill_number') {
				if (Rx.isNumber(attrs[p])) {
					prepped[p] = Rx.getInt(attrs[p])
				} else {
					throw new Error('Please enter a valid refill number')
				}
			} else {
				prepped[p] = attrs[p]
			}
		}
		resolve(prepped)
	})
}


/* DELETE PHARMACY
  Sets the id_pharmacy FK of any rxs that mention this pharmacy to null
  Then deletes the pharmacy
*/
// Rx.deletePharmacy = function(pharmaId) {
// 	return Rx.update({id_pharmacy: pharmaId}, {id_pharmacy: NULL})
// 	  .then(function() {
// 	  	return Pharmacy.deleteById(pharmaId)
// 	  })
// }


/* NULL OUT PHARMACY
  Takes a pharmacy id
  Transforms every instance of that pharmacy id into null
*/
Rx.nullPharmacy = function(id_pharmacy) {
	return Rx.nullOut('id_pharmacy', id_pharmacy)
}

/* NULL OUT DOCTOR
  Takes a doctor ID
  Transforms every instance of that doctor id into null
*/
Rx.nullDoctor = function(id_doctor) {
	return Rx.nullOut('id_doctor', id_doctor)
}






