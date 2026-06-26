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
            <div key={menu.id} className="group relative rounded-lg overflow-hidden aspect-[3/2] bg-muted">
              <Link
                route="admin_menus.edit"
                routeParams={{ id: menu.id }}
                className="block w-full h-full"
              >
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOffIcon className="size-6 text-muted-foreground/30" />
                  </div>
                )}

                <div
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge className="text-xs bg-black/40 backdrop-blur-sm text-white border-0 hover:bg-black/40">
                    {menu.theme.label}
                  </Badge>
                  <Badge className="text-xs bg-black/40 backdrop-blur-sm text-white border-0 hover:bg-black/40">
                    {menu.diet.label}
                  </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs font-semibold text-white leading-tight line-clamp-2 pr-6">
                    {menu.title}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-white/70">
                      {menu.minPeople} pers. · {menu.pricePerPeople} €/pers.
                    </p>
                    <Badge
                      variant={menu.stock === 0 ? 'destructive' : 'secondary'}
                      className="text-xs shrink-0"
                    >
                      {menu.stock} stock
                    </Badge>
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setDeletingMenu(menu)}
                className="absolute top-2 right-2 size-7 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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
