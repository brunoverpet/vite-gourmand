import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { CheckIcon, ImageOffIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { imageUrl } from '~/lib/utils'

type Dish = {
  id: string
  title: string
  photoPath: string | null
}

type Props = {
  menuId: string
  dishes: {
    entrées: Dish[]
    plats: Dish[]
    desserts: Dish[]
  }
  selectedIds: string[]
}

export function DishPicker({ menuId, dishes, selectedIds }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set(selectedIds))
  const form = useForm<{ dish_ids: string[] }>({ dish_ids: selectedIds })

  const isDirty = [...selected].sort().join() !== [...selectedIds].sort().join()

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  useEffect(() => {
    form.setData('dish_ids', [...selected])
  }, [selected])

  function handleSave() {
    form.put(`/dashboard/menus/${menuId}/dishes`, { preserveScroll: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Composition du menu</h2>
        {isDirty && (
          <Button size="sm" disabled={form.processing} onClick={handleSave}>
            Enregistrer
          </Button>
        )}
      </div>

      <Tabs defaultValue="entrées">
        <TabsList className="w-full">
          <TabsTrigger value="entrées" className="flex-1">
            Entrées{selected.size > 0 && dishes.entrées.some((d) => selected.has(d.id)) && (
              <span className="ml-1.5 text-xs opacity-70">
                ({dishes.entrées.filter((d) => selected.has(d.id)).length})
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="plats" className="flex-1">
            Plats{dishes.plats.some((d) => selected.has(d.id)) && (
              <span className="ml-1.5 text-xs opacity-70">
                ({dishes.plats.filter((d) => selected.has(d.id)).length})
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="desserts" className="flex-1">
            Desserts{dishes.desserts.some((d) => selected.has(d.id)) && (
              <span className="ml-1.5 text-xs opacity-70">
                ({dishes.desserts.filter((d) => selected.has(d.id)).length})
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {(['entrées', 'plats', 'desserts'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            {dishes[tab].length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucun plat dans cette catégorie.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {dishes[tab].map((dish) => {
                  const isSelected = selected.has(dish.id)
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => toggle(dish.id)}
                      className={`relative rounded-lg overflow-hidden border-2 text-left transition-all ${
                        isSelected
                          ? 'border-primary'
                          : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                    >
                      <div className="aspect-square bg-muted">
                        {imageUrl(dish.photoPath) ? (
                          <img
                            src={imageUrl(dish.photoPath)!}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageOffIcon className="size-6 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium line-clamp-2">{dish.title}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 size-5 rounded-full bg-primary flex items-center justify-center">
                          <CheckIcon className="size-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
