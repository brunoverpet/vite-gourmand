import { router } from '@inertiajs/react'
import { ORDER_STATUS_LABELS } from '~/lib/order-status'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'
import PaginationNav from '~/components/pagination-nav'
import { FilterSelect } from '~/components/ui/filter-select'
import { DebouncedSearchInput } from '~/components/ui/debounced-search-input'
import { OrdersTable } from '~/components/orders/orders-table'
import { OrdersMobileList } from '~/components/orders/orders-mobile-list'

type Order = Data.Orders.OrderManagement

type IndexProps = InertiaProps<{
  orders: {
    data: Order[]
    metadata: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
    }
  }
  filters: { status: string; search: string }
}>

export default function OrdersManagementIndex({ orders, filters }: IndexProps) {
  function applyFilters(overrides: Record<string, unknown> = {}) {
    router.get(
      '/dashboard/orders',
      { ...filters, ...overrides },
      { preserveState: true, preserveScroll: true }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gestion des commandes</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.metadata.total} commande(s)</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <DebouncedSearchInput
          placeholder="Rechercher un client…"
          defaultValue={filters.search}
          onSearch={(value) => applyFilters({ search: value, page: 1 })}
          className="sm:w-72"
        />
        <FilterSelect
          value={filters.status || 'all'}
          onValueChange={(v) => applyFilters({ status: v === 'all' ? '' : v, page: 1 })}
          options={Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
          allLabel="Tous les statuts"
          className="sm:w-52 sm:ml-auto"
        />
      </div>

      <OrdersMobileList orders={orders.data} />
      <OrdersTable orders={orders.data} />

      <PaginationNav
        currentPage={orders.metadata.currentPage}
        lastPage={orders.metadata.lastPage}
        onPageChange={(page) => applyFilters({ page })}
      />
    </div>
  )
}
