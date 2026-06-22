import { Form } from '@adonisjs/inertia/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { CalendarIcon, Users } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { AddressFields } from '~/components/ui/address-fields'
import { TimePicker } from '~/components/ui/time-picker'
import { useAddressAutocomplete } from '~/hooks/use-address-autocomplete'
import { cn } from '@/lib/utils'
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

export function EditOrderDialog({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  const [numberOfPeople, setNumberOfPeople] = useState(String(order.numberOfPeople))
  const [minWarning, setMinWarning] = useState(false)

  const initialDate = order.eventDate ? new Date(order.eventDate) : undefined
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [hour, setHour] = useState(order.deliveryTime?.slice(0, 2) ?? '12')
  const [minute, setMinute] = useState(order.deliveryTime?.slice(3, 5) ?? '00')

  const {
    address,
    setAddress,
    city,
    setCity,
    zipcode,
    longitude,
    latitude,
    suggestions,
    citySuggestions,
    fetchSuggestions,
    fetchCitySuggestions,
    selectAddress,
    selectCity,
  } = useAddressAutocomplete(order.deliveryAddress ?? '', order.deliveryCity ?? '')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg overflow-visible">
        <DialogHeader>
          <DialogTitle>Modifier la commande</DialogTitle>
        </DialogHeader>

        <Form
          route="client_orders.update"
          routeParams={{ id: order.id }}
          className="flex flex-col gap-4 mt-2"
        >
          {({ errors }) => (
            <>
              <input type="hidden" name="event_date" value={date ? format(date, 'yyyy-MM-dd') : ''} />
              <input type="hidden" name="delivery_time" value={`${hour}:${minute}`} />
              <input type="hidden" name="delivery_address" value={address} />
              <input type="hidden" name="delivery_city" value={city} />
              {zipcode && <input type="hidden" name="delivery_zipcode" value={zipcode} />}
              {longitude !== null && <input type="hidden" name="longitude" value={longitude} />}
              {latitude !== null && <input type="hidden" name="latitude" value={latitude} />}

              <FieldGroup>
                <Field>
                  <FieldLabel>Nombre de personnes</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                    <Input
                      type="number"
                      name="number_of_people"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      onBlur={(e) => {
                        const min = order.menuMinPeople ?? 1
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
                  {minWarning && (
                    <p className="text-xs text-amber-700 animate-in fade-in duration-300">
                      Minimum {order.menuMinPeople} personnes — valeur corrigée.
                    </p>
                  )}
                  <FieldError message={errors.number_of_people} />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Date</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            'h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-left text-sm flex items-center gap-2',
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
                    <FieldError message={errors.event_date} />
                  </Field>

                  <Field>
                    <FieldLabel>Heure</FieldLabel>
                    <TimePicker
                      hour={hour}
                      minute={minute}
                      onHourChange={setHour}
                      onMinuteChange={setMinute}
                    />
                  </Field>
                </div>

                <AddressFields
                  address={address}
                  onAddressChange={(v) => { setAddress(v); fetchSuggestions(v) }}
                  suggestions={suggestions}
                  onSelectAddress={selectAddress}
                  addressError={errors.delivery_address}
                  city={city}
                  onCityChange={(v) => { setCity(v); fetchCitySuggestions(v) }}
                  citySuggestions={citySuggestions}
                  onSelectCity={selectCity}
                  cityError={errors.delivery_city}
                />
              </FieldGroup>

              <Button type="submit" className="w-full">
                Enregistrer les modifications
              </Button>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
