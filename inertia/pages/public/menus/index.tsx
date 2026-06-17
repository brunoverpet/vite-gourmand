import type { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import CardMenu from '~/components/menu/card-menu'
import CardMenuSkeleton from '~/components/menu/card-menu-skeleton'
import FiltersDesktop from '~/components/menu/filters-desktop'
import FiltersMobile from '~/components/menu/filters-mobile'
import PaginationNav from '~/components/pagination-nav'
import type { InertiaProps } from '~/types'

type ActiveFilters = {
  diet: string[]
  theme: string[]
  priceMin: number | null
  priceMax: number | null
  minPeople: number | null
}

type IndexProps = InertiaProps<{
  themes: Data.Menus.Theme[]
  diets: Data.Menus.Diet[]
  activeFilters: ActiveFilters
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
  const [priceMin, setPriceMin] = useState(activeFilters.priceMin?.toString() ?? '')
  const [priceMax, setPriceMax] = useState(activeFilters.priceMax?.toString() ?? '')
  const [minPeople, setMinPeople] = useState(activeFilters.minPeople ?? 1)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const scrollToTop = useRef(false)
  const loadingType = useRef<'page' | 'filter'>('filter')
  const priceDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const startHandler = router.on('start', () => setLoading(true))
    const finishHandler = router.on('finish', () => {
      setLoading(false)
      if (scrollToTop.current) {
        scrollToTop.current = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
    return () => {
      startHandler()
      finishHandler()
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (priceDebounce.current) clearTimeout(priceDebounce.current)
    priceDebounce.current = setTimeout(() => {
      loadingType.current = 'filter'
      router.get(
        '/menus',
        {
          diet: selectedDiets,
          theme: selectedThemes,
          ...(priceMin !== '' && { priceMin }),
          ...(priceMax !== '' && { priceMax }),
          ...(minPeople > 1 && { minPeople }),
        },
        { preserveState: true, preserveScroll: true, only: ONLY }
      )
    }, 400)
    return () => {
      if (priceDebounce.current) clearTimeout(priceDebounce.current)
    }
  }, [priceMin, priceMax])

  const selectedFilters = [
    ...selectedDiets.map((d) => ({ label: d, type: 'diet' as const })),
    ...selectedThemes.map((t) => ({ label: t, type: 'theme' as const })),
  ]

  function buildParams(overrides: Record<string, unknown> = {}) {
    return {
      diet: selectedDiets,
      theme: selectedThemes,
      ...(priceMin !== '' && { priceMin }),
      ...(priceMax !== '' && { priceMax }),
      ...(minPeople > 1 && { minPeople }),
      ...overrides,
    }
  }

  function applyFilter(overrides: Record<string, unknown> = {}) {
    loadingType.current = 'filter'
    router.get('/menus', buildParams(overrides), {
      preserveState: true,
      preserveScroll: true,
      only: ONLY,
    })
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
    loadingType.current = 'filter'
    router.get('/menus', buildParams({ diet: newDiets, theme: newThemes }), {
      preserveState: true,
      preserveScroll: true,
      only: ONLY,
    })
  }

  function toggleAndApplyDiet(label: string) {
    const next = selectedDiets.includes(label)
      ? selectedDiets.filter((d) => d !== label)
      : [...selectedDiets, label]
    setSelectedDiets(next)
    applyFilter({ diet: next })
  }

  function toggleAndApplyTheme(label: string) {
    const next = selectedThemes.includes(label)
      ? selectedThemes.filter((t) => t !== label)
      : [...selectedThemes, label]
    setSelectedThemes(next)
    applyFilter({ theme: next })
  }

  function applyMinPeople(value: number) {
    setMinPeople(value)
    applyFilter({ minPeople: value > 1 ? value : undefined })
  }

  function goToPage(page: number) {
    loadingType.current = 'page'
    scrollToTop.current = true
    router.get('/menus', buildParams({ page }), {
      preserveState: true,
      preserveScroll: true,
      only: ONLY,
    })
  }

  function reset() {
    setSelectedDiets([])
    setSelectedThemes([])
    setPriceMin('')
    setPriceMax('')
    setMinPeople(1)
    setSheetOpen(false)
    loadingType.current = 'filter'
    router.get('/menus', {}, { preserveState: true, preserveScroll: true, only: ONLY })
  }

  function renderCards(gridClass: string, skeletonCount: number) {
    const isPageLoad = loading && loadingType.current === 'page'
    const isFilterLoad = loading && loadingType.current === 'filter'

    if (isPageLoad) {
      return (
        <div className={`animate-in fade-in duration-200 ${gridClass}`}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <CardMenuSkeleton key={i} />
          ))}
        </div>
      )
    }

    if (menus.data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-h3 text-foreground">Aucun menu trouvé</p>
          <p className="text-body text-muted-foreground text-center">
            Aucun menu ne correspond à vos filtres. Essayez d&apos;en retirer quelques-uns.
          </p>
        </div>
      )
    }

    return (
      <div
        className={`transition-opacity duration-200 ${isFilterLoad ? 'opacity-40 pointer-events-none' : ''}`}
      >
        <div className={`animate-in fade-in duration-300 ${gridClass}`}>
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
    )
  }

  return (
    <div>
      <h2 className="text-h2">Nos menus</h2>
      <p className="text-muted-foreground mt-2">
        Découvrez notre sélection de menus pour tous vos événements.
      </p>

      {/* Mobile */}
      <FiltersMobile
        diets={diets}
        themes={themes}
        selectedDiets={selectedDiets}
        selectedThemes={selectedThemes}
        selectedFilters={selectedFilters}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) setTimeout(() => applyFilter(), 300)
        }}
        onToggleDiet={toggleDiet}
        onToggleTheme={toggleTheme}
        onRemoveFilter={removeFilter}
        onReset={reset}
      />

      <div className="md:hidden mt-10 mb-20">
        <p className="text-body-sm text-muted-foreground mb-4">{menus.metadata.total} résultats</p>
        {renderCards('flex flex-col gap-5', 3)}
        <PaginationNav
          currentPage={menus.metadata.currentPage}
          lastPage={menus.metadata.lastPage}
          onPageChange={goToPage}
        />
      </div>

      {/* Desktop: grid [sidebar | content] */}
      <div className="hidden md:grid md:grid-cols-[200px_1fr] md:gap-x-8 lg:grid-cols-[260px_1fr] lg:gap-x-16 xl:grid-cols-[320px_1fr] xl:gap-x-32 2xl:grid-cols-[320px_1fr] 2xl:gap-x-48 mt-14 mb-20">
        <FiltersDesktop
          diets={diets}
          themes={themes}
          selectedDiets={selectedDiets}
          selectedThemes={selectedThemes}
          priceMin={priceMin}
          priceMax={priceMax}
          minPeople={minPeople}
          onToggleDiet={toggleAndApplyDiet}
          onToggleTheme={toggleAndApplyTheme}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
          onMinPeopleChange={applyMinPeople}
          onReset={reset}
        />

        <div className="min-w-0 max-w-3xl">
          <p className="text-body-sm text-muted-foreground text-right mb-4">
            {menus.metadata.total} résultats
          </p>
          {renderCards('grid grid-cols-1 lg:grid-cols-2 gap-8', 4)}
          <PaginationNav
            currentPage={menus.metadata.currentPage}
            lastPage={menus.metadata.lastPage}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  )
}
