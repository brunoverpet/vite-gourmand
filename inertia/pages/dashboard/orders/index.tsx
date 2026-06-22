import { router, useForm } from '@inertiajs/react'
import { useEffect, useRef } from 'react'
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TRANSITIONS,
} from '~/lib/order-status'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

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

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-800'}`}
    >
      {ORDER_STATUS_LABELS[status] ?? status}
    </span>
  )
}

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function StatusUpdateForm({ order }: { order: Order }) {
  const allowed = ORDER_STATUS_TRANSITIONS[order.status] ?? []
  const { setData, patch, processing } = useForm({ status: '' })

  if (allowed.length === 0) return <StatusBadge status={order.status} />

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
    if (!next) return
    setData('status', next)
    if (window.confirm(`Passer la commande en "${ORDER_STATUS_LABELS[next]}" ?`)) {
      patch(`/orders/${order.id}/status`, { preserveScroll: true })
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <StatusBadge status={order.status} />
      <select
        className="mt-1 text-xs border rounded px-1.5 py-1 bg-background"
        value=""
        onChange={handleChange}
        disabled={processing}
      >
        <option value="">Changer...</option>
        {allowed.map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function OrdersManagementIndex({ orders, filters }: IndexProps) {
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function applyFilters(overrides: Record<string, unknown> = {}) {
    router.get(
      '/dashboard/orders',
      { ...filters, ...overrides },
      { preserveState: true, preserveScroll: true }
    )
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (searchRef.current) clearTimeout(searchRef.current)
    searchRef.current = setTimeout(() => applyFilters({ search: value, page: 1 }), 400)
  }

  useEffect(() => {
    return () => {
      if (searchRef.current) clearTimeout(searchRef.current)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gestion des commandes</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.metadata.total} commande(s)</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Rechercher un client..."
          defaultValue={filters.search}
          onChange={handleSearchChange}
          className="border rounded px-3 py-2 text-sm flex-1 bg-background"
        />
        <select
          value={filters.status}
          onChange={(e) => applyFilters({ status: e.target.value, page: 1 })}
          className="border rounded px-3 py-2 text-sm bg-background"
        >
          <option value="">Tous les statuts</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Liste mobile */}
      <div className="md:hidden space-y-4">
        {orders.data.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Aucune commande trouvée</p>
        ) : (
          orders.data.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3 bg-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm">{order.orderNumber}</p>
                  <p className="text-muted-foreground text-xs">
                    {order.user
                      ? `${order.user.firstname} ${order.user.lastname}`
                      : 'Client inconnu'}
                  </p>
                </div>
                <StatusUpdateForm order={order} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Événement : {formatDate(order.eventDate)}
                </span>
                <span className="font-medium text-foreground">{order.totalAmount} €</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tableau desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">N° commande</th>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Date événement</th>
              <th className="text-left px-4 py-3 font-medium">Montant</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Aucune commande trouvée
                </td>
              </tr>
            ) : (
              orders.data.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    {order.user ? (
                      <div>
                        <p className="font-medium">
                          {order.user.firstname} {order.user.lastname}
                        </p>
                        <p className="text-muted-foreground text-xs">{order.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(order.eventDate)}</td>
                  <td className="px-4 py-3 font-medium">{order.totalAmount} €</td>
                  <td className="px-4 py-3">
                    <StatusUpdateForm order={order} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {orders.metadata.lastPage > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: orders.metadata.lastPage }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => applyFilters({ page: p })}
              className={`w-8 h-8 rounded text-sm ${
                p === orders.metadata.currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-muted'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
