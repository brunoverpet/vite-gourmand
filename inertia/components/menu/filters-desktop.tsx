import type { Data } from '@generated/data'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Slider } from '~/components/ui/slider'

export type FiltersDesktopProps = {
  diets: Data.Menus.Diet[]
  themes: Data.Menus.Theme[]
  selectedDiets: string[]
  selectedThemes: string[]
  priceMin: string
  priceMax: string
  minPeople: number
  onToggleDiet: (label: string) => void
  onToggleTheme: (label: string) => void
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
  onMinPeopleChange: (value: number) => void
  onReset: () => void
}

export default function FiltersDesktop({
  diets,
  themes,
  selectedDiets,
  selectedThemes,
  priceMin,
  priceMax,
  minPeople,
  onToggleDiet,
  onToggleTheme,
  onPriceMinChange,
  onPriceMaxChange,
  onMinPeopleChange,
  onReset,
}: FiltersDesktopProps) {
  const [draggingValue, setDraggingValue] = useState<number | null>(null)
  const displayValue = draggingValue ?? minPeople

  const hasActive =
    selectedDiets.length > 0 ||
    selectedThemes.length > 0 ||
    priceMin !== '' ||
    priceMax !== '' ||
    minPeople > 1

  return (
    <aside className="hidden md:block sticky top-24 self-start shrink-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h4">Filtres</h2>
        <Button variant="outline" size="sm" onClick={onReset} disabled={!hasActive}>
          Réinitialiser
        </Button>
      </div>

      <div className="divide-y divide-border">
        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-4">Nombre de personnes minimum</p>
          <Slider
            min={1}
            max={50}
            step={1}
            value={[displayValue]}
            onValueChange={([val]) => setDraggingValue(val)}
            onValueCommit={([val]) => {
              setDraggingValue(null)
              onMinPeopleChange(val)
            }}
            className="mb-2"
          />
          <p className="text-body-sm text-muted-foreground mt-3">
            {displayValue > 1 ? `${displayValue} personnes minimum` : 'Tous'}
          </p>
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Prix / personne</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <p className="text-body-sm text-muted-foreground mb-1">Min</p>
              <Input
                type="number"
                placeholder="0€"
                value={priceMin}
                onChange={(e) => onPriceMinChange(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <p className="text-body-sm text-muted-foreground mb-1">Max</p>
              <Input
                type="number"
                placeholder="200€"
                value={priceMax}
                onChange={(e) => onPriceMaxChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Thèmes</p>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => {
              const active = selectedThemes.includes(theme.label)
              return (
                <Badge
                  key={theme.id}
                  variant={active ? 'default' : 'outline'}
                  className={`px-3 py-4 cursor-pointer gap-1 transition-all duration-200 ${active ? 'hover:bg-primary/80' : 'hover:bg-primary/10 hover:border-primary/30'}`}
                  onClick={() => onToggleTheme(theme.label)}
                >
                  {theme.label}
                  {active && <X className="w-3 h-3" />}
                </Badge>
              )
            })}
          </div>
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Régime</p>
          <div className="flex flex-wrap gap-2">
            {diets.map((diet) => {
              const active = selectedDiets.includes(diet.label)
              return (
                <Badge
                  key={diet.id}
                  variant={active ? 'default' : 'outline'}
                  className={`px-3 py-4 cursor-pointer gap-1 transition-all duration-200 ${active ? 'hover:bg-primary/80' : 'hover:bg-primary/10 hover:border-primary/30'}`}
                  onClick={() => onToggleDiet(diet.label)}
                >
                  {diet.label}
                  {active && <X className="w-3 h-3" />}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
