import type { Data } from '@generated/data'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import { Slider } from '~/components/ui/slider'

type SelectedFilter = { label: string; type: 'diet' | 'theme' }

type FiltersMobileProps = {
  diets: Data.Menus.Diet[]
  themes: Data.Menus.Theme[]
  selectedDiets: string[]
  selectedThemes: string[]
  selectedFilters: SelectedFilter[]
  priceMin: string
  priceMax: string
  minPeople: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggleDiet: (label: string) => void
  onToggleTheme: (label: string) => void
  onRemoveFilter: (type: 'diet' | 'theme', label: string) => void
  onPriceMinChange: (value: string) => void
  onPriceMaxChange: (value: string) => void
  onMinPeopleChange: (value: number) => void
  onReset: () => void
}

export default function FiltersMobile({
  diets,
  themes,
  selectedDiets,
  selectedThemes,
  selectedFilters,
  priceMin,
  priceMax,
  minPeople,
  open,
  onOpenChange,
  onToggleDiet,
  onToggleTheme,
  onRemoveFilter,
  onPriceMinChange,
  onPriceMaxChange,
  onMinPeopleChange,
  onReset,
}: FiltersMobileProps) {
  const [exiting, setExiting] = useState<Set<string>>(new Set())
  const [draggingValue, setDraggingValue] = useState<number | null>(null)
  const displayValue = draggingValue ?? minPeople

  const activeCount =
    selectedFilters.length +
    (priceMin !== '' ? 1 : 0) +
    (priceMax !== '' ? 1 : 0) +
    (minPeople > 1 ? 1 : 0)

  function handleRemove(type: 'diet' | 'theme', label: string) {
    const key = `${type}-${label}`
    setExiting((prev) => new Set(prev).add(key))
    setTimeout(() => {
      setExiting((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
      onRemoveFilter(type, label)
    }, 200)
  }

  return (
    <div className="md:hidden mt-6">
      <div className="flex flex-col items-end gap-3">
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter />
              Filtres {activeCount > 0 && `(${activeCount})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle>Filtres</SheetTitle>
            </SheetHeader>

            <div className="px-6 flex flex-col gap-6 mt-4 overflow-y-auto max-h-[60vh]">
              <div>
                <p className="text-label-caps text-muted-foreground mb-4">
                  Nombre de personnes minimum
                </p>
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

              <div>
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

              <div>
                <p className="text-label-caps text-muted-foreground mb-3">Régime</p>
                <div className="flex flex-wrap gap-2">
                  {diets.map((diet) => {
                    const active = selectedDiets.includes(diet.label)
                    return (
                      <Badge
                        key={diet.id}
                        variant={active ? 'default' : 'outline'}
                        className="px-4 py-4 cursor-pointer gap-1"
                        onClick={() => onToggleDiet(diet.label)}
                      >
                        {diet.label}
                        {active && <X className="w-3 h-3" />}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-label-caps text-muted-foreground mb-3">Thème</p>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => {
                    const active = selectedThemes.includes(theme.label)
                    return (
                      <Badge
                        key={theme.id}
                        variant={active ? 'default' : 'outline'}
                        className="px-4 py-4 cursor-pointer gap-1"
                        onClick={() => onToggleTheme(theme.label)}
                      >
                        {theme.label}
                        {active && <X className="w-3 h-3" />}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>

            <SheetFooter className="px-6 pb-8 pt-6 flex gap-3">
              <Button variant="outline" onClick={onReset} disabled={activeCount === 0}>
                Réinitialiser
              </Button>
              <Button onClick={() => onOpenChange(false)}>Appliquer</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div
          className={`grid transition-all duration-300 overflow-hidden ${selectedFilters.length > 0 ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 flex flex-wrap gap-2">
            {selectedFilters.map((f) => {
              const key = `${f.type}-${f.label}`
              return (
                <Badge
                  key={key}
                  className={`px-3 py-4 gap-1 cursor-pointer transition-all duration-200 ${exiting.has(key) ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                  onClick={() => handleRemove(f.type, f.label)}
                >
                  {f.label}
                  <X className="w-3 h-3" />
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
