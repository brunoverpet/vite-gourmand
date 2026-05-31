import { Roles } from '#enums/roles'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

// =============================================================================
// 1. BASE RULES & SHARED FIELDS
// =============================================================================
const email = () => vine.string().email().maxLength(254)

const password = () =>
  vine
    .string()
    .trim()
    .minLength(10)
    .maxLength(32)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_#-+=\[\]]).+$/)

const sharedUserSchema = {
  lastname: vine.string().minLength(3).maxLength(20),
  firstname: vine.string().minLength(3).maxLength(20),
}

// =============================================================================
// 2. CENTRALIZED ERROR MESSAGES
// =============================================================================
const sharedMessages = new SimpleMessagesProvider({
  'password.regex':
    'Le mot de passe doit contenir au moins une majuscule, une minuscule et un caractère spécial.',
  'password.minLength': 'Le mot de passe doit faire au moins 10 caractères.',
  'email.unique': 'Cette adresse email est déjà utilisée.',
})

// =============================================================================
// 3. VALIDATOR COMPILATION
// =============================================================================

/**
 * Validator for public self-registration (Clients)
 */
export const registerValidator = vine.create({
  ...sharedUserSchema,
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
})
registerValidator.messagesProvider = sharedMessages

/**
 * Validator for backoffice user creation (Admin/Manager)
 */
export const adminCreateUserValidator = vine.create({
  ...sharedUserSchema,
  email: email().unique({ table: 'users', column: 'email' }),
  password: password().confirmed({
    confirmationField: 'passwordConfirmation',
  }),
  roleLabel: vine.enum(Object.values(Roles)),
})
adminCreateUserValidator.messagesProvider = sharedMessages

// =============================================================================
// 4. EXPORTED TYPES
// =============================================================================
export type RegisterPayload = Infer<typeof registerValidator>
export type AdminCreateUserPayload = Infer<typeof adminCreateUserValidator>
