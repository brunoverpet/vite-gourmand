import { useState } from 'react'
import { Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { Data } from '@generated/data'

type Estimate = {
  distanceKm: number
  deliveryFee: number
  menuPrice: number
  total: number
  hasReduction: boolean
  savedAmount: number
} | null

type Props = {
  menu: Data.Menus.Menu | null
  numberOfPeople: string
  estimate: Estimate
  onNumberOfPeopleChange: (v: string) => void
  onSubmit: () => void
}

export function OrderFormRecap({
  menu,
  numberOfPeople,
  estimate,
  onNumberOfPeopleChange,
  onSubmit,
}: Props) {
  const [minWarning, setMinWarning] = useState(false)

  return (
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
        <div className="w-24">
          <Input
            id="number_of_people"
            name="number_of_people"
            type="number"
            min={menu?.minPeople ?? 1}
            value={numberOfPeople}
            onChange={(e) => onNumberOfPeopleChange(e.target.value)}
            onBlur={(e) => {
              const min = menu?.minPeople ?? 1
              const val = Number(e.target.value)
              if (!val || val < min) {
                onNumberOfPeopleChange(String(min))
                setMinWarning(true)
                setTimeout(() => setMinWarning(false), 3000)
              }
            }}
            required
          />
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
          <span className="text-accent-text">{estimate ? `${estimate.total.toFixed(2)}€` : '—'}</span>
        </div>
      </div>

      <Button type="button" onClick={onSubmit} size="lg" className="w-full mt-2">
        Valider la commande
      </Button>
    </div>
  )
}
