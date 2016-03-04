exports.seed = function(knex, Promise) {

  return knex('users').truncate()
    .then(function() {
    	return knex('users').insert([
    	  {
    	  	username: 'MoJo',
    	  	password: 'pw',
    	  	email: 'marta.hourigan.johnson@gmail.com'
    	  },
    	  {
    	  	username: 'Hamburguesa',
    	  	password: 'mycoolpassword',
    	  	email: 'amberleyjohanna@gmail.com'
    	  }
    	])
    })

}