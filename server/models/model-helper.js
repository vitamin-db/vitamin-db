const db = require('../db')
const _R = require('ramda')


//attrsToSet should be an array of the names of the attributes to set, WITH THE PRIMARY KEY FIRST (this is important)
module.exports = function(tableName, allAttrs) {

	this.table = tableName
	this.allAttrs = allAttrs
	this.idVarName = allAttrs[0]
	this.attrsToSet = allAttrs.slice(1, allAttrs.length)


	this.reportError = _R.curry( function(description, error) {
		// console.log('inside reportError')
		console.error('*** ', description, ' ***')
		console.error(error)
		if (error instanceof Error) {throw error}
	}).bind(this)


	this.returnSuccess = _R.curry( function(description, result) {
		// console.log('inside reportSuccess')
		console.log('***', description, '***')
		// console.log('result is', result)

		/*
		  NOTE: This returns an array of all results from the query, even if that array is length 1
		  If you want to return a single object, add a .then statement after returnSuccess is called in your function
		  (see this.create below for an example)
		*/
		return result

	}).bind(this)


    /* CREATE
      Creates a new entry using attribute object passed in
    */
	this.create = function(newItemAttrs) {
		return db(this.table).insert(newItemAttrs, this.attrsToSet)
		  .then( this.returnSuccess('successfully created new entry into table ' + this.table) )
		  .then( function(result) { console.log('result of insert', result); return result[0] })
		  .catch( this.reportError('error inserting into table ' + this.table) )
	}.bind(this)


	/* GET ALL
	  Returns an array of all rows in the table
	*/
	this.getAll = function() {
		return db.select('*').from(this.table)
		  .then( this.returnSuccess('success getting all entries in ' + this.table) )
		  .catch( this.reportError('error getting all entries from ' + this.table) )
	}.bind(this)


	/* UPDATE
	  Updates the elements matching the  to have the attributes specified in the attrs object
	  Returns an array of the updated objects
	*/
	this.update = function(selectorAttrs, updatedAttrs) {
		var tbl = this.table
		return db(tbl).where(selectorAttrs).update(updatedAttrs)
		  .then( this.returnSuccess('success updating ' + this.table) )
		  .then( function() {
		  	return db.select('*').from(tbl).where(selectorAttrs)
		  })
		  .catch( this.reportError('error updating ' + tbl) )
	}.bind(this)


	/* UPDATE BY ID
	  Updates the element with the primary key equal to the first argument with the attributes specified in the second
	  Returns the updated object
	*/
	this.updateById = function(id, attrs) {
		return this.findById(id)
		  .then(function(result) {
		  	if (result === undefined) {
		  		console.log('Primary key', id, 'in', this.table,'does not exist! Cannot update')
		  		throw Error
		  	}
		  })
		  .then( function() {
		  	var selector = {}
		  	selector[this.idVarName] = id
		  	return this.update(selector, attrs)
		  	  .then(function(result) {
		  	  	return result[0]
		  	  })
		  }.bind(this))
		  .catch(function(err) {
		  	return err
		  })
	}.bind(this)


	/* UPDATE BY OBJ
	  Same as Update By Id, but only takes one object, which includes both the id and attributes to change
	*/
	this.updateByObj = function(obj) {
		var id = obj[this.idVarName]
		var attrs = {}
		for( var prop in obj) {
			if (prop !== this.idVarName) {
				attrs[prop] = obj[prop]
			}
		}
		return this.updateById(id, attrs)
	}.bind(this)

	/* FIND BY ID
	  Returns an object from the table where the primary key matches the id passed in
	  If the entry does not exist, returns undefined
	*/
	this.findById = function(id) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db.select('*').from(this.table).where(queryObj)
		  .then( this.returnSuccess('success in retrieving from ' + this.table) )
		  .then( function(result) { return result[0] })
		  .catch( this.reportError('error finding by id from ' + this.table) )
	}.bind(this)

	/* FIND BY ID TABLE SPECIFIED
  Returns an object from the table where the primary key matches the id passed in
  If the entry does not exist, returns undefined
	*/
	this.findByIdTableSpecified = function(id, table) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db.select('*').from(table).where(queryObj)
		  .then( this.returnSuccess('success in retrieving from' + table) )
		  .then( function(result) { return result[0] })
		  .catch( this.reportError('error finding by id from ' + table) )
	}.bind(this)


	/* DELETE BY ID
	  Deletes the entry with the matching primary key from the table associated with the model
	  Returns the number of records deleted (ie 1)
	*/
	this.deleteById = function(id) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db(this.table).where(queryObj).del()
		  .then(this.returnSuccess('success deleting from ' + this.table))
		  .catch(this.reportError('error deleting from ' + this.table))
	}.bind(this)


	/* FIND BY ATTRIBUTE
	  Generic curried function allowing you to quickly write functions returning all records matching
	    a particular attribute that may be unique to one table
	  Returns an array of all matching elements
	  See User.findByUsername and User.findByEmail for an example of use
	*/
	this.findByAttribute = _R.curry(function(keyName, value) {
		var queryObj = {}
		queryObj[keyName] = value

		return db.select('*').from(this.table).where(queryObj)
		.then( this.returnSuccess('success finding ' + keyName + ' ' + value + ' in ' + this.table) )
		.catch( this.reportError('error finding ' + keyName + ' ' + value + ' in ' + this.table) ) 
	}).bind(this)


	/* EXISTS BY ATTRIBUTE
	  Generic curried function that can match any attribute 'keyName'
	  Returns a boolean indication whether a keyName matching the value (eg a username matching the value) exists in the table
	  See User.existsByUsername for an example of use
	*/
	this.existsByAttribute = _R.curry(function(keyName, value) {
		return this.findByAttribute(keyName, value)
		  .then( function(result) {return result.length > 0} )
		  .then( this.returnSuccess('success checking if exists ' + keyName + ' ' + value + ' in ' + this.table) )
		  .catch( this.reportError('error checking if exists ' + keyName + ' ' + value + ' in ' + this.table) ) 
	}).bind(this)


    /* ONLY SOME PROPS
      Used to filter out attributes to conceal properties the client shouldn't have access to
      Returns an object identical to ob except only having the properties listed in [] propsToKeep as strings
      See User.getPublic for an example of use
    */
	this.onlySomeProps = function(ob, propsToKeep) {
		return new Promise( function(resolve, reject) {

			var newOb = {}

			Object.keys(ob).filter( function(prop) {
				return propsToKeep.indexOf(prop) > -1
			}).forEach( function(prop) {
				newOb[prop] = ob[prop]
			})

			resolve(newOb)
		})
	}.bind(this)

	/* GET PUBLIC OB
	  Right now, this just returns the whole object passed in
	  Eventually, we could re-write these to scrape out private information such as the userid
	*/
	this.getPublicOb = function(obj) {
		return obj
	}


	/* IS NUMBER
	  Returns a boolean indicating whether a string is parsable to an object
	*/
	this.isNumber = function(elem) {
		var asNum = parseInt(elem) //will be NaN if invalid
		return asNum === asNum //will be false if 
	}


	/* GET INT
	  Transforms the passed-in value to an integer
	  If elem is not parseable to an integer, throws an Error ('Not a valid number')
	*/
	this.getInt = function(elem) {
		if (this.isNumber(elem)) {
			return parseInt(elem)
		} else {
			throw new Error('Please enter valid numbers')
		}
	}.bind(this)

	/* ROUND DECIMAL
	  Returns the passed-in decimal (as a string or number) rounded to the nearest sigFigs
	  Throws an error 'Not a valid number' if not parseable to a number
	*/
	this.roundDecimal = function(dec, sigFigs) {
		if (this.isNumber(dec)) {
			var mFactor = Math.pow(10, sigFigs)
			var num = parseFloat(dec)
			return Math.round(num * mFactor)/mFactor	
		} else {
			throw new Error('Please enter valid numbers')
		}
	}.bind(this)



	/* VALID EMAIL
	  Returns a boolean indicating whether an email address is correctly formatted
	  To be correctly formatted, needs: 
	  - exactly one '@' symbol
	  - a '.' after the @ symbol
	  - at least one character between the '@' and '.'
	  - at least one character after the '.'
	*/
	this.validEmail = function(emailAddress) {
		var splitAtAt = emailAddress.split('@')
		if (splitAtAt.length !== 2) {
			return false
		} else {
			var splitAtDot = splitAtAt[1].split('.')
			return splitAtDot.length > 1 && splitAtDot.reduce(function(bool, curr) {return bool && curr.length > 0}, true)
		}
	}

	/* NULL OUT
	  Changes all the the records specified to NULL in the database
	*/
	this.nullOut = function(key, value) {
		var searchOb = {}
		searchOb[key] = value

		var changeOb = {}
		changeOb[key] = null
		return this.update(searchOb, changeOb)
	}


}
