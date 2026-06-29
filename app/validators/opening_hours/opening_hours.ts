import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const updateOpeningHoursValidator = vine.create({
  hours: vine.array(
    vine.object({
      id: vine.string().uuid(),
      openTime: vine
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
      closeTime: vine
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
      isClosed: vine.boolean().optional(),
    })
  ),
})

updateOpeningHoursValidator.messagesProvider = new SimpleMessagesProvider({
  'id.required': "L'identifiant est obligatoire.",
  'id.uuid': "L'identifiant est invalide.",
  'openTime.regex': "L'heure d'ouverture doit être au format HH:MM.",
  'closeTime.regex': "L'heure de fermeture doit être au format HH:MM.",
  'isClosed.boolean': 'La valeur du champ "Fermé" est invalide.',
})

export type UpdateOpeningHoursPayload = Infer<typeof updateOpeningHoursValidator>
