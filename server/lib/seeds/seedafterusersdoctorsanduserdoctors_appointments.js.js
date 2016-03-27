exports.seed = function(knex, Promise) {

	return knex.schema.table('appointments', function(table) {
		table.dropForeign('id_user_doctor')
	})
	.then( function() {
		return knex('appointments').truncate()
	})
	.then( function() {
		return knex('appointments').insert([
		  {
		  	id_user_doctor: 1,
		  	date: '07/23/2016',
		  	time: '14:30'
		  },
		  {
		  	id_user_doctor: 2,
		  	date: '08/01/2017',
		  	time: '09:45'
		  }
		])
	})
	.then( function() {
		return knex.schema.table('appointments', function(table) {
			table.foreign('id_user_doctor').references('id_user_doctor').inTable('user_doctor')
		})
	})
	.catch( function(error) {
	    console.log('Error seeding appointments: ', error)
	})
	
}