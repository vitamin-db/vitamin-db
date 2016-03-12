exports.seed = function(knex, Promise) {

    return knex.schema.table('pharmacy', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
      return knex.schema.table('rx', function(table) {
        table.dropForeign('id_pharmacy')
      })
    })
    .then( function() {
        return knex('pharmacy').truncate()
    })
    .then( function() {
        return knex.schema.table('pharmacy', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
      return knex.schema.table('rx', function(table) {
        table.foreign('id_pharmacy').references('id_pharmacy').inTable('pharmacy')
      })
    })
    .then(function() {
    	return knex('pharmacy').insert([
    	  {
    	  	id_user: 1,
          business_name: 'CVS',
          address: '123 Health Cove',
          phone: '111-111-1111',
          current: true
    	  },
        {
          id_user: 2,
          business_name: 'Walgreens',
          address: '45 Prescription Street',
          phone: '111-111-1111',
          current: true
        },
        {
          id_user: 2,
          business_name: 'Walgreens',
          address: '45 Other Walgreens Street',
          phone: '111-111-1111',
          current: false
        },
    	])
    })
    .catch( function(err) {
        console.log('Error seeding pharmacy: ', err)
    })

}
