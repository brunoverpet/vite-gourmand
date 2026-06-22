import type { Data } from '@generated/data'
import { Button } from '~/components/ui/button'
import { FilterBadgeList } from '~/components/menu/filter-badge-list'
import { MinPeopleSlider } from '~/components/menu/min-people-slider'
import { PriceRangeInputs } from '~/components/menu/price-range-inputs'

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
          <MinPeopleSlider value={minPeople} onChange={onMinPeopleChange} />
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Prix / personne</p>
          <PriceRangeInputs
            priceMin={priceMin}
            priceMax={priceMax}
            onPriceMinChange={onPriceMinChange}
            onPriceMaxChange={onPriceMaxChange}
          />
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Thèmes</p>
          <FilterBadgeList
            items={themes}
            selected={selectedThemes}
            onToggle={onToggleTheme}
            badgeClassName="px-3 py-4 cursor-pointer gap-1 transition-all duration-200"
            withHoverEffect
          />
        </div>

        <div className="py-8">
          <p className="text-label-caps text-muted-foreground mb-3">Régime</p>
          <FilterBadgeList
            items={diets}
            selected={selectedDiets}
            onToggle={onToggleDiet}
            badgeClassName="px-3 py-4 cursor-pointer gap-1 transition-all duration-200"
            withHoverEffect
          />
        </div>
      </div>
    </aside>
  )
}
