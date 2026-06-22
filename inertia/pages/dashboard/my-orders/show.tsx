import { Link, router } from '@inertiajs/react'
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '~/lib/order-status'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { EditOrderDialog } from '~/components/orders/edit-order-dialog'

function formatDate(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function formatDateTime(date: string | null) {
  if (!date) return '—'
  return new Date(date).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

type Order = Data.Orders.ClientOrder

type ShowProps = InertiaProps<{
  order: Order
}>

const ALL_STATUSES = [
  'en_attente',
  'acceptee',
  'en_preparation',
  'en_cours_de_livraison',
  'livree',
  'en_attente_retour_materiel',
  'terminee',
]

export default function MyOrderShow({ order }: ShowProps) {
  const completedStatuses = new Set(order.statusHistory.map((h) => h.status))
  const historyByStatus = Object.fromEntries(order.statusHistory.map((h) => [h.status, h]))

  const relevantStatuses =
    order.materialLoan
      ? ALL_STATUSES
      : ALL_STATUSES.filter((s) => s !== 'en_attente_retour_materiel')

  const isPending = order.status === 'en_attente'

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/my-orders"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Mes commandes
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">Commande {order.orderNumber}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Événement le {formatDate(order.eventDate)}{' '}
          · {order.numberOfPeople} personne(s)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Colonne gauche : actions + récapitulatif */}
        <div className="lg:col-span-2 space-y-6">
          {isPending && (
            <div className="flex gap-2">
              <EditOrderDialog order={order} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Annuler
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Annuler la commande ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Votre commande {order.orderNumber} sera annulée définitivement.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Retour</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => router.delete(`/dashboard/my-orders/${order.id}`)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Confirmer l'annulation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          <div className="border rounded-lg p-4 bg-card space-y-3 text-sm">
            <p className="font-medium">Récapitulatif</p>
            <div className="text-muted-foreground">
              <p className="text-xs uppercase tracking-wide mb-0.5">Adresse de livraison</p>
              <p>{order.deliveryAddress}</p>
            </div>
            <div className="space-y-1.5 pt-2 border-t">
              <div className="flex justify-between text-muted-foreground">
                <span>Menu</span>
                <span>{order.menuPrice} €</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Livraison</span>
                <span>{order.deliveryFees} €</span>
              </div>
              <div className="flex justify-between font-semibold pt-1.5 border-t">
                <span>Total</span>
                <span>{order.totalAmount} €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite : timeline */}
        <div>
          <p className="font-medium mb-4">Suivi de commande</p>
          <ol className="relative border-l border-border ml-3 space-y-6">
            {relevantStatuses.map((status) => {
              const isDone = completedStatuses.has(status)
              const isCurrent = order.status === status
              const entry = historyByStatus[status]

              return (
                <li key={status} className="ml-6">
                  <span
                    className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground ring-primary/20'
                        : isDone
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground/40'
                    }`}
                  >
                    {isCurrent ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground animate-pulse" />
                    ) : isDone ? (
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </span>

                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : isDone
                            ? ORDER_STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-800'
                            : 'bg-muted text-muted-foreground/40'
                      }`}
                    >
                      {ORDER_STATUS_LABELS[status]}
                    </span>
                    {entry && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateTime(entry.changedAt)}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
