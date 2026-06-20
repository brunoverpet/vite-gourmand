import type { Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/react'
import { ArrowLeft, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

const DISH_TYPE_LABELS: Record<string, string> = {
  entrée: 'Entrées',
  plat: 'Plats',
  dessert: 'Desserts',
}

const DISH_TYPE_ORDER = ['entrée', 'plat', 'dessert']

type ShowProps = InertiaProps<{
  menu: Data.Menus.MenuDetail
}>

export default function Show({ menu }: ShowProps) {
  const [activeImage, setActiveImage] = useState(menu.pictures?.[0]?.imagePath ?? null)

  const imageUrl = activeImage ? `/uploads/${activeImage}` : 'https://placehold.co/800x600'

  const dishesByType = DISH_TYPE_ORDER.reduce<Record<string, Data.Menus.Dish[]>>((acc, type) => {
    const dishes = (menu.dishes ?? []).filter((d) => d.type === type)
    if (dishes.length > 0) acc[type] = dishes
    return acc
  }, {})

  return (
    <div className="pb-32 md:pb-20">
      <Link
        route="menus.render"
        className="inline-flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Nos menus
      </Link>

      <div className="md:grid md:grid-cols-[1fr_420px] md:gap-x-16 lg:grid-cols-[1fr_480px] xl:gap-x-24">
        {/* Galerie */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted">
            <img src={imageUrl} alt={menu.title} className="w-full h-full object-cover" />
          </div>

          {menu.pictures && menu.pictures.length > 1 && (
            <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
              {menu.pictures.map((pic) => (
                <button
                  key={pic.id}
                  onClick={() => setActiveImage(pic.imagePath)}
                  className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                    activeImage === pic.imagePath ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={`/uploads/${pic.imagePath}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="mt-8 md:mt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-accent text-primary-foreground">{menu.theme.label}</Badge>
            <Badge variant="secondary">{menu.diet.label}</Badge>
          </div>

          <h1 className="text-h1">{menu.title}</h1>

          <div className="flex items-end gap-6 mt-4">
            <div>
              <p className="text-h2 text-accent">
                {menu.pricePerPeople}€<span className="text-body text-muted-foreground">/pers</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-body-sm">À partir de {menu.minPeople} personnes</span>
            </div>
          </div>

          <p className="text-body text-muted-foreground mt-6">{menu.description}</p>

          {/* Plats */}
          {Object.keys(dishesByType).length > 0 && (
            <div className="mt-8">
              <h2 className="text-h3 mb-4">Composition du menu</h2>
              <div className="flex flex-col gap-6">
                {DISH_TYPE_ORDER.filter((type) => dishesByType[type]).map((type) => (
                  <div key={type}>
                    <p className="text-label-caps text-muted-foreground mb-3">
                      {DISH_TYPE_LABELS[type]}
                    </p>
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
          )}

          {/* Conditions */}
          {menu.conditions && (
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-label-caps text-muted-foreground mb-2">Conditions</p>
              <p className="text-body-sm">{menu.conditions}</p>
            </div>
          )}

          {/* CTA desktop */}
          <div className="hidden md:block mt-10">
            <Button size="lg" className="w-full" asChild>
              <Link route="order.render" routeParams={{ menuId: menu.id }}>
                Commander ce menu
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA sticky mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button size="lg" className="w-full" asChild>
          <Link route="order.render" routeParams={{ menuId: menu.id }}>
            Commander ce menu
          </Link>
        </Button>
      </div>
    </div>
  )
}
