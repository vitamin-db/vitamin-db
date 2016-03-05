// ===================================
// Pseudocode
// ===================================
/*

The model-helper should:
	- 'Create' function, allowing you to create a new instance of the table specified
	- takes attributes


*/
const db = require('../db')
const Promise = require('bluebird')
const _R = require('ramda')


//attrsToSet should be an array of the names of the attributes to set, with the primary key first
module.exports = function(tableName, allAttrs) {

	this.table = tableName
	this.allAttrs = allAttrs
	this.idVarName = attrsToSet[0]
	this.attrsToSet = allAttrs.slice(1, allAttrs.length)

	this.reportError = _R.curry( function(description, error) {
		console.log('this', this)
		console.error('*** ', description, ' ***')
		console.error(error)
		if (error instanceof Error) {throw error}
	})

	this.returnSuccess = _R.curry( function(description, result) {
		console.log('this', this)
		console.log('***', description, '***')
		console.log('result is', result)
		return result
	})


    //Creates a new entry using attribute object passed in
	this.create = function(newItemAttrs) {
		return db(this.table).insert(newItemAttrs, this.attrsToSet)
		  .then(this.returnSuccess('successfully created new entry into table ' + this.table))
		  .catch(this.reportError('error inserting into table ' + this.table))
	}.bind(this)

	this.getAll = function() {
		return db.select('*').from(this.table)
		  .then(this.returnSuccess('success getting all entries in ' + this.table))
		  .catch(this.reportError('error getting all entries from ' + this.table))
	}.bind(this)

	//Returns all rows from the table matching the id passed in
	this.findById = function(id) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db.select('*').from(this.table).where(queryObj)
		  .then(this.returnSuccess('success in retrieving from' + this.table))
		  .catch(this.reportError('error finding by id from ' + this.table))
	}.bind(this)

	//Deletes entry from table
	this.deleteById = function(id) {
		var queryObj = {}
		queryObj[this.idVarName] = id

		return db(this.table).where(queryObj).del()
		  .then(this.returnSuccess('success deleting from' + this.table))
		  .catch(this.reportError('error deleting from ' + this.table))
	}.bind(this)


}



