exports.seed = function(knex, Promise) {

	return knex.schema.table('immun', function(table) {
	    table.dropForeign('id_user')
	})
	.then( function() {
	    return knex('immun').truncate()
	})
	.then( function() {
	    return knex.schema.table('immun', function(table) {
	        table.foreign('id_user').references('id_user').inTable('users')
	    })
	})
	.then(function() {
		return knex('immun').insert([
			{
				id_user: 1,
				date: '1992-04-12',
				type: 'measles',
				notes: 'bumper shot every 7 years'
			},
			{
				id_user: 1,
				date: '1996-11-11',
				type: 'mumps',
				notes: 'allergic to something in this'
			},
			{
				id_user: 2,
				date: '1993-02-25',
				type: 'measles',
				notes: 'n/a'
			}
	    ])
	})
	.catch( function(err) {
		console.log('Error seeding immun: ', err)
	})

}