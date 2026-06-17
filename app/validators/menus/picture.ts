import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const uploadPictureValidator = vine.create({
  picture: vine.file({
    size: '2mb',
    extnames: ['png', 'jpg', 'jpeg', 'webp'],
  }),
})

const sharedMessages = new SimpleMessagesProvider({
  'file': 'Le champ {{ field }} doit être un fichier valide',
  'file.size': 'Le fichier ne doit pas dépasser 2 Mo',
  'file.extnames': 'Le fichier doit être au format : png, jpg, jpeg ou webp',
})

uploadPictureValidator.messagesProvider = sharedMessages

export type UploadPicturePayload = Infer<typeof uploadPictureValidator>
