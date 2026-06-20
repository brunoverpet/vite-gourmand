import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('menu_id').references('id').inTable('menus').onDelete('CASCADE')
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('order_number').notNullable().unique()
      table.timestamp('order_date').notNullable()
      table.date('event_date').notNullable()
      table.time('delivery_time').notNullable()
      table.string('delivery_address').notNullable()
      table.string('delivery_city').notNullable()
      table.string('delivery_zipcode').notNullable()
      table.integer('number_of_people').notNullable()
      table.decimal('total_amount').notNullable()
      table.decimal('delivery_fees').notNullable()
      table.string('status').notNullable()
      table.string('cancellation_reason').nullable()
      table.string('contact_mode').nullable()
      table.boolean('material_loan').defaultTo(false)
      table.boolean('material_return').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
