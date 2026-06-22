import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const createNoticeValidator = vine.create({
  order_id: vine.string().uuid(),
  note: vine.number().min(1).max(5),
  description: vine.string().trim().minLength(10).maxLength(255),
})

const sharedMessages = new SimpleMessagesProvider({
  'note.min': 'La note doit être au minimum 1.',
  'note.max': 'La note doit être au maximum 5.',
  'note.number': 'Veuillez sélectionner une note.',
  'description.minLength': 'Le commentaire doit faire au moins 10 caractères.',
  'description.required': 'Le commentaire est obligatoire.',
})

createNoticeValidator.messagesProvider = sharedMessages

export type CreateNoticePayload = Infer<typeof createNoticeValidator>
