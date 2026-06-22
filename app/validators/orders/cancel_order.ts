import { ContactMode } from '#enums/contact_mode'
import vine from '@vinejs/vine'

export const cancelOrderValidator = vine.create({
  contactMode: vine.enum(ContactMode),
  cancellationReason: vine.string().minLength(10),
})
