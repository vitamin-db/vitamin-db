exports.seed = function(knex, Promise) {

  return knex('user_doctor').truncate()
    .then(function() {
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

}
