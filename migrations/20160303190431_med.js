
exports.up = function(knex, Promise) {
  
  return Promise.all([

  	knex.schema.createTable('users', function(table) {
  		table.increments('id_user').primary();
  		table.string('username');
  		table.string('password');
  		table.string('email');
  		table.timestamps();
  	}),

  	knex.schema.createTable('doctors', function(table) {
  		table.increments('id_doctor').primary();
  		table.string('name');
  		table.string('street_address');
  		table.string('city');
  		table.string('state_abbrev');
  		table.integer('zip');
  		table.string('email');
  		table.string('web');
  		table.string('phone');
  		table.string('type');
  	}),

  	knex.schema.createTable('user_doctor', function(table) {
  		table.increments('id_user_doctor').primary();
  	}
  	  	 // knex.schema.createTable('users', function(table) {
    //         table.increments('uid').primary();
    //         table.string('username');
    //         table.string('password');
    //         table.string('name');
    //         table.string('email');
    //         table.timestamps();
    //     }),

    //     knex.schema.createTable('posts', function(table){
    //         table.increments('id').primary();
    //         table.string('title');
    //         table.string('body');
    //         table.integer('author_id')
    //              .references('uid')
    //              .inTable('users');
    //         table.dateTime('postDate');
    //     }),

    //     knex.schema.createTable('comments', function(table){
    //         table.increments('id').primary();
    //         table.string('body');
    //         table.integer('author_id')
    //              .references('uid')
    //              .inTable('users');
    //         table.integer('post_id')
    //              .references('id')
    //              .inTable('posts');
    //         table.dateTime('postDate');
    //     })
  ])

};

exports.down = function(knex, Promise) {
  

  return Promise.all([
  	    // knex.schema.dropTable('users'),
       //  knex.schema.dropTable('posts'),
       //  knex.schema.dropTable('comments')
  ])
};
