//======================================================
// knexfile.js is responsible for holding the parameters of our db
//======================================================

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			host: 'localhost',
			port: 5432,
			database: 'med_dev'
		},
		seeds: {
			directory: './server/lib/seeds'
		}
	},
	test: { 
		client: 'postgresql',
		connection: {
			host: 'localhost',
		      port: 5432,
		      database: 'test'
	    },
	    seeds: {
	    	directory: './server/lib/seeds'
	    },
	    debug: false // set true for verbose database operations
  }

}

