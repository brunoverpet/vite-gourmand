import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const sharedMessages = new SimpleMessagesProvider({
  'password.regex':
    'Le mot de passe doit contenir au moins une majuscule, une minuscule et un caractère spécial.',
  'password.minLength': 'Le mot de passe doit faire au moins 10 caractères.',
  'email.unique': 'Cette adresse email est déjà utilisée.',
})

export const forgotPasswordValidator = vine.create({
  email: vine.string().email().maxLength(254),
})

forgotPasswordValidator.messagesProvider = sharedMessages

export const resetPasswordValidator = vine.create({
  password: vine
    .string()
    .trim()
    .minLength(10)
    .maxLength(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_#-+=\[\]]).+$/),
})

resetPasswordValidator.messagesProvider = sharedMessages
