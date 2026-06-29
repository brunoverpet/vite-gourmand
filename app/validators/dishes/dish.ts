import { DishTypes } from '#enums/dish_types'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

const dishPhotoRule = vine.file({ extnames: ['png', 'jpg', 'jpeg', 'webp'], size: '2mb' })

export const createDishValidator = vine.create({
  title: vine.string().minLength(3).trim(),
  description: vine.string().minLength(3).trim(),
  type: vine.enum(Object.values(DishTypes)),
  photo: dishPhotoRule.optional(),
  allergen_ids: vine.array(vine.string()).optional(),
})

export const updateDishValidator = vine.create({
  title: vine.string().minLength(3).trim().optional(),
  description: vine.string().minLength(3).trim().optional(),
  type: vine.enum(Object.values(DishTypes)).optional(),
  photo: dishPhotoRule.optional(),
  allergen_ids: vine.array(vine.string()).optional(),
})

const messages = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire',
  'string': 'Le champ {{ field }} doit être une chaîne de caractères',
  'enum': 'La valeur sélectionnée pour {{ field }} est invalide',
  'title.minLength': 'Le titre doit contenir au moins 3 caractères',
  'description.minLength': 'La description doit contenir au moins 3 caractères',
  'file.extnames': 'La photo doit être au format png, jpg, jpeg ou webp',
  'file.size': 'La photo ne doit pas dépasser 2 Mo',
})

createDishValidator.messagesProvider = messages
updateDishValidator.messagesProvider = messages

export type CreateDishPayload = Infer<typeof createDishValidator>
export type UpdateDishPayload = Infer<typeof updateDishValidator>
