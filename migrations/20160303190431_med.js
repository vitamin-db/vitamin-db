
exports.up = function(knex, Promise) {
  
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id_user').primary();
      table.string('username');
      table.string('password');
      table.string('email');
      table.string('phone');
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
      table.string('type_usermade');
      table.boolean('current');
      table.timestamps();
      table.unique(['id_user', 'id_doctor']);
    }),

    knex.schema.createTable('insurance', function(table) {
      table.increments('id_insurance').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.string('plan_name');
      table.string('group_id');
      table.string('plan_id');
      table.string('rx_bin');
      table.boolean('current');
    }),

    knex.schema.createTable('pharmacy', function(table) {
      table.increments('id_pharmacy').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.string('business_name');
      table.string('address');
      table.string('phone');
      table.boolean('current');
    }),

    knex.schema.createTable('eyerx', function(table) {
      table.increments('id_eyerx').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.decimal('sphere_right', 4, 2);
      table.decimal('sphere_left', 4, 2);
      table.decimal('cylinder_right', 4, 2);
      table.decimal('cylinder_left', 4, 2);
      table.integer('axis_right');
      table.integer('axis_left');
      table.decimal('add_right', 4, 2);
      table.decimal('add_left', 4, 2);
      table.boolean('current');
    }),

    knex.schema.createTable('rx', function(table) {
      table.increments('id_rx').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.integer('id_pharmacy')
           .references('id_pharmacy')
           .inTable('pharmacy');
      table.integer('id_doctor')
           .references('id_doctor')
           .inTable('doctors');
      table.integer('refill_number');
      table.string('name');
      table.string('dosage');
      table.boolean('current');
    }),

    knex.schema.createTable('familymembers', function(table) {
      table.increments('id_familymember').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.string('name');
    }),

    knex.schema.createTable('familyhistory', function(table) {
      table.increments('id_famhist').primary();
      table.integer('id_familymember')
           .references('id_familymember')
           .inTable('familymembers');
      table.string('condition');
    }),

    knex.schema.createTable('allergies', function(table) {
      table.increments('id_allergy').primary();
      table.integer('id_user')
           .references('id_user')
           .inTable('users');
      table.string('allergen');
      table.boolean('current');
    })

  ])

};

exports.down = function(knex, Promise) {
  
  return Promise.all([
      knex.schema.dropTable('users'),
      knex.schema.dropTable('doctors'),
      knex.schema.dropTable('user_doctor'),
      knex.schema.dropTable('insurance'),
      knex.schema.dropTable('pharmacy'),
      knex.schema.dropTable('eyerx'),
      knex.schema.dropTable('rx'),
      knex.schema.dropTable('familymembers'),
      knex.schema.dropTable('familyhistory'),
      knex.schema.dropTable('allergies')
  ])

};
