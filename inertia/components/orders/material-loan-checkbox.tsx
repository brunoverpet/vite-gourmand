import { router } from '@inertiajs/react'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import type { Data } from '@generated/data'

type Order = Data.Orders.OrderManagement

const LOCKABLE_STATUSES = ['en_attente_retour_materiel', 'terminee', 'annulee']

export function MaterialLoanCheckbox({ order }: { order: Order }) {
  const locked = LOCKABLE_STATUSES.includes(order.status)

  function handleChange(checked: boolean) {
    router.patch(
      `/orders/${order.id}/material-loan`,
      { materialLoan: checked },
      { preserveScroll: true }
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={`material-loan-${order.id}`}
        checked={order.materialLoan ?? false}
        onCheckedChange={handleChange}
        disabled={locked}
      />
      <Label
        htmlFor={`material-loan-${order.id}`}
        className={`text-xs ${locked ? 'text-muted-foreground' : 'cursor-pointer'}`}
      >
        Matériel prêté
      </Label>
    </div>
  )
}
