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
      Returns the new object created
    */
	this.create = function(newItemAttrs) {
		// console.log('trying to create user', newItemAttrs)
		return db(this.table).insert(newItemAttrs, this.attrsToSet)
		  .then( this.returnSuccess('successfully created new entry into table ' + this.table) )
		  .then( function(result) { return result[0] })
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


	/* FIND BY ID
	  Returns an object from the table where the primary key matches the id passed in
	  If the entry does not exist, returns undefined
	*/
	this.findById = function(id) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db.select('*').from(this.table).where(queryObj)
		  .then( this.returnSuccess('success in retrieving from' + this.table) )
		  .then( function(result) { return result[0] })
		  .catch( this.reportError('error finding by id from ' + this.table) )
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
		.then( this.returnSuccess('success in retrieving from' + this.table) )
		.catch( this.reportError('error finding by id from ' + this.table) ) 
	}).bind(this)


}