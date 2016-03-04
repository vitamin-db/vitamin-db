//======================================================
// knexfile.js is responsible for holding the parameters of our db
//======================================================

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'med_dev'
		},
		migrations: {
			// for later consideration
		}
	}
}