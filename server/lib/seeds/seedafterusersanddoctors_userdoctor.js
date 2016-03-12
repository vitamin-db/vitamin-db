exports.seed = function(knex, Promise) {

    return knex.schema.table('user_doctor', function(table) {
        table.dropForeign('id_user')
        table.dropForeign('id_doctor')
    })
    .then( function() {
        return knex('user_doctor').truncate()
    })
    .then( function() {
        return knex('user_doctor').insert([
          {
            id_user: 1,
            id_doctor: 1,
            type_usermade: 'Psychologist'
          },
          {
            id_user: 2,
            id_doctor: 2,
            type_usermade: 'Baby Doc'
          }
        ])
    })
    .then( function() {
        return knex.schema.table('user_doctor', function(table) {
            table.foreign('id_user').references('id_user').inTable('users')
            table.foreign('id_doctor').references('id_doctor').inTable('doctors')
        })
    })
    .catch( function(error) {
        console.log('Error seeding user_doctor: ', error)
    })

}

