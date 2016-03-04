exports.seed = function(knex, Promise) {

  return knex('doctors').truncate()
    .then(function() {
    	return knex('doctors').insert([
    	  {
            name: 'Donald Drumpffff',
            street_address: '123 Regular American Dr.',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'ilduce@hotmail.com',
            web: 'votedrumpf2016.com',
            phone: 6666666666,
            type: 'Psychologist'
    	  },
    	  {
    	  	name: 'Hillary Clinton',
            street_address: '123 Wall Street',
            city: 'New York City',
            state_abbrev: 'NY',
            zip: 10001,
            email: 'leaked@yahoo.gov',
            web: 'feminist-guilt-trip.gov',
            phone: 1111111111,
            type: 'Pediatrician'
    	  }
    	])
    })

}

