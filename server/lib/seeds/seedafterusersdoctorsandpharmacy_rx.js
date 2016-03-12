exports.seed = function(knex, Promise) {

    return knex.schema.table('rx', function(table) {
        table.dropForeign('id_user')
<<<<<<< 11bc8135d644cc5446d7fe1e296e7b9db7c18f3f
        table.dropForeign('id_doctor')
        table.dropForeign('id_pharmacy')
=======
    })
    .then( function() {
      return knex.schema.table('doctors', function(table) {
        table.dropForeign('id_doctor')
      })
    })
    .then( function() {
      return knex.schema.table('pharmacy', function(table) {
        table.dropForeign('id_pharmacy')
      })
>>>>>>> seed files written and new files created for new data types
    })
    .then( function() {
        return knex('rx').truncate()
    })
    .then( function() {
        return knex.schema.table('rx', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
            table.foreign('id_doctor').references('id_doctor').inTable('doctors')
            table.foreign('id_pharmacy').references('id_pharmacy').inTable('pharmacy')
        })
    })
    .then(function() {
    	return knex('rx').insert([
    	  {
    	  	id_user: 1,
          id_pharmacy: 1,
          id_doctor: 1,
          refill_number: 39483,
          name: 'Chill Pillz',
          dosage: '1 pill every 2 hours',
          current: false
    	  },
        {
          id_user: 2,
          id_pharmacy: 2,
          id_doctor: 2,
          refill_number: 8978,
          name: 'Medicine',
          dosage: '1 per day',
          current: true
        }
    	])
    })
    .catch( function(err) {
        console.log('Error seeding rx: ', err)
    })

}