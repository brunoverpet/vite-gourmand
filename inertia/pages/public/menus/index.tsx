import type { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import CardMenu from '~/components/menu/card-menu'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import type { InertiaProps } from '~/types'

type IndexProps = InertiaProps<{
  themes: Data.Menus.Theme[]
  diets: Data.Menus.Diet[]
  activeFilters: { diet: string[]; theme: string[] }
  menus: {
    data: Data.Menus.Menu[]
    metadata: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
    }
  }
}>

export default function Index({ menus, themes, diets, activeFilters }: IndexProps) {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(activeFilters.diet)
  const [selectedThemes, setSelectedThemes] = useState<string[]>(activeFilters.theme)
  const [sheetOpen, setSheetOpen] = useState(false)

  function applyFilter() {
    router.get('/menus', { diet: selectedDiets, theme: selectedThemes }, { preserveState: true })
  }

  const selectedFilters = [
    ...selectedDiets.map((d) => ({ label: d, type: 'diet' as const })),
    ...selectedThemes.map((t) => ({ label: t, type: 'theme' as const })),
  ]

  function toggleDiet(label: string) {
    setSelectedDiets((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]
    )
  }

  function toggleTheme(label: string) {
    setSelectedThemes((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    )
  }

  function removeFilter(type: 'diet' | 'theme', label: string) {
    const newDiets = type === 'diet' ? selectedDiets.filter((d) => d !== label) : selectedDiets
    const newThemes = type === 'theme' ? selectedThemes.filter((t) => t !== label) : selectedThemes
    setSelectedDiets(newDiets)
    setSelectedThemes(newThemes)
    router.get('/menus', { diet: newDiets, theme: newThemes }, { preserveState: true })
  }

  function reset() {
    setSelectedDiets([])
    setSelectedThemes([])
    setSheetOpen(false)
    router.get('/menus', {}, { preserveState: true })
  }

  return (
    <div>
      <h2 className="text-h2">Nos menus du moment</h2>
      <p className="text-muted-foreground mt-2">
        Une sélection renouvelée selon les saisons, pensée pour chaque type d&apos;événement.
      </p>

      {/* Filtres mobile uniquement */}
      <div className="md:hidden mt-6">
        <div className="flex flex-col items-end gap-3">
          <Sheet
            open={sheetOpen}
            onOpenChange={(open) => {
              setSheetOpen(open)
              if (!open) applyFilter()
            }}
          >
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter />
                Filtres {selectedFilters.length > 0 && `(${selectedFilters.length})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>

              <div className="px-6 flex flex-col gap-6 mt-4">
                <div>
                  <p className="text-label-caps text-muted-foreground mb-3">Régime</p>
                  <div className="flex flex-wrap gap-2">
                    {diets.map((diet) => (
                      <Badge
                        key={diet.id}
                        variant={selectedDiets.includes(diet.label) ? 'default' : 'outline'}
                        className="px-4 py-4 cursor-pointer"
                        onClick={() => toggleDiet(diet.label)}
                      >
                        {diet.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-label-caps text-muted-foreground mb-3">Thème</p>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <Badge
                        key={theme.id}
                        variant={selectedThemes.includes(theme.label) ? 'default' : 'outline'}
                        className="px-4 py-4 cursor-pointer"
                        onClick={() => toggleTheme(theme.label)}
                      >
                        {theme.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="px-6 pb-8 pt-6">
                <Button variant="outline" onClick={reset} disabled={selectedFilters.length === 0}>
                  Réinitialiser
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((f) => (
                <Badge
                  key={`${f.type}-${f.label}`}
                  className="px-3 py-4 gap-1 cursor-pointer"
                  onClick={() => removeFilter(f.type, f.label)}
                >
                  {f.label}
                  <X className="w-3 h-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-body-sm text-muted-foreground">{menus.data.length} résultats</p>
        <div className="flex flex-col mt-4 gap-5 md:flex-row">
          {menus.data.map((menu) => (
            <CardMenu
              key={menu.id}
              name={menu.title}
              description={menu.description}
              price={menu.pricePerPeople}
              minPersons={menu.minPeople}
              tags={[menu.theme.label, menu.diet.label]}
              image={
                menu.pictures?.[0]
                  ? `/uploads/${menu.pictures[0].imagePath}`
                  : 'https://placehold.co/600x400'
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
