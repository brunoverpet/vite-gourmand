import type { Data } from '@generated/data'
import { Link, Form } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowLeft, CalendarIcon, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { SuggestionDropdown } from '~/components/ui/suggestion-dropdown'
import { TimePicker } from '~/components/ui/time-picker'
import { cn } from '@/lib/utils'
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
  const [minWarning, setMinWarning] = useState(false)
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

  const recap = (
    <div className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-4 mt-10">
      {menu && (
        <div className="flex items-start gap-3 pb-4 border-b border-border">
          {menu.pictures?.[0] && (
            <img
              src={`/uploads/${menu.pictures[0].imagePath}`}
              alt={menu.title}
              className="w-14 h-14 rounded-lg object-cover shrink-0"
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

      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
        <label
          htmlFor="number_of_people"
          className="text-body-sm text-muted-foreground flex items-center gap-2 shrink-0"
        >
          <Users className="w-4 h-4" />
          Personnes
        </label>
        <div className="flex items-center gap-2">
          <div className="w-24">
            <Input
              id="number_of_people"
              name="number_of_people"
              type="number"
              min={menu?.minPeople ?? 1}
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              onBlur={(e) => {
                const min = menu?.minPeople ?? 1
                const val = Number(e.target.value)
                if (!val || val < min) {
                  setNumberOfPeople(String(min))
                  setMinWarning(true)
                  setTimeout(() => setMinWarning(false), 3000)
                }
              }}
              required
            />
          </div>
        </div>
      </div>
      {minWarning && (
        <p className="text-xs text-amber-700 -mt-2 animate-in fade-in duration-300">
          Minimum {menu?.minPeople} personnes — valeur corrigée.
        </p>
      )}

      <div className="flex flex-col gap-3 text-body-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {menu ? `${menu.title} × ${numberOfPeople} pers.` : '—'}
          </span>
          <span>{estimate ? `${estimate.menuPrice.toFixed(2)}€` : '—'}</span>
        </div>
        {estimate?.hasReduction && (
          <div className="flex justify-between text-green-600">
            <span>Réduction -10%</span>
            <span>-{estimate.savedAmount.toFixed(2)}€</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Frais de livraison{estimate ? ` · ${estimate.distanceKm} km` : ''}
          </span>
          <span className="text-muted-foreground text-right text-xs">
            {estimate ? `${estimate.deliveryFee.toFixed(2)}€` : 'à confirmer'}
          </span>
        </div>
        <hr className="border-border my-1" />
        <div className="flex justify-between font-medium text-body">
          <span>Total TTC</span>
          <span className="text-accent">{estimate ? `${estimate.total.toFixed(2)}€` : '—'}</span>
        </div>
      </div>

      <Button type="button" onClick={handleSubmit} size="lg" className="w-full mt-2">
        Valider la commande
      </Button>
    </div>
  )

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
              <div className="grid grid-cols-2 gap-4">
                <Field id="date-field">
                  <FieldLabel>Date</FieldLabel>
                  <input
                    type="hidden"
                    name="event_date"
                    value={date ? format(date, 'yyyy-MM-dd') : ''}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-left text-sm flex items-center gap-2 transition-colors',
                          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 shrink-0" />
                        {date ? format(date, 'd MMM yyyy', { locale: fr }) : 'Choisir'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError message={formErrors.date} className="text-xs mt-1" />
                </Field>

                <Field>
                  <FieldLabel>Heure</FieldLabel>
                  <input type="hidden" name="delivery_time" value={`${hour}:${minute}`} />
                  <TimePicker
                    hour={hour}
                    minute={minute}
                    onHourChange={setHour}
                    onMinuteChange={setMinute}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="delivery_address">Adresse</FieldLabel>
                <div className="relative">
                  <Input
                    id="delivery_address"
                    name="delivery_address"
                    type="text"
                    value={address}
                    placeholder="12 rue des Quinconces"
                    required
                    autoComplete="off"
                    onChange={(e) => {
                      setAddress(e.target.value)
                      fetchSuggestions(e.target.value)
                    }}
                  />
                  <SuggestionDropdown suggestions={suggestions} onSelect={selectAddress} />
                </div>
                <FieldError message={formErrors.address} className="text-xs mt-1" />
              </Field>

              <Field>
                <FieldLabel htmlFor="delivery_city">Ville</FieldLabel>
                <div className="relative">
                  <Input
                    id="delivery_city"
                    name="delivery_city"
                    type="text"
                    placeholder="Bordeaux"
                    value={city}
                    autoComplete="off"
                    onChange={(e) => {
                      setCity(e.target.value)
                      setZipcode('')
                      fetchCitySuggestions(e.target.value)
                    }}
                    required
                  />
                  <SuggestionDropdown suggestions={citySuggestions} onSelect={selectCity} />
                </div>
              </Field>
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

          <div className="md:hidden">{recap}</div>
        </Form>

        <div className="hidden md:block md:sticky md:top-24">{recap}</div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button type="button" onClick={handleSubmit} size="lg" className="w-full">
          Valider la commande
        </Button>
      </div>
    </div>
  )
}
