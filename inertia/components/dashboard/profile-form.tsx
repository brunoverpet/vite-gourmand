import { useState } from 'react'
import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { PhoneInput } from '~/components/ui/phone-input'
import { AddressFields } from '~/components/ui/address-fields'
import { useAddressAutocomplete } from '~/hooks/use-address-autocomplete'
import type { Data } from '@generated/data'

type ProfileFormProps = {
  user: Data.SharedProps['user']
}

export function ProfileForm({ user }: ProfileFormProps) {
  const initial = {
    lastname: user?.lastname ?? '',
    firstname: user?.firstname ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    city: user?.city ?? '',
  }

  const [values, setValues] = useState(initial)

  const isDirty = Object.keys(initial).some(
    (key) => values[key as keyof typeof initial] !== initial[key as keyof typeof initial]
  )

  const {
    address,
    setAddress,
    city,
    setCity,
    suggestions,
    citySuggestions,
    fetchSuggestions,
    fetchCitySuggestions,
    selectAddress,
    selectCity,
  } = useAddressAutocomplete(user?.address ?? '', user?.city ?? '')

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
                defaultValue={initial.lastname}
                autoComplete="family-name"
                required
                onChange={(e) => setValues((v) => ({ ...v, lastname: e.target.value }))}
              />
              <FieldError message={errors.lastname} />
            </Field>
            <Field>
              <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                defaultValue={initial.firstname}
                autoComplete="given-name"
                required
                onChange={(e) => setValues((v) => ({ ...v, firstname: e.target.value }))}
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
              defaultValue={initial.email}
              autoComplete="email"
              required
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
            <FieldError message={errors.email} />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
            <PhoneInput
              id="phone"
              name="phone"
              autoComplete="tel"
              defaultValue={initial.phone || undefined}
              required
              onValueChange={(val) => setValues((v) => ({ ...v, phone: val }))}
            />
            <FieldError message={errors.phone} />
          </Field>

          <AddressFields
            address={address}
            onAddressChange={(val) => {
              setAddress(val)
              fetchSuggestions(val)
              setValues((v) => ({ ...v, address: val }))
            }}
            suggestions={suggestions}
            onSelectAddress={(s) => {
              selectAddress(s)
              setValues((v) => ({ ...v, address: s.fulltext }))
            }}
            addressName="address"
            addressError={errors.address}
            city={city}
            onCityChange={(val) => {
              setCity(val)
              fetchCitySuggestions(val)
              setValues((v) => ({ ...v, city: val }))
            }}
            citySuggestions={citySuggestions}
            onSelectCity={(s) => {
              selectCity(s)
              setValues((v) => ({ ...v, city: s.fulltext }))
            }}
            cityName="city"
            cityError={errors.city}
            required
          />

          <Button
            type="submit"
            disabled={!isDirty}
            tooltip="Modifiez au moins un champ pour enregistrer"
            className="sm:w-fit sm:self-start"
          >
            Enregistrer
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
