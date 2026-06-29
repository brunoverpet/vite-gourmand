import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon, TrashIcon } from 'lucide-react'
import { DishForm } from '~/components/dashboard/dishes/dish-form'
import { DishDeleteDialog } from '~/components/dashboard/dishes/dish-delete-dialog'
import { Button } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

type Allergen = { id: string; label: string }

type DishEdit = {
  id: string
  title: string
  description: string
  type: string
  photoPath: string | null
  allergens: Allergen[]
}

type EditProps = InertiaProps<{ dish: DishEdit; allergens: Allergen[] }>

export default function DishesEdit({ dish, allergens }: EditProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)

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
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">{dish.title}</h1>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <TrashIcon className="size-4" />
            <span className="hidden sm:inline">Supprimer</span>
          </Button>
        </div>
      </div>

      <DishForm dish={dish} allergens={allergens} />

      <DishDeleteDialog
        dishId={dish.id}
        dishTitle={dish.title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  )
}
