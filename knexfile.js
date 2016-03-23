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
	test: { //not currently in use
		client: 'postgresql',
		connection: {
			host: 'localhost',
		      port: 5432,
		      database: 'test'
	    },
	    debug: false, // set true for verbose database operations
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    }
  }

}

