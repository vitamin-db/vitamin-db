exports.seed = function(knex, Promise) {

    return knex.schema.table('familyhistory', function(table) {
        table.dropForeign('id_familymember')
    })
    .then( function() {
        return knex('familyhistory').truncate()
    })
    .then( function() {
        return knex('familyhistory').insert([
          {
            id_familymember: 1,
            condition: 'Cancer'
          },
          {
            id_familymember: 2,
            condition: 'Super Cancer'
          },
          {
            id_familymember: 3,
            condition: 'Breast Cancer'
          },
          {
            id_familymember: 3,
            condition: 'Diabetes'
          },
          {
            id_familymember: 4,
            condition: 'Bad Disease'
          },
          {
            id_familymember: 5,
            condition: 'Superbug'
          },
          {
            id_familymember: 6,
            condition: 'Lupus'
          },
          {
            id_familymember: 6,
            condition: 'Nvm it\'s never lupus'
          },
        ])
    })
    .then( function() {
        return knex.schema.table('familyhistory', function(table) {
            table.foreign('id_familymember').references('id_familymember').inTable('familymembers')
        })
    })
    .catch( function(error) {
        console.log('Error seeding familyhistory: ', error)
    })

}

