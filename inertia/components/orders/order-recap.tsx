import type { Data } from '@generated/data'

type Order = Data.Orders.ClientOrder

export function OrderRecap({ order }: { order: Order }) {
  return (
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
  )
}
