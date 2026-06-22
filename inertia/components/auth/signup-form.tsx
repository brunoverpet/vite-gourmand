import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@adonisjs/inertia/react'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { AddressFields } from '~/components/ui/address-fields'
import { useAddressAutocomplete } from '~/hooks/use-address-autocomplete'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    address,
    setAddress,
    city,
    setCity,
    setZipcode,
    suggestions,
    citySuggestions,
    fetchSuggestions,
    fetchCitySuggestions,
    selectAddress,
    selectCity,
  } = useAddressAutocomplete()

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="register">
        {({ errors }) => (
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                <Input
                  id="lastname"
                  autoComplete="family-name"
                  autoFocus
                  name="lastname"
                  type="text"
                  placeholder="Doe"
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
                  autoComplete="given-name"
                  placeholder="John"
                  required
                />
                <FieldError message={errors.firstname} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="adresse@exemple.com"
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
                placeholder="6 00 00 00 00"
                required
              />
              <FieldError message={errors.phone} />
            </Field>

            <AddressFields
              address={address}
              onAddressChange={(v) => { setAddress(v); fetchSuggestions(v) }}
              suggestions={suggestions}
              onSelectAddress={selectAddress}
              addressName="address"
              addressError={errors.address}
              city={city}
              onCityChange={(v) => { setCity(v); setZipcode(''); fetchCitySuggestions(v) }}
              citySuggestions={citySuggestions}
              onSelectCity={selectCity}
              cityName="city"
              cityError={errors.city}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••"
                  required
                />
                <FieldError message={errors.password} />
              </Field>
              <Field>
                <FieldLabel htmlFor="passwordConfirmation">Confirmation</FieldLabel>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="••••••••••"
                  required
                />
                <FieldError message={errors.passwordConfirmation} />
              </Field>
            </div>

            <p className="text-xs text-muted-foreground">
              Au moins 10 caractères, une majuscule et un caractère spécial.
            </p>

            <Button type="submit" className="w-full">
              Créer mon compte
            </Button>
          </FieldGroup>
        )}
      </Form>
    </div>
  )
}
