import { Field, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { SuggestionDropdown } from '~/components/ui/suggestion-dropdown'
import type { AddressSuggestion, CitySuggestion } from '~/hooks/use-address-autocomplete'

type Props = {
  address: string
  onAddressChange: (value: string) => void
  suggestions: AddressSuggestion[]
  onSelectAddress: (s: AddressSuggestion) => void
  addressName?: string
  addressError?: string | null

  city: string
  onCityChange: (value: string) => void
  citySuggestions: CitySuggestion[]
  onSelectCity: (s: CitySuggestion) => void
  cityName?: string
  cityError?: string | null

  required?: boolean
  errorClassName?: string
}

export function AddressFields({
  address,
  onAddressChange,
  suggestions,
  onSelectAddress,
  addressName,
  addressError,
  city,
  onCityChange,
  citySuggestions,
  onSelectCity,
  cityName,
  cityError,
  required,
  errorClassName,
}: Props) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor={addressName}>Adresse</FieldLabel>
        <div className="relative">
          <Input
            id={addressName}
            name={addressName}
            type="text"
            value={address}
            placeholder="12 rue des Quinconces"
            autoComplete="off"
            required={required}
            onChange={(e) => onAddressChange(e.target.value)}
          />
          <SuggestionDropdown suggestions={suggestions} onSelect={onSelectAddress} />
        </div>
        <FieldError message={addressError} className={errorClassName} />
      </Field>

      <Field>
        <FieldLabel htmlFor={cityName}>Ville</FieldLabel>
        <div className="relative">
          <Input
            id={cityName}
            name={cityName}
            type="text"
            value={city}
            placeholder="Bordeaux"
            autoComplete="off"
            required={required}
            onChange={(e) => onCityChange(e.target.value)}
          />
          <SuggestionDropdown suggestions={citySuggestions} onSelect={onSelectCity} />
        </div>
        <FieldError message={cityError} className={errorClassName} />
      </Field>
    </>
  )
}
