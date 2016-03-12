exports.seed = function(knex, Promise) {


    return knex.schema.table('user_doctor', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
        return knex.schema.table('insurance', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex.schema.table('pharmacy', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex.schema.table('eyerx', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex.schema.table('rx', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex.schema.table('familymembers', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex.schema.table('allergies', function(table) {
            table.dropForeign('id_user')
        })
    })
    .then( function() {
        return knex('users').truncate()
    })
    .then( function() {
        return knex.schema.table('user_doctor', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('insurance', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('pharmacy', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('eyerx', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('rx', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('familymembers', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('allergies', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then(function() {
    	return knex('users').insert([
    	  {
    	  	username: 'MoJo',
    	  	password: 'pw',
    	  	email: 'marta.hourigan.johnson@gmail.com',
            phone: '123-456-7899'
    	  },
    	  {
    	  	username: 'Hamburguesa',
    	  	password: 'mycoolpassword',
    	  	email: 'amberleyjohanna@gmail.com',
            phone: '123-456-7899'
    	  }
    	])
    })
    .catch( function(err) {
        console.log('Error seeding users: ', err)
    })

}

