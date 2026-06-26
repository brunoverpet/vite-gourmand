import { router } from '@inertiajs/react'
import { StatsBarChart } from '~/components/dashboard/stats-bar-chart'
import { DatePickerFilter } from '~/components/ui/date-picker-filter'
import { FilterSelect } from '~/components/ui/filter-select'
import { Button } from '~/components/ui/button'
import type { InertiaProps } from '~/types'
import { Data } from '@generated/data'

type Stat = {
  _id: string
  menuTitle: string
  count: number
  revenue: number
}

type Menu = Data.Menus.Menu

type IndexProps = InertiaProps<{
  stats: Stat[]
  menus: Menu[]
  filters: { menuId: string; from: string; to: string }
}>

export default function StatisticsIndex({ stats, menus, filters }: IndexProps) {
  function applyFilters(overrides: Record<string, unknown> = {}) {
    router.get(
      '/dashboard/statistics',
      { ...filters, ...overrides },
      { preserveState: true, preserveScroll: true }
    )
  }

  const menuOptions = menus.map((m) => ({ value: m.id, label: m.title }))
  const hasActiveFilters = filters?.menuId || filters?.from || filters?.to
  const totalRevenue = stats.reduce((sum, s) => sum + s.revenue, 0)

  function resetFilters() {
    router.get('/dashboard/statistics', {}, { preserveState: false })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Statistiques</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Données issues des commandes acceptées
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <FilterSelect
            value={filters?.menuId || 'all'}
            onValueChange={(v) => applyFilters({ menuId: v === 'all' ? '' : v })}
            options={menuOptions}
            allLabel="Tous les menus"
            className="w-full sm:w-60"
          />
          <DatePickerFilter
            value={filters?.from}
            onChange={(v) => applyFilters({ from: v })}
            placeholder="Date de début"
          />
          <DatePickerFilter
            value={filters?.to}
            onChange={(v) => applyFilters({ to: v })}
            placeholder="Date de fin"
          />
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs text-muted-foreground underline underline-offset-2 self-start"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsBarChart
          title="Commandes par menu"
          description="Nombre de commandes acceptées par menu sur la période sélectionnée."
          data={stats}
          dataKey="count"
          label="Commandes"
          color="var(--chart-1)"
          allowDecimals={false}
        />

        <StatsBarChart
          title="Chiffre d'affaires par menu"
          description="Montant total généré par chaque menu sur la période sélectionnée."
          highlight={`${totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`}
          data={stats}
          dataKey="revenue"
          label="Chiffre d'affaires (€)"
          color="var(--chart-2)"
          valueFormatter={(v) => `${v.toLocaleString('fr-FR')} €`}
        />
      </div>
    </div>
  )
}
