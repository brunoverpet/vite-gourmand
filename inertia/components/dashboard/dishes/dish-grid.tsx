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
            <div key={dish.id} className="group relative rounded-lg overflow-hidden aspect-[3/2] bg-muted">
              <Link
                route="admin_dishes.edit"
                routeParams={{ id: dish.id }}
                className="block w-full h-full"
              >
                {src ? (
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOffIcon className="size-6 text-muted-foreground/30" />
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />

                <Badge className="absolute top-2 left-2 text-xs bg-black/40 backdrop-blur-sm text-white border-0 hover:bg-black/40">
                  {DISH_TYPE_LABELS[dish.type] ?? dish.type}
                </Badge>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-semibold text-white leading-tight line-clamp-2 pr-2">
                    {dish.title}
                  </p>
                  {dish.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {dish.allergens.slice(0, 3).map((a) => (
                        <Badge key={a.id} className="text-xs bg-black/40 backdrop-blur-sm text-white border-0 max-w-[7rem] truncate hover:bg-black/40">
                          {a.label}
                        </Badge>
                      ))}
                      {dish.allergens.length > 3 && (
                        <Badge className="text-xs bg-black/40 backdrop-blur-sm text-white border-0 hover:bg-black/40">
                          +{dish.allergens.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingDish(dish)}
                className="absolute top-2 right-2 size-7 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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
