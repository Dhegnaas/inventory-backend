exports.up = function(knex) {
  return knex.schema.createTable('customers', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('phone', 20);
    table.string('address', 255);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customers');
};
