exports.seed = function(knex, Promise) {

    return knex.schema.table('allergies', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
        return knex('allergies').truncate()
    })
    .then( function() {
        return knex.schema.table('allergies', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then(function() {
    	return knex('allergies').insert([
    	  {
    	  	id_user: 1,
          allergen: 'pollen',
          current: true
    	  },
        {
          id_user: 1,
          allergen: 'cats',
          current: false
        },
        {
          id_user: 2,
          allergen: 'cats',
          current: true
        },
        {
          id_user: 2,
          allergen: 'rabbits',
          current: true
        },
    	])
    })
    .catch( function(err) {
        console.log('Error seeding allergies: ', err)
    })

}

