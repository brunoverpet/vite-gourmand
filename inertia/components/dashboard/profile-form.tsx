import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { PhoneInput } from '~/components/ui/phone-input'
import type { Data } from '@generated/data'

type ProfileFormProps = {
  user: Data.SharedProps['user']
}

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <Form route="profile.update">
      {({ errors }) => (
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="lastname">Nom</FieldLabel>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                defaultValue={user?.lastname ?? ''}
                autoComplete="family-name"
                required
              />
              <FieldError message={errors.lastname} />
            </Field>
            <Field>
              <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                defaultValue={user?.firstname ?? ''}
                autoComplete="given-name"
                required
              />
              <FieldError message={errors.firstname} />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email ?? ''}
              autoComplete="email"
              required
            />
            <FieldError message={errors.email} />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
            <PhoneInput
              id="phone"
              name="phone"
              autoComplete="tel"
              defaultValue={user?.phone ?? undefined}
              required
            />
            <FieldError message={errors.phone} />
          </Field>

          <Button type="submit" className="sm:w-auto">
            Enregistrer
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
