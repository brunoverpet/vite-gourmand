'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@adonisjs/inertia/react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { GalleryVerticalEndIcon } from 'lucide-react'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="register.store">
        {({ errors }) => (
          <>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <a href="#" className="flex flex-col items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEndIcon className="size-6" />
                  </div>
                  <span className="sr-only">Vite & Gourmand.</span>
                </a>
                <h1 className="text-xl font-bold">Bienvenue chez Vite & Gourmand.</h1>
                <FieldDescription>
                  Vous possédez déjà un compte? <a href="/login">Se connecter</a>
                </FieldDescription>
              </div>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                  <Input id="lastname" name="lastname" type="text" placeholder="Doe" required />
                  {errors.lastname && <div className="text-destructive">{errors.lastname}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                  <Input id="firstname" name="firstname" type="text" placeholder="John" required />
                  {errors.firstname && <div className="text-destructive">{errors.firstname}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="adresse@exemple.com"
                    required
                  />
                  {errors.email && <div className="text-destructive">{errors.email}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Votre nouveau mot de passe"
                    required
                  />
                  {errors.password && <div className="text-destructive">{errors.password}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="passwordConfirmation">
                    Confirmation du mot de passe
                  </FieldLabel>
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confimation nouveau mot de passe"
                    required
                  />
                </Field>
                {errors.passwordConfirmation && (
                  <div className="text-destructive">{errors.passwordConfirmation}</div>
                )}

                {!errors.confirmPassword && (
                  <FieldDescription>Doit comporter au moins 10 caractères.</FieldDescription>
                )}
                <Button type="submit">Créer mon compte</Button>
              </FieldGroup>

              <FieldSeparator />
            </FieldGroup>
          </>
        )}
      </Form>
      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez nos <a href="#">conditions d’utilisation</a> et
        notre <a href="#">politique de confidentialité</a>.
      </FieldDescription>
    </div>
  )
}
