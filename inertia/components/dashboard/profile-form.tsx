import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { PhoneInput } from '~/components/ui/phone-input'
import { SuggestionDropdown } from '~/components/ui/suggestion-dropdown'
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

          <Field>
            <FieldLabel htmlFor="address">Adresse</FieldLabel>
            <div className="relative">
              <Input
                id="address"
                name="address"
                type="text"
                value={address}
                placeholder="12 rue des Quinconces"
                autoComplete="off"
                required
                onChange={(e) => {
                  setAddress(e.target.value)
                  fetchSuggestions(e.target.value)
                }}
              />
              <SuggestionDropdown suggestions={suggestions} onSelect={selectAddress} />
            </div>
            <FieldError message={errors.address} />
          </Field>

          <Field>
            <FieldLabel htmlFor="city">Ville</FieldLabel>
            <div className="relative">
              <Input
                id="city"
                name="city"
                type="text"
                value={city}
                placeholder="Bordeaux"
                autoComplete="off"
                required
                onChange={(e) => {
                  setCity(e.target.value)
                  fetchCitySuggestions(e.target.value)
                }}
              />
              <SuggestionDropdown suggestions={citySuggestions} onSelect={selectCity} />
            </div>
            <FieldError message={errors.city} />
          </Field>

          <Button type="submit" className="sm:w-auto">
            Enregistrer
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
