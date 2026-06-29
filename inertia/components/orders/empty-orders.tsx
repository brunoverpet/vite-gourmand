import { Link } from '@adonisjs/inertia/react'
import { EmptyState } from '~/components/ui/empty-state'

export function EmptyOrders() {
  return (
    <EmptyState title="Aucune commande" description="Vous n'avez pas encore passé de commande.">
      <Link
        route="menus.render"
        className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
      >
        Voir nos menus
      </Link>
    </EmptyState>
  )
}
