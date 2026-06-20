import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@adonisjs/inertia/react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
          <>
            <FieldGroup>
              <FieldGroup>
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
                  {errors.lastname && <div className="text-destructive">{errors.lastname}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                  <Input id="firstname" name="firstname" type="text" placeholder="John" required />
                  {errors.firstname && <div className="text-destructive">{errors.firstname}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="adresse@exemple.com"
                    required
                  />
                  {errors.email && <div className="text-destructive">{errors.email}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="06 00 00 00 00"
                    required
                  />
                  {errors.phone && <div className="text-destructive">{errors.phone}</div>}
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
                  {errors.address && <div className="text-destructive">{errors.address}</div>}
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
                  {errors.city && <div className="text-destructive">{errors.city}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Votre nouveau mot de passe"
                    required
                  />
                  {errors.password && <div className="text-destructive">{errors.password}</div>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="passwordConfirmation">
                    Confirmation du mot de passe
                  </FieldLabel>
                  <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confimation nouveau mot de passe"
                    required
                  />
                </Field>
                {errors.passwordConfirmation && (
                  <div className="text-destructive">{errors.passwordConfirmation}</div>
                )}

                {!errors.confirmPassword && (
                  <FieldDescription>Doit comporter au moins 10 caractères.</FieldDescription>
                )}
                <Button type="submit">Créer mon compte</Button>
              </FieldGroup>

              <FieldSeparator />
            </FieldGroup>
          </>
        )}
      </Form>
    </div>
  )
}
