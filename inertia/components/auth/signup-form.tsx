import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@adonisjs/inertia/react'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
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
                {errors.lastname && <div className="text-destructive text-sm">{errors.lastname}</div>}
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
                {errors.firstname && <div className="text-destructive text-sm">{errors.firstname}</div>}
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
              {errors.email && <div className="text-destructive text-sm">{errors.email}</div>}
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
              {errors.phone && <div className="text-destructive text-sm">{errors.phone}</div>}
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
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 top-full mt-1 w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
                    {suggestions.map((s, i) => (
                      <li key={`${s.fulltext}-${i}`}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => selectAddress(s)}
                        >
                          {s.fulltext}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.address && <div className="text-destructive text-sm">{errors.address}</div>}
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
                    setZipcode('')
                    fetchCitySuggestions(e.target.value)
                  }}
                />
                {citySuggestions.length > 0 && (
                  <ul className="absolute z-10 top-full mt-1 w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
                    {citySuggestions.map((s, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => selectCity(s)}
                        >
                          {s.fulltext}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.city && <div className="text-destructive text-sm">{errors.city}</div>}
            </Field>

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
                {errors.password && <div className="text-destructive text-sm">{errors.password}</div>}
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
                {errors.passwordConfirmation && (
                  <div className="text-destructive text-sm">{errors.passwordConfirmation}</div>
                )}
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
