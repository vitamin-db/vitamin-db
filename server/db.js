var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development'

console.log('Current node environment is', env)

var db = require('knex')(config[env])
var Promise = require('bluebird')

module.exports = db
db.migrate.latest([config])


//function for testing
db.deleteEverything = function() {
	// if (env !== 'test') {
	// 	return Promise.reject()
	// }
	// console.log('inside deleteEverything')
    //update whenever new tables are added
    //this may be super wrong
    return db('user_doctor').delete()
      .then(function(msg) {console.log('deleted ', msg, ' records from user_doctor'); return db('doctors').delete()})
	  .then(function(msg) {console.log('deleted ', msg, ' records from doctors'); return db('users').delete()})
	  .then(function(msg) {console.log('deleted ', msg, ' records from users');})


}


// This runs db.deleteEverything on server start
// Uncomment out to check that deleteEverything is working as expected

// db.deleteEverything()
//   .then(function(msg) {
//   	console.log('finished deleting everything ', msg)
//   })

