exports.seed = function(knex, Promise) {

    return knex.schema.table('eyerx', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
        return knex('eyerx').truncate()
    })
    .then( function() {
        return knex.schema.table('eyerx', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then(function() {
    	return knex('eyerx').insert([
    	  {
    	  	id_user: 1,
          sphere_right: 2.45,
          sphere_left: 1.75,
          cylinder_right: 4.23,
          cylinder_left: -1.2,
          axis_right: 40,
          axis_left: 83,
          add_right: -3.4,
          add_left: 3.4,
          current: true
    	  },
        {
          id_user: 2,
          sphere_right: 2.0,
          sphere_left: -4.53,
          cylinder_right: 2.34,
          cylinder_left: 5.6,
          axis_right: 90,
          axis_left: 10,
          add_right: 3.45,
          add_left: -1.3,
          current: true
        },
        {
          id_user: 2,
          sphere_right: 12.4,
<<<<<<< 11bc8135d644cc5446d7fe1e296e7b9db7c18f3f
          sphere_left: -10.2,
=======
          sphere_left: -10.2
>>>>>>> seed files written and new files created for new data types
          cylinder_right: 2.34,
          cylinder_left: 5.6,
          axis_right: 90,
          axis_left: 3,
          add_right: 3.45,
          add_left: -1.3,
          current: false
        }
    	])
    })
    .catch( function(err) {
        console.log('Error seeding eyerx: ', err)
    })

}
