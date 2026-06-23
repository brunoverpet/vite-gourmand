import { router } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { DishGrid, type DishAdminItem } from '~/components/dashboard/dishes/dish-grid'
import { FilterSelect } from '~/components/ui/filter-select'
import { DebouncedSearchInput } from '~/components/ui/debounced-search-input'
import PaginationNav from '~/components/pagination-nav'
import type { InertiaProps } from '~/types'

const TYPE_OPTIONS = [
  { value: 'entrée', label: 'Entrées' },
  { value: 'plat', label: 'Plats' },
  { value: 'dessert', label: 'Desserts' },
]

type Meta = { currentPage: number; lastPage: number; total: number }
type Filters = { type: string; search: string }
type IndexProps = InertiaProps<{ dishes: DishAdminItem[]; meta: Meta; filters: Filters }>

function applyFilter(filters: Partial<Filters>) {
  router.get(
    '/dashboard/dishes',
    { ...filters },
    { preserveState: true, preserveScroll: true, replace: true }
  )
}

export default function DishesIndex({ dishes, meta, filters }: IndexProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Plats</h1>
          <p className="text-muted-foreground text-sm mt-1">{meta.total} plat(s)</p>
        </div>
        <Link route="admin_dishes.create">
          <Button size="sm">Créer un plat</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <DebouncedSearchInput
          defaultValue={filters.search}
          placeholder="Rechercher un plat…"
          onSearch={(search) => applyFilter({ ...filters, search, page: '1' } as any)}
          className="sm:w-64"
        />
        <FilterSelect
          value={filters.type || 'all'}
          onValueChange={(type) =>
            applyFilter({ ...filters, type: type === 'all' ? '' : type, page: '1' } as any)
          }
          options={TYPE_OPTIONS}
          allLabel="Tous les types"
          className="sm:w-44"
        />
      </div>

      <DishGrid dishes={dishes} />

      <PaginationNav
        currentPage={meta.currentPage}
        lastPage={meta.lastPage}
        onPageChange={(page) => applyFilter({ ...filters, page: String(page) } as any)}
      />
    </div>
  )
}
