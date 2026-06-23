import { router } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { MenuGrid, type MenuAdminItem } from '~/components/dashboard/menus/menu-grid'
import { DebouncedSearchInput } from '~/components/ui/debounced-search-input'
import { FilterSelect } from '~/components/ui/filter-select'
import PaginationNav from '~/components/pagination-nav'
import type { InertiaProps } from '~/types'

type Theme = { id: string; label: string }
type Meta = { currentPage: number; lastPage: number; total: number }
type Filters = { search: string; theme: string }
type IndexProps = InertiaProps<{
  menus: MenuAdminItem[]
  themes: Theme[]
  meta: Meta
  filters: Filters
}>

function applyFilter(filters: Partial<Filters>) {
  router.get(
    '/dashboard/menus',
    { ...filters },
    { preserveState: true, preserveScroll: true, replace: true }
  )
}

export default function MenusIndex({ menus, themes, meta, filters }: IndexProps) {
  const themeOptions = themes.map((t) => ({ value: t.label, label: t.label }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menus</h1>
          <p className="text-muted-foreground text-sm mt-1">{meta.total} menu(s)</p>
        </div>
        <Link route="admin_menus.create">
          <Button size="sm">Créer un menu</Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <DebouncedSearchInput
          defaultValue={filters.search}
          placeholder="Rechercher un menu…"
          onSearch={(search) => applyFilter({ ...filters, search, page: '1' } as any)}
          className="sm:w-64"
        />
        <FilterSelect
          value={filters.theme || 'all'}
          onValueChange={(theme) =>
            applyFilter({ ...filters, theme: theme === 'all' ? '' : theme, page: '1' } as any)
          }
          options={themeOptions}
          allLabel="Tous les thèmes"
          className="sm:w-48"
        />
      </div>

      <MenuGrid menus={menus} />

      <PaginationNav
        currentPage={meta.currentPage}
        lastPage={meta.lastPage}
        onPageChange={(page) => applyFilter({ ...filters, page: String(page) } as any)}
      />
    </div>
  )
}
