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
<<<<<<< af1d3f8c85a52a00944f67f0173cce9870e6a935
<<<<<<< 11bc8135d644cc5446d7fe1e296e7b9db7c18f3f
            table.foreign('id_familymember').references('id_familymember').inTable('familymembers')
=======
            table.foreign('id_familymember').references('id_familymember').inTable('familyhistory')
>>>>>>> seed files written and new files created for new data types
=======
            table.foreign('id_familymember').references('id_familymember').inTable('familymembers')
>>>>>>> migrations and seeds working
        })
    })
    .catch( function(error) {
        console.log('Error seeding familymembers: ', error)
    })

}

