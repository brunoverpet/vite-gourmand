import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon } from 'lucide-react'
import { DishForm } from '~/components/dashboard/dishes/dish-form'
import type { InertiaProps } from '~/types'

type Allergen = { id: string; label: string }

type CreateProps = InertiaProps<{ allergens: Allergen[] }>

export default function DishesCreate({ allergens }: CreateProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          route="admin_dishes.index"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeftIcon className="size-4" />
          Retour aux plats
        </Link>
        <h1 className="text-2xl font-semibold">Créer un plat</h1>
      </div>

      <DishForm allergens={allergens} />
    </div>
  )
}
