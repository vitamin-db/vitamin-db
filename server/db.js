var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development'

console.log('Current node environment is', env)

var db = require('knex')(config[env])
var Promise = require('bluebird')

module.exports = db
db.migrate.latest([config])


//function for testing
db.deleteEverything = function() {

	if (env !== 'test') {
		return Promise.reject()
	}


    return db('appointments').delete()
      .then( function(msg) {
            console.log('deleted ', msg, ' records from appointments')
            return db('user_doctor').delete()
      })
      .then(function(msg) {
          console.log('deleted ', msg, ' records from user_doctor')
          return db('rx').delete()  
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from rx')
            return db('immun').delete()
      })
      .then(function(msg) {
            console.log('deleted ', msg, ' records from immun')
      	return db('familyhistory').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from familyhistory')
      	return db('familymembers').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from familymembers')
      	return db('insurance').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from insurance')
      	return db('pharmacy').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from pharmacy')
      	return db('eyerx').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from eyerx')
      	return db('doctors').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from doctors')
      	return db('allergies').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from familyhistory')
      	return db('users').delete()
      })
      .then(function(msg) {
      	console.log('deleted ', msg, ' records from users')
      })
      .catch(function(error) {
      	console.log('Error deleting tables', error)
      	if (error instanceof Error) {throw Error}
      })

}


// This runs db.deleteEverything on server start
// Uncomment out to check that deleteEverything is working as expected

// db.deleteEverything()
//   .then(function(msg) {
//   	console.log('finished deleting everything ', msg)
//   })

