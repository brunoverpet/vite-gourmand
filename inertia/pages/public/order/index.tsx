import type { Data } from '@generated/data'
import { Link, Form } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ArrowLeft, CalendarIcon, Clock, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { cn } from '@/lib/utils'
import type { InertiaProps } from '~/types'

type Estimate = {
  distanceKm: number
  deliveryFee: number
  menuPrice: number
  total: number
  hasReduction: boolean
  savedAmount: number
} | null

type CommandeProps = InertiaProps<{
  menu: Data.Menus.Menu | null
  estimate?: Estimate
}>

export default function Commande({ menu, user, estimate }: CommandeProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(String(menu?.minPeople ?? 1))
  const [minWarning, setMinWarning] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [suggestions, setSuggestions] = useState<
    { fulltext: string; x: number; y: number; city: string; zipcode: string }[]
  >([])

  const [citySuggestions, setCitySuggestions] = useState<
    { fulltext: string; city: string; zipcode: string }[]
  >([])
  const [longitude, setLongitude] = useState<number | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)

  async function AutoComplete(value: string) {
    if (value.length < 3) {
      setSuggestions([])
      return
    }
    const zipcodeParam = zipcode ? `&zipcode=${zipcode}` : ''
    const response = await fetch(
      `https://data.geopf.fr/geocodage/completion/?text=${encodeURIComponent(value)}&terr=METROPOLE&maximumResponses=10${zipcodeParam}`
    )
    const data = await response.json()
    setSuggestions(data.results ?? [])
  }

  function selectSuggestion(suggestion: {
    fulltext: string
    x: number
    y: number
    city: string
    zipcode: string
  }) {
    setAddress(suggestion.fulltext ?? '')
    setCity(suggestion.city ?? '')
    setZipcode(suggestion.zipcode ?? '')
    setLongitude(suggestion.x)
    setLatitude(suggestion.y)
    setSuggestions([])
  }

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

  async function cityAutoComplete(value: string) {
    if (value.length < 3) {
      setCitySuggestions([])
      return
    }
    const response = await fetch(
      `https://data.geopf.fr/geocodage/completion/?text=${encodeURIComponent(value)}&type=PositionOfInterest&terr=METROPOLE&maximumResponses=8`
    )
    const data = await response.json()
    setCitySuggestions(data.results ?? [])
  }

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
          <span>Total estimé</span>
          <span className="text-accent">{estimate ? `${estimate.total.toFixed(2)}€` : '—'}</span>
        </div>
      </div>

      <Button type="submit" form="commande-form" size="lg" className="w-full mt-2">
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
          {/* Carte menu mobile uniquement */}
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

          {/* Date & lieu */}
          <section className="mt-10">
            <h2 className="text-h3 mb-4">Date & lieu</h2>
            <FieldGroup>
              {/* Date via Calendar */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
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
                </Field>

                <Field>
                  <FieldLabel>Heure</FieldLabel>
                  <input type="hidden" name="delivery_time" value={`${hour}:${minute}`} />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-left text-sm flex items-center gap-2 transition-colors',
                          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none'
                        )}
                      >
                        <Clock className="w-4 h-4 shrink-0" />
                        {hour}h{minute}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <div className="flex gap-3">
                        <Select value={hour} onValueChange={setHour}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 15 }, (_, i) =>
                              String(i + 8).padStart(2, '0')
                            ).map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}h
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={minute} onValueChange={setMinute}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {['00', '15', '30', '45'].map((m) => (
                              <SelectItem key={m} value={m}>
                                {m} min
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                      AutoComplete(e.target.value)
                    }}
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 top-full mt-1 w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
                      {suggestions.map((s, i) => (
                        <li key={`${s.fulltext}-${i}`}>
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => selectSuggestion(s)}
                          >
                            {s.fulltext}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
                      cityAutoComplete(e.target.value)
                    }}
                    required
                  />
                  {citySuggestions.length > 0 && (
                    <ul className="absolute z-10 top-full mt-1 w-full rounded-lg border border-border bg-background shadow-md overflow-hidden">
                      {citySuggestions.map((s, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                            onClick={() => {
                              setCity(s.city ?? '')
                              setZipcode(s.zipcode ?? '')
                              setCitySuggestions([])
                            }}
                          >
                            {s.fulltext}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>
            </FieldGroup>
          </section>

          {/* Infos client */}
          <section>
            <h2 className="text-h3 mb-4">Vos informations</h2>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                  <Input
                    id="firstname"
                    defaultValue={user?.firstname}
                    name="firstname"
                    type="text"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                  <Input
                    id="lastname"
                    defaultValue={user?.lastname}
                    name="lastname"
                    type="text"
                    required
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" defaultValue={user?.email} name="email" type="email" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
                <Input id="phone" name="phone" type="tel" placeholder="06 00 00 00 00" required />
              </Field>
            </FieldGroup>
          </section>

          {/* Récap mobile uniquement (en bas du form) */}
          <div className="md:hidden">{recap}</div>
        </Form>

        {/* Récap sticky desktop */}
        <div className="hidden md:block md:sticky md:top-24">{recap}</div>
      </div>

      {/* CTA sticky mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button type="submit" form="commande-form" size="lg" className="w-full">
          Valider la commande
        </Button>
      </div>
    </div>
  )
}
