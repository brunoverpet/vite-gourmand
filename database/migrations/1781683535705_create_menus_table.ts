import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('title', 100).notNullable()
      table.string('description').notNullable()
      table.integer('min_people').notNullable()
      table.decimal('price_per_people', 10, 2).notNullable()
      table.string('conditions').nullable()
      table.integer('stock').notNullable()
      table.uuid('diet_id').references('id').inTable('diets').onDelete('RESTRICT')
      table.uuid('theme_id').references('id').inTable('themes').onDelete('RESTRICT')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
