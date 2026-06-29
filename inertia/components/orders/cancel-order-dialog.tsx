import { useForm } from '@inertiajs/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { FilterSelect } from '~/components/ui/filter-select'
import type { Data } from '@generated/data'

type Order = Data.Orders.OrderManagement

const CONTACT_MODE_OPTIONS = [
  { value: 'appel_gsm', label: 'Appel GSM' },
  { value: 'mail', label: 'Mail' },
  { value: 'physique', label: 'Physique' },
]

type Props = {
  order: Order
  open: boolean
  onClose: () => void
}

export function CancelOrderDialog({ order, open, onClose }: Props) {
  const { data, setData, patch, processing } = useForm({
    contactMode: '',
    cancellationReason: '',
  })

  const canSubmit = data.contactMode !== '' && data.cancellationReason.trim().length >= 10

  function handleSubmit() {
    patch(`/orders/${order.id}/cancel`, {
      preserveScroll: true,
      onSuccess: () => onClose(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Annuler la commande</DialogTitle>
          <DialogDescription>
            Commande <span className="font-medium text-foreground">{order.orderNumber}</span> —
            veuillez renseigner le mode de contact et le motif avant de confirmer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="cancel-contact-mode">Mode de contact</Label>
            <FilterSelect
              id="cancel-contact-mode"
              value={data.contactMode || 'all'}
              onValueChange={(v) => setData('contactMode', v === 'all' ? '' : v)}
              options={CONTACT_MODE_OPTIONS}
              allLabel="Sélectionner…"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancel-reason">Motif d&apos;annulation</Label>
            <Textarea
              id="cancel-reason"
              placeholder="Décrivez le motif de l'annulation (10 caractères minimum)…"
              value={data.cancellationReason}
              onChange={(e) => setData('cancellationReason', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={processing}>
            Retour
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={!canSubmit || processing}>
            Confirmer l&apos;annulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
