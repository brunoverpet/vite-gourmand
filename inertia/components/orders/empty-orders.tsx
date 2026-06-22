import { Link } from '@adonisjs/inertia/react'

export function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <p className="text-lg font-medium">Aucune commande</p>
      <p className="text-muted-foreground text-sm text-center">
        Vous n&apos;avez pas encore passé de commande.
      </p>
      <Link
        route="menus.render"
        className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
      >
        Voir nos menus
      </Link>
    </div>
  )
}
