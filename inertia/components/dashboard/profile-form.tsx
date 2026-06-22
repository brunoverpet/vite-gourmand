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

          <AddressFields
            address={address}
            onAddressChange={(v) => {
              setAddress(v)
              fetchSuggestions(v)
            }}
            suggestions={suggestions}
            onSelectAddress={selectAddress}
            addressName="address"
            addressError={errors.address}
            city={city}
            onCityChange={(v) => {
              setCity(v)
              fetchCitySuggestions(v)
            }}
            citySuggestions={citySuggestions}
            onSelectCity={selectCity}
            cityName="city"
            cityError={errors.city}
            required
          />

          <Button type="submit" className="sm:w-auto">
            Enregistrer
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
