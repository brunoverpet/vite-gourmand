import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { ImageOffIcon, TrashIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { EmptyState } from '~/components/ui/empty-state'
import { DishDeleteDialog } from '~/components/dashboard/dishes/dish-delete-dialog'
import { imageUrl } from '~/lib/utils'

const DISH_TYPE_LABELS: Record<string, string> = {
  entrée: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
}

type Allergen = { id: string; label: string }

export type DishAdminItem = {
  id: string
  title: string
  description: string
  type: string
  photoPath: string | null
  allergens: Allergen[]
}

type Props = {
  dishes: DishAdminItem[]
}

export function DishGrid({ dishes }: Props) {
  const [deletingDish, setDeletingDish] = useState<DishAdminItem | null>(null)

  if (dishes.length === 0) {
    return (
      <EmptyState
        title="Aucun plat"
        description="Aucun plat ne correspond à votre recherche."
      />
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {dishes.map((dish) => {
          const src = imageUrl(dish.photoPath)
          return (
            <div key={dish.id} className="group relative rounded-lg border bg-card overflow-hidden">
              <Link
                route="admin_dishes.edit"
                routeParams={{ id: dish.id }}
                className="block"
              >
                <div className="aspect-[3/2] bg-muted overflow-hidden">
                  {src ? (
                    <img src={src} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOffIcon className="size-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="p-2 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-1 pr-6">
                    <p className="text-xs font-medium leading-tight line-clamp-2">{dish.title}</p>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {DISH_TYPE_LABELS[dish.type] ?? dish.type}
                    </Badge>
                  </div>

                  {dish.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dish.allergens.map((a) => (
                        <Badge key={a.id} variant="outline" className="text-xs">
                          {a.label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingDish(dish)}
                className="absolute top-2 right-2 size-7 rounded-md bg-background/80 backdrop-blur-sm flex items-center justify-center text-destructive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <TrashIcon className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>

      {deletingDish && (
        <DishDeleteDialog
          dishId={deletingDish.id}
          dishTitle={deletingDish.title}
          open
          onOpenChange={(v) => !v && setDeletingDish(null)}
        />
      )}
    </>
  )
}
