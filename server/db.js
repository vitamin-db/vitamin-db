var config = require('../knexfile.js')
var env = process.env.NODE_ENV || 'development'

console.log('env var ', env)

var db = require('knex')(config[env])
var Promise = require('bluebird')

module.exports = db
db.migrate.latest([config])


//function for testing
db.deleteEverything = function() {
	// if (env !== 'test') {
	// 	return Promise.reject()
	// }
	console.log('inside deleteEverything')
    //update whenever new tables are added
    //this may be super wrong
    return db('user_doctor').delete()
      .then(function() {console.log('got past users'); return db('doctors').delete()})
	  .then(function() {console.log('got past doctors'); return db('users').delete()})


}

// db.deleteEverything()