import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'

interface ResetPasswordFormProps extends React.ComponentProps<'div'> {
  id: string
}

export function ResetPasswordForm({ id, className, ...props }: ResetPasswordFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="reset_password" routeParams={{ id }}>
        {({ errors }) => (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Votre nouveau mot de passe"
                autoComplete="new-password"
                data-invalid={errors.password ? 'true' : undefined}
                required
              />
              <FieldError message={errors.password} />
            </Field>

            <Field>
              <FieldLabel htmlFor="passwordConfirmation">Confirmation du Mot de passe</FieldLabel>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirmation du nouveau mot de passe"
                required
                autoComplete="new-password"
              />
              <FieldError message={errors.passwordConfirmation} />
            </Field>

            <Button type="submit">Changer le mot de passe</Button>

            <FieldSeparator />

            <Button variant="outline" type="button" asChild>
              <Link route="session.render">Se connecter</Link>
            </Button>
          </FieldGroup>
        )}
      </Form>
    </div>
  )
}
