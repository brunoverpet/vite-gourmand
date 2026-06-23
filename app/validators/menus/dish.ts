import { DishTypes } from '#enums/dish_types'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const createDishValidator = vine.withMetaData<{ allergenIds: string[] }>().create({
  title: vine.string().minLength(3).escape(),
  description: vine.string().minLength(3).escape(),
  photoPath: vine.string().escape(),
  type: vine.enum(Object.values(DishTypes)),
  allergen: vine.enum((field) => field.meta.allergenIds).optional(),
})

export const updateDishValidator = vine.create(createDishValidator.schema.partial())

const messages = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire',
  'string': 'Le champ {{ field }} doit être une chaîne de caractères',
  'enum': 'La valeur sélectionnée pour {{ field }} est invalide',
  'title.minLength': 'Le titre doit contenir au moins 3 caractères',
  'description.minLength': 'La description doit contenir au moins 10 caractères',
})

createDishValidator.messagesProvider = messages
updateDishValidator.messagesProvider = messages

export type CreateDishPayload = Infer<typeof createDishValidator>
export type UpdateDishPayload = Infer<typeof updateDishValidator>
