import type { Data } from '@generated/data'
import { Link, Form } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { OrderFormRecap } from '~/components/orders/order-form-recap'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { AddressFields } from '~/components/ui/address-fields'
import { DateTimePickerField } from '~/components/ui/date-time-picker-field'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useAddressAutocomplete } from '~/hooks/use-address-autocomplete'

type Estimate = {
  distanceKm: number
  deliveryFee: number
  menuPrice: number
  total: number
  hasReduction: boolean
  savedAmount: number
} | null

type OrderFormProps = {
  menu: Data.Menus.Menu | null
  user: SharedProps['user']
  estimate?: Estimate
}

export function OrderForm({ menu, user, estimate }: OrderFormProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(String(menu?.minPeople ?? 1))
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleSubmit() {
    const errors: Record<string, string> = {}
    if (!date) errors.date = 'Veuillez sélectionner une date.'
    if (!zipcode || longitude === null || latitude === null)
      errors.address =
        'Veuillez sélectionner une adresse dans les suggestions pour calculer les frais de livraison.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      const firstKey = Object.keys(errors)[0]
      document
        .getElementById(firstKey === 'date' ? 'date-field' : 'delivery_address')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setFormErrors({})
    ;(document.getElementById('commande-form') as HTMLFormElement | null)?.requestSubmit()
  }
  const {
    address,
    setAddress,
    city,
    setCity,
    zipcode,
    setZipcode,
    longitude,
    latitude,
    suggestions,
    citySuggestions,
    fetchSuggestions,
    fetchCitySuggestions,
    selectAddress,
    selectCity,
  } = useAddressAutocomplete(user?.address ?? '', user?.city ?? '')

  useEffect(() => {
    const n = Number(numberOfPeople)
    if (longitude === null || latitude === null || !zipcode || !n || n < 1) return
    router.reload({
      only: ['estimate'],
      data: {
        longitude: String(longitude),
        latitude: String(latitude),
        zipcode,
        number_of_people: numberOfPeople,
      },
    })
  }, [numberOfPeople, longitude, latitude, zipcode])

  return (
    <div className="pb-32 md:pb-16 max-w-6xl mx-auto">
      <Link
        route="menus.render"
        className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Nos menus
      </Link>

      <h1 className="text-h1 mb-8">
        Commander <em>{menu?.title}</em>
      </h1>

      <div className="md:grid md:grid-cols-[1fr_360px] md:gap-10 md:items-start">
        <Form id="commande-form" route="order.store" className="flex flex-col gap-10">
          {menu && <input type="hidden" name="menu_id" value={menu.id} />}
          {longitude !== null && <input type="hidden" name="longitude" value={longitude} />}
          {latitude !== null && <input type="hidden" name="latitude" value={latitude} />}
          {zipcode && <input type="hidden" name="delivery_zipcode" value={zipcode} />}

          {menu && (
            <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-muted/30 md:hidden">
              {menu.pictures?.[0] && (
                <img
                  src={`/uploads/${menu.pictures[0].imagePath}`}
                  alt={menu.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-body font-medium">{menu.title}</p>
                <p className="text-body-sm text-muted-foreground">
                  {menu.pricePerPeople}€/pers · min. {menu.minPeople} personnes
                </p>
              </div>
            </div>
          )}

          <section className="mt-10">
            <h2 className="text-h3 mb-4">Date & lieu</h2>
            <FieldGroup>
              <DateTimePickerField
                date={date}
                onDateChange={setDate}
                hour={hour}
                minute={minute}
                onHourChange={setHour}
                onMinuteChange={setMinute}
                dateError={formErrors.date}
                dateFieldId="date-field"
                errorClassName="text-xs mt-1"
              />

              <AddressFields
                address={address}
                onAddressChange={(v) => {
                  setAddress(v)
                  fetchSuggestions(v)
                }}
                suggestions={suggestions}
                onSelectAddress={selectAddress}
                addressName="delivery_address"
                addressError={formErrors.address}
                city={city}
                onCityChange={(v) => {
                  setCity(v)
                  setZipcode('')
                  fetchCitySuggestions(v)
                }}
                citySuggestions={citySuggestions}
                onSelectCity={selectCity}
                cityName="delivery_city"
                required
                errorClassName="text-xs mt-1"
              />
            </FieldGroup>
          </section>

          <section>
            <h2 className="text-h3 mb-4">Vos informations</h2>
            <p className="text-body-sm text-muted-foreground mb-4">
              Ces informations sont reprises depuis votre compte.{' '}
              <Link route="profile.show" className="underline">
                Modifier mon profil
              </Link>
            </p>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Prénom</FieldLabel>
                  <Input value={user?.firstname ?? ''} readOnly disabled />
                </Field>
                <Field>
                  <FieldLabel>Nom</FieldLabel>
                  <Input value={user?.lastname ?? ''} readOnly disabled />
                </Field>
              </div>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input value={user?.email ?? ''} type="email" readOnly disabled />
              </Field>
              <Field>
                <FieldLabel>Téléphone</FieldLabel>
                <Input value={user?.phone ?? ''} readOnly disabled />
              </Field>
            </FieldGroup>
          </section>

          <div className="md:hidden">
            <OrderFormRecap
              menu={menu}
              numberOfPeople={numberOfPeople}
              estimate={estimate ?? null}
              onNumberOfPeopleChange={setNumberOfPeople}
              onSubmit={handleSubmit}
            />
          </div>
        </Form>

        <div className="hidden md:block md:sticky md:top-24">
          <OrderFormRecap
            menu={menu}
            numberOfPeople={numberOfPeople}
            estimate={estimate ?? null}
            onNumberOfPeopleChange={setNumberOfPeople}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button type="button" onClick={handleSubmit} size="lg" className="w-full">
          Valider la commande
        </Button>
      </div>
    </div>
  )
}
