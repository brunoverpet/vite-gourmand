import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="session">
        {({ errors }) => (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="adresse@exemple.com"
                autoComplete="email"
                data-invalid={errors.email ? 'true' : undefined}
                required
              />
              <FieldError message={errors.email} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Votre nouveau mot de passe"
                required
                autoComplete="current-password"
              />
              <FieldError message={errors.password} />
            </Field>

            <Button type="submit" className="sm:w-fit sm:mx-auto">
              Se connecter
            </Button>

            <FieldSeparator />

            <Button variant="outline" type="button" className="sm:w-fit sm:mx-auto" asChild>
              <Link route="request_password_reset.show">Mot de passe oublié</Link>
            </Button>
          </FieldGroup>
        )}
      </Form>
    </div>
  )
}
