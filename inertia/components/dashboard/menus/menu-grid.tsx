import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { ImageOffIcon, TrashIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { EmptyState } from '~/components/ui/empty-state'
import { MenuDeleteDialog } from '~/components/dashboard/menus/menu-delete-dialog'
import { imageUrl } from '~/lib/utils'

type Diet = { id: string; label: string }
type Theme = { id: string; label: string }
type Picture = { id: string; imagePath: string }

export type MenuAdminItem = {
  id: string
  title: string
  description: string
  minPeople: number
  pricePerPeople: string
  stock: number
  diet: Diet
  theme: Theme
  pictures?: Picture[]
}

type Props = {
  menus: MenuAdminItem[]
}

export function MenuGrid({ menus }: Props) {
  const [deletingMenu, setDeletingMenu] = useState<MenuAdminItem | null>(null)

  if (menus.length === 0) {
    return (
      <EmptyState
        title="Aucun menu"
        description="Aucun menu ne correspond à votre recherche."
      />
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {menus.map((menu) => {
          const src = menu.pictures?.[0] ? imageUrl(menu.pictures[0].imagePath) : null
          return (
            <div key={menu.id} className="group relative rounded-lg border bg-card overflow-hidden">
              <Link
                route="admin_menus.edit"
                routeParams={{ id: menu.id }}
                className="block"
              >
                <div className="aspect-[3/2] bg-muted overflow-hidden">
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOffIcon className="size-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="p-2 flex flex-col gap-1.5">
                  <p className="text-xs font-medium leading-tight line-clamp-2 pr-6">{menu.title}</p>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">{menu.theme.label}</Badge>
                    <Badge variant="secondary" className="text-xs">{menu.diet.label}</Badge>
                    <Badge
                      variant={menu.stock === 0 ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {menu.stock} stock
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {menu.minPeople} pers. · {menu.pricePerPeople} €/pers.
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingMenu(menu)}
                className="absolute top-2 right-2 size-7 rounded-md bg-background/80 backdrop-blur-sm flex items-center justify-center text-destructive opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <TrashIcon className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>

      {deletingMenu && (
        <MenuDeleteDialog
          menuId={deletingMenu.id}
          menuTitle={deletingMenu.title}
          open
          onOpenChange={(v) => !v && setDeletingMenu(null)}
        />
      )}
    </>
  )
}
