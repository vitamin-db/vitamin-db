exports.seed = function(knex, Promise) {

    return knex.schema.table('insurance', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
        return knex('insurance').truncate()
    })
    .then( function() {
        return knex.schema.table('insurance', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then(function() {
    	return knex('insurance').insert([
    	  {
    	  	id_user: 1,
            plan_name: 'Anthem',
            group_id: '93dgaio4t',
            plan_id: 'f4j894',
            rx_bin: '843r9',
            current: true
    	  },
          {
            id_user: 1,
              plan_name: 'Cigna',
              group_id: '4wj49v',
              plan_id: 'jf983',
              rx_bin: '3q2r89',
              current: false
          },
          {
            id_user: 2,
              plan_name: 'Aetna',
              group_id: '4fj90',
              plan_id: 'qf939',
              rx_bin: 'kq09',
              current: true
          }
    	])
    })
    .catch( function(err) {
        console.log('Error seeding insurance: ', err)
    })

}

