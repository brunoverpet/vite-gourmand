import type { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import CardMenu from '~/components/menu/card-menu'
import CardMenuSkeleton from '~/components/menu/card-menu-skeleton'
import FiltersDesktop from '~/components/menu/filters-desktop'
import FiltersMobile from '~/components/menu/filters-mobile'
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

const ONLY = ['menus', 'activeFilters']

export default function Index({ menus, themes, diets, activeFilters }: IndexProps) {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(activeFilters.diet)
  const [selectedThemes, setSelectedThemes] = useState<string[]>(activeFilters.theme)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const startHandler = router.on('start', () => setLoading(true))
    const finishHandler = router.on('finish', () => setLoading(false))
    return () => {
      startHandler()
      finishHandler()
    }
  }, [])

  const selectedFilters = [
    ...selectedDiets.map((d) => ({ label: d, type: 'diet' as const })),
    ...selectedThemes.map((t) => ({ label: t, type: 'theme' as const })),
  ]

  function applyFilter() {
    const sameDiets =
      selectedDiets.length === activeFilters.diet.length &&
      selectedDiets.every((d) => activeFilters.diet.includes(d))
    const sameThemes =
      selectedThemes.length === activeFilters.theme.length &&
      selectedThemes.every((t) => activeFilters.theme.includes(t))

    if (sameDiets && sameThemes) return

    router.get(
      '/menus',
      { diet: selectedDiets, theme: selectedThemes },
      { preserveState: true, preserveScroll: true, only: ONLY }
    )
  }

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
    router.get('/menus', { diet: newDiets, theme: newThemes }, { preserveState: true, preserveScroll: true, only: ONLY })
  }

  function reset() {
    setSelectedDiets([])
    setSelectedThemes([])
    setSheetOpen(false)
    router.get('/menus', {}, { preserveState: true, preserveScroll: true, only: ONLY })
  }

  const filterProps = {
    diets,
    themes,
    selectedDiets,
    selectedThemes,
    selectedFilters,
    onToggleDiet: toggleDiet,
    onToggleTheme: toggleTheme,
    onRemoveFilter: removeFilter,
    onReset: reset,
  }

  return (
    <div>
      <h2 className="text-h2">Nos menus du moment</h2>
      <p className="text-muted-foreground mt-2">
        Une sélection renouvelée selon les saisons, pensée pour chaque type d&apos;événement.
      </p>

      <FiltersMobile
        {...filterProps}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) applyFilter()
        }}
      />

      <FiltersDesktop {...filterProps} />

      <div className="mt-6 mb-20">
        <p className="text-body-sm text-muted-foreground">{menus.data.length} résultats</p>

        {loading ? (
          <div className="flex flex-col mt-4 gap-5 md:flex-row">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardMenuSkeleton key={i} />
            ))}
          </div>
        ) : menus.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-h3 text-foreground">Aucun menu trouvé</p>
            <p className="text-body text-muted-foreground text-center">
              Aucun menu ne correspond à vos filtres. Essayez d&apos;en retirer quelques-uns.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
