
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
      table.timestamps();
    }),

    knex.schema.createTable('user_doctor', function(table) {
      table.increments('id_user_doctor').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.integer('id_doctor')
           .references('id_doctor')
           .inTable('doctors');
      table.timestamps();
    })
  ])

};

exports.down = function(knex, Promise) {
  

  return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('doctors'),
      knex.schema.dropTable('user_doctor')
  ])
  
};
