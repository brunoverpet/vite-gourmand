import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'

export function ProfilePasswordForm() {
  return (
    <Form method="patch" action="/dashboard/profile/password">
      {({ errors }) => (
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <FieldError message={errors.password} />
          </Field>

          <Field>
            <FieldLabel htmlFor="passwordConfirmation">Confirmer le mot de passe</FieldLabel>
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              required
            />
            <FieldError message={errors.passwordConfirmation} />
          </Field>

          <Button type="submit" className="sm:w-fit sm:self-start sm:h-10">
            Mettre à jour
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
