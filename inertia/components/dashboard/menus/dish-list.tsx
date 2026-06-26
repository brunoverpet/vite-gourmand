import { useState } from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { DishFormDialog, type DishFormItem } from '~/components/dashboard/menus/dish-form-dialog'
import { DishDeleteDialog } from '~/components/dashboard/menus/dish-delete-dialog'
const DISH_TYPE_LABELS: Record<string, string> = {
  entrée: 'Entrée',
  plat: 'Plat',
  dessert: 'Dessert',
}
type Allergen = { id: string; label: string }
type Props = {
  menuId: string
  dishes: DishFormItem[]
  allergens: Allergen[]
}
export function DishList({ menuId, dishes, allergens }: Props) {
  const [editingDish, setEditingDish] = useState<DishFormItem | null>(null)
  const [deletingDish, setDeletingDish] = useState<DishFormItem | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Plats</h2>
        <Button onClick={() => setAddOpen(true)}>
          Ajouter un plat
        </Button>
      </div>
      {dishes.length === 0 ? (
        <EmptyState
          title="Aucun plat"
          description="Ajoutez des plats à ce menu pour les afficher ici."
        />
      ) : (
        <div className="divide-y rounded-lg border">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex items-start gap-3 p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">{DISH_TYPE_LABELS[dish.type] ?? dish.type}</Badge>
                  <span className="text-sm font-medium truncate">{dish.title}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{dish.description}</p>
                {(dish.allergens?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dish.allergens?.map((a) => (
                      <Badge key={a.id} variant="outline" className="text-xs">
                        {a.label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => setEditingDish(dish)}>
                  <PencilIcon className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDeletingDish(dish)}>
                  <TrashIcon className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <DishFormDialog
        key={editingDish?.id ?? 'add'}
        menuId={menuId}
        allergens={allergens}
        dish={editingDish ?? undefined}
        open={addOpen || editingDish !== null}
        onOpenChange={(v) => {
          if (!v) {
            setAddOpen(false)
            setEditingDish(null)
          }
        }}
      />
      {deletingDish && (
        <DishDeleteDialog
          menuId={menuId}
          dishId={deletingDish.id}
          dishTitle={deletingDish.title}
          open
          onOpenChange={(v) => !v && setDeletingDish(null)}
        />
      )}
    </div>
  )
}
