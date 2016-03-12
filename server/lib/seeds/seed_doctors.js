exports.seed = function(knex, Promise) {

    return knex.schema.table('user_doctor', function(table) {
        table.dropForeign('id_doctor')
    })
    .then( function() {
<<<<<<< 11bc8135d644cc5446d7fe1e296e7b9db7c18f3f
        return knex.schema.table('rx', function(table) {
=======
        return knex.schema('rx', function(table) {
>>>>>>> seed files written and new files created for new data types
            table.dropForeign('id_doctor')
        })
    })
    .then( function() {
        return knex('doctors').truncate()
    })
    .then( function() {
        return knex.schema.table('user_doctor', function(table) {
            table.foreign('id_doctor').references('id_doctor').inTable('doctors')
        })
    })
    .then( function() {
        return knex.schema.table('rx', function(table) {
            table.foreign('id_doctor').references('id_doctor').inTable('doctors')
        })
    })
    .then(function() {
    	return knex('doctors').insert([
    	  {
            name: 'Donald Drumpffff',
            street_address: '123 Regular American Dr.',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'ilduce@hotmail.com',
            web: 'votedrumpf2016.com',
            phone: '6666666666',
            type: 'Psychologist'
    	  },
    	  {
    	  	name: 'Hillary Clinton',
            street_address: '123 Wall Street',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'leaked@yahoo.gov',
            web: 'feminist-guilt-trip.gov',
            phone: '1111111111',
            type: 'Pediatrician'
    	  }
    	])
    })
    .catch(function(err) {
        console.log('Error seeding doctors', err);
    })

}

