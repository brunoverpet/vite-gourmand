import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

const sharedMessages = new SimpleMessagesProvider({
  'title.minLength': 'Le titre doit contenir au moins 5 caractères',
  'title.maxLength': 'Le titre doit contenir au maximum 120 caractères',
  'description.minLength': 'La description doit contenir au moins 5 caractères',
  'description.maxLength': 'La description doit contenir au maximum 2000 caractères',
  'email.email': "L'adresse mail doit être un mail valide.",
})

export const createContactValidator = vine.create({
  title: vine.string().minLength(5).maxLength(120),
  description: vine.string().minLength(5).maxLength(2000),
  email: vine.string().email().maxLength(254),
})

createContactValidator.messagesProvider = sharedMessages

export type ContactPayload = Infer<typeof createContactValidator>
