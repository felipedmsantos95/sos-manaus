import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('donations', table => {
        table.increments('id').primary();
        table.string('name_cause').notNullable();
        table.string('whatsapp').notNullable();
        table.string('cause').notNullable();

        table.string('user_id').notNullable()
		table.foreign('user_id').references('id').inTable('users')

    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('donations')
}
