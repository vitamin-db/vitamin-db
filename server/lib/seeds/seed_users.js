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
        return knex.schema.table('immun', function(table) {
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
    .then( function() {
        return knex.schema.table('immun', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then(function() {
    	return knex('users').insert([
    	  {
    	  	username: 'MoJo',
    	  	password: '$2a$10$pBMz6tAHOmgYAC6co/ZvbuWtCPa5PLc4Cuda/vvjeyLe8sMHo3T.e',
    	  	email: 'marta.hourigan.johnson@gmail.com',
            phone: '123-456-7899'
    	  },
    	  {
    	  	username: 'Hamburguesa',
    	  	password: '$2a$10$GTY19az36LOYswWIf3pfheCnLzYurcc2l6Nkzec2Zv/H7vxOv8Lh6',
    	  	email: 'amberleyjohanna@gmail.com',
            phone: '123-456-7899'
    	  }
    	])
    })
    .catch( function(err) {
        console.log('Error seeding users: ', err)
    })

}

