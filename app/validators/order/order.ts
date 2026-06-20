import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const createOrderValidator = vine.create({
  menu_id: vine.string().exists({ table: 'menus', column: 'id' }),
  event_date: vine.date({ formats: ['YYYY-MM-DD'] }).after('today'),
  delivery_time: vine.string().regex(/^\d{2}:\d{2}$/),
  delivery_address: vine.string().minLength(5).maxLength(255),
  delivery_city: vine.string().minLength(2).maxLength(100),
  delivery_zipcode: vine.string().regex(/^\d{5}$/),
  number_of_people: vine.number().positive().min(1),
  longitude: vine.number(),
  latitude: vine.number(),
})

const sharedMessages = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire.',
  'exists': 'Le menu sélectionné est invalide.',
  'number.positive': 'Le nombre de personnes doit être positif.',
  'number.min': 'Le nombre de personnes est insuffisant pour ce menu.',
})

createOrderValidator.messagesProvider = sharedMessages

export type CreateOrderPayload = Infer<typeof createOrderValidator>
