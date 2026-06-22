import { Badge } from '~/components/ui/badge'
import type { Data } from '@generated/data'

const DISH_TYPE_LABELS: Record<string, string> = {
  entrée: 'Entrées',
  plat: 'Plats',
  dessert: 'Desserts',
}

const DISH_TYPE_ORDER = ['entrée', 'plat', 'dessert']

type Props = {
  dishesByType: Record<string, Data.Menus.Dish[]>
}

export function MenuComposition({ dishesByType }: Props) {
  if (Object.keys(dishesByType).length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-h3 mb-4">Composition du menu</h2>
      <div className="flex flex-col gap-6">
        {DISH_TYPE_ORDER.filter((type) => dishesByType[type]).map((type) => (
          <div key={type}>
            <p className="text-label-caps text-muted-foreground mb-3">{DISH_TYPE_LABELS[type]}</p>
            <ul className="flex flex-col gap-4">
              {dishesByType[type].map((dish) => (
                <li key={dish.id} className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-transform duration-500 hover:scale-[1.3]">
                    <img
                      src={dish.photoPath}
                      alt={dish.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-body font-medium">{dish.title}</p>
                    <p className="text-body-sm text-muted-foreground">{dish.description}</p>
                    {dish.allergens && dish.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dish.allergens.map((a) => (
                          <Badge key={a.id} variant="outline" className="text-xs py-0.5">
                            {a.label}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
