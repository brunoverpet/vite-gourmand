import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('role_id').references('id').inTable('roles').onDelete('RESTRICT')
      table.string('lastname', 100).notNullable()
      table.string('firstname', 100).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('phone', 254).nullable()
      table.string('adress', 254).nullable()
      table.string('city', 100).nullable()
      table.string('country', 100).nullable()
      table.boolean('password_change').defaultTo(false).notNullable()
      table.boolean('password_reset').defaultTo(false).notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
