import type { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import { MenuCardsGrid } from '~/components/menu/menu-cards-grid'
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
  const [loadingType, setLoadingType] = useState<'page' | 'filter'>('filter')
  const scrollToTop = useRef(false)
  const priceDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)
  const latestFilters = useRef({ selectedDiets, selectedThemes, minPeople })

  useEffect(() => {
    latestFilters.current = { selectedDiets, selectedThemes, minPeople }
  }, [selectedDiets, selectedThemes, minPeople])

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
      const {
        selectedDiets: diets,
        selectedThemes: themes,
        minPeople: people,
      } = latestFilters.current
      setLoadingType('filter')
      router.get(
        '/menus',
        {
          diet: diets,
          theme: themes,
          ...(priceMin !== '' && { priceMin }),
          ...(priceMax !== '' && { priceMax }),
          ...(people > 1 && { minPeople: people }),
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
    setLoadingType('filter')
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
    setLoadingType('filter')
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
    setLoadingType('page')
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
    setLoadingType('filter')
    router.get('/menus', {}, { preserveState: true, preserveScroll: true, only: ONLY })
  }

  return (
    <div>
      <h1 className="text-h2">Nos menus</h1>
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
        priceMin={priceMin}
        priceMax={priceMax}
        minPeople={minPeople}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) setTimeout(() => applyFilter(), 300)
        }}
        onToggleDiet={toggleDiet}
        onToggleTheme={toggleTheme}
        onRemoveFilter={removeFilter}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        onMinPeopleChange={setMinPeople}
        onReset={reset}
      />

      <div className="md:hidden mt-10 mb-20">
        <p className="text-body-sm text-muted-foreground mb-4">{menus.metadata.total} résultats</p>
        <MenuCardsGrid
          menus={menus.data}
          loading={loading}
          loadingType={loadingType}
          gridClass="flex flex-col gap-5"
          skeletonCount={3}
        />
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
          <MenuCardsGrid
            menus={menus.data}
            loading={loading}
            loadingType={loadingType}
            gridClass="grid grid-cols-1 lg:grid-cols-2 gap-8"
            skeletonCount={4}
          />
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
