import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  getOrderStatusTransitions,
} from '~/lib/order-status'
import { StatusBadge } from '~/components/ui/status-badge'
import { CancelOrderDialog } from '~/components/orders/cancel-order-dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '~/components/ui/select'
import type { Data } from '@generated/data'
type Order = Data.Orders.OrderManagement
export function StatusUpdateForm({ order }: { order: Order }) {
  const allowed = getOrderStatusTransitions(order.status, order.materialLoan ?? false)
  const [pending, setPending] = useState<string | null>(null)
  const { setData, patch, processing } = useForm({ status: '' })
  if (allowed.length === 0)
    return (
      <StatusBadge
        status={order.status}
        labels={ORDER_STATUS_LABELS}
        colors={ORDER_STATUS_COLORS}
      />
    )
  function handleSelect(next: string) {
    setData('status', next)
    setPending(next)
  }
  function handleConfirm() {
    patch(`/orders/${order.id}/status`, {
      preserveScroll: true,
      onFinish: () => setPending(null),
    })
  }
  return (
    <>
      <Select onValueChange={handleSelect} disabled={processing}>
        <SelectTrigger className="h-auto w-fit border-0 bg-transparent p-0 shadow-none gap-1.5 [&>svg]:text-muted-foreground">
          <StatusBadge
            status={order.status}
            labels={ORDER_STATUS_LABELS}
            colors={ORDER_STATUS_COLORS}
          />
        </SelectTrigger>
        <SelectContent align="end" position="popper">
          <SelectGroup>
            <SelectLabel>Passer à…</SelectLabel>
            {allowed.map((s) => (
              <SelectItem key={s} value={s}>
                {ORDER_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <CancelOrderDialog
        order={order}
        open={pending === 'annulee'}
        onClose={() => setPending(null)}
      />
      <AlertDialog
        open={!!pending && pending !== 'annulee'}
        onOpenChange={(open) => !open && setPending(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Changer le statut</AlertDialogTitle>
            <AlertDialogDescription>
              Passer la commande{' '}
              <span className="font-medium text-foreground">{order.orderNumber}</span> en{' '}
              <span className="font-medium text-foreground">
                {pending ? ORDER_STATUS_LABELS[pending] : ''}
              </span>{' '}
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirmer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
