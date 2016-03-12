exports.seed = function(knex, Promise) {

    return knex.schema.table('familymembers', function(table) {
        table.dropForeign('id_user')
    })
    .then( function() {
        return knex.schema.table('familyhistory', function(table) {
            table.dropForeign('id_familymember')
        })
    })
    .then( function() {
        return knex('familymembers').truncate()
    })
    .then( function() {
        return knex('familymembers').insert([
          {
            id_user: 1,
            name: 'Mom'
          },
          {
            id_user: 1,
            name: 'Dad'
          },
          {
            id_user: 1,
            name: 'Grandma (maternal)'
          },
          {
            id_user: 2,
            name: 'Dad'
          },
          {
            id_user: 2,
            name: 'Mom'
          },
          {
            id_user: 2,
            name: 'Aunt'
          },
          {
            id_user: 2,
            name: 'Grandpa (dad\'s dad)'
          },
        ])
    })
    .then( function() {
        return knex.schema.table('familymembers', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
        })
    })
    .then( function() {
        return knex.schema.table('familyhistory', function(table) {
            table.foreign('id_familymember').references('id_familymember').inTable('familymembers')
        })
    })
    .catch( function(error) {
        console.log('Error seeding familymembers: ', error)
    })

}

