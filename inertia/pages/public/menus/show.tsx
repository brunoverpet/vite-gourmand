import type { Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/react'
import { ArrowLeft, Users } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { MenuGallery } from '~/components/menu/menu-gallery'
import { MenuComposition } from '~/components/menu/menu-composition'
import type { InertiaProps } from '~/types'

const DISH_TYPE_ORDER = ['entrée', 'plat', 'dessert']

type ShowProps = InertiaProps<{
  menu: Data.Menus.MenuDetail
}>

export default function Show({ menu }: ShowProps) {
  const [activeImage, setActiveImage] = useState(menu.pictures?.[0]?.imagePath ?? null)

  const uniqueDishes = Array.from(new Map((menu.dishes ?? []).map((d) => [d.id, d])).values())
  const uniqueAllergens = Array.from(
    new Map(uniqueDishes.flatMap((d) => d.allergens ?? []).map((a) => [a.id, a])).values()
  )
  const dishesByType = DISH_TYPE_ORDER.reduce<Record<string, Data.Menus.Dish[]>>((acc, type) => {
    const dishes = uniqueDishes.filter((d) => d.type === type)
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
        <MenuGallery
          pictures={menu.pictures}
          activeImage={activeImage}
          alt={menu.title}
          onSelect={setActiveImage}
        />

        {/* Infos */}
        <div className="mt-8 md:mt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-accent text-primary-foreground">{menu.theme.label}</Badge>
            <Badge variant="outline">{menu.diet.label}</Badge>
          </div>

          <h1 className="text-h1">{menu.title}</h1>

          <div className="flex items-end gap-6 mt-4">
            <div>
              <p className="text-h2 text-accent-text">
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
          <MenuComposition dishesByType={dishesByType} />

          {/* Conditions */}
          {menu.conditions && (
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-label-caps text-muted-foreground mb-2">Conditions</p>
              <p className="text-body-sm">{menu.conditions}</p>
            </div>
          )}

          {/* Allergènes */}
          {uniqueAllergens.length > 0 && (
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-label-caps text-muted-foreground mb-2">Allergènes présents</p>
              <div className="flex flex-wrap gap-1.5">
                {uniqueAllergens.map((a) => (
                  <Badge key={a.id} variant="outline">
                    {a.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* CTA desktop */}
          <div className="hidden md:block mt-10">
            <Button className="w-full" asChild>
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
