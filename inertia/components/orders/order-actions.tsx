import { router } from '@inertiajs/react'
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
import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

export function OrderActions({ order }: { order: Order }) {
  return (
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
              Cette action est irréversible. Votre commande {order.orderNumber} sera annulée
              définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel size="sm">Retour</AlertDialogCancel>
            <AlertDialogAction
              size="sm"
              onClick={() => router.delete(`/dashboard/my-orders/${order.id}`)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Confirmer l&apos;annulation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
