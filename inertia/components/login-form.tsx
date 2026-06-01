'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { GalleryVerticalEndIcon } from 'lucide-react'
import { Form } from '@adonisjs/inertia/react'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="session.store">
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
                  Pas encore de compte ? <a href="/signup">S&apos;inscrire</a>
                </FieldDescription>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="adresse@exemple.com"
                  autoComplete="email"
                  data-invalid={errors.email ? 'true' : undefined}
                  required
                />
                {errors.email && <div>{errors.email}</div>}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Votre nouveau mot de passe"
                  required
                  autoComplete="current-password"
                />
                {errors.password && <div>{errors.password}</div>}
              </Field>
              <Field>
                <Button type="submit">Se connecter</Button>
              </Field>
              <FieldSeparator />
              <Field className="flex items-center">
                <Button variant="outline" type="button">
                  Mot de passe oublié
                </Button>
                {/*   <Button variant="outline" type="button"> */}
                {/*     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> */}
                {/*       <path */}
                {/*         d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" */}
                {/*         fill="currentColor" */}
                {/*       /> */}
                {/*     </svg> */}
                {/*     Continue with Google */}
                {/*   </Button> */}
              </Field>
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
