import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="request_password_reset">
        {({ errors }) => (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoFocus
                placeholder="adresse@exemple.com"
                data-invalid={errors.email ? 'true' : undefined}
                autoComplete="email"
                required
              />
              {errors.email && <div className="text-destructive text-sm">{errors.email}</div>}
            </Field>
            <Field>
              <Button type="submit">Réinitialiser mon mot de passe</Button>
            </Field>
            <FieldSeparator />
          </FieldGroup>
        )}
      </Form>
      <Field className="flex items-center">
        <Button variant="outline" type="button" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
      </Field>
    </div>
  )
}
