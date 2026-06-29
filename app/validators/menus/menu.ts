import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const createMenuValidator = vine
  .withMetaData<{ themeIds: string[]; dietIds: string[] }>()
  .create({
    title: vine.string().minLength(3).trim(),
    description: vine.string().minLength(10).trim(),
    conditions: vine.string().trim().optional().nullable(),
    min_people: vine.number().min(1),
    price_per_people: vine.number().decimal([0, 2]).min(0),
    stock: vine.number().min(0),
    theme_id: vine.enum((field) => field.meta.themeIds),
    diet_id: vine.enum((field) => field.meta.dietIds),
  })

export const updateMenuValidator = vine.create(createMenuValidator.schema.partial())

const messages = new SimpleMessagesProvider({
  'required': 'Le champ {{ field }} est obligatoire',
  'string': 'Le champ {{ field }} doit être une chaîne de caractères',
  'number': 'Le champ {{ field }} doit être un nombre',
  'enum': 'La valeur sélectionnée pour {{ field }} est invalide',
  'title.minLength': 'Le titre doit contenir au moins 3 caractères',
  'description.minLength': 'La description doit contenir au moins 10 caractères',
  'min_people.min': 'Le nombre de personnes minimum doit être au moins 1',
  'price_per_people.min': 'Le prix ne peut pas être négatif',
  'price_per_people.decimal': 'Le prix doit avoir au maximum 2 décimales',
  'stock.min': 'Le stock ne peut pas être négatif',
})

createMenuValidator.messagesProvider = messages
updateMenuValidator.messagesProvider = messages

export type CreateMenuPayload = Infer<typeof createMenuValidator>
export type UpdateMenuPayload = Infer<typeof updateMenuValidator>
