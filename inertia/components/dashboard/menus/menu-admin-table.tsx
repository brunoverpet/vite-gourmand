import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { PencilIcon, TrashIcon, ImageOffIcon } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { MenuDeleteDialog } from '~/components/dashboard/menus/menu-delete-dialog'

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

function MenuThumbnail({ pictures }: { pictures?: Picture[] }) {
  const src = pictures?.[0] ? `/uploads/${pictures[0].imagePath}` : null

  if (!src) {
    return (
      <div className="size-12 rounded-md bg-muted flex items-center justify-center shrink-0">
        <ImageOffIcon className="size-4 text-muted-foreground" />
      </div>
    )
  }

  return <img src={src} alt="" className="size-12 rounded-md object-cover shrink-0" />
}

export function MenuAdminTable({ menus }: Props) {
  const [deletingMenu, setDeletingMenu] = useState<MenuAdminItem | null>(null)

  if (menus.length === 0) {
    return (
      <EmptyState
        title="Aucun menu"
        description="Créez votre premier menu pour le voir apparaître ici."
      />
    )
  }

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {menus.map((menu) => (
          <div key={menu.id} className="border rounded-lg p-4 space-y-2 bg-card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 min-w-0">
                <MenuThumbnail pictures={menu.pictures} />
                <div className="min-w-0">
                  <p className="font-medium truncate">{menu.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{menu.description}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Link route="admin_menus.edit" routeParams={{ id: menu.id }}>
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="size-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setDeletingMenu(menu)}>
                  <TrashIcon className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary">{menu.diet.label}</Badge>
              <Badge variant="outline">{menu.theme.label}</Badge>
              <Badge variant={menu.stock === 0 ? 'destructive' : 'secondary'}>
                {menu.stock} en stock
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {menu.minPeople} pers. min — {menu.pricePerPeople} €/pers.
            </p>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 w-16" />
              <th className="text-left px-4 py-3 font-medium">Menu</th>
              <th className="text-left px-4 py-3 font-medium">Thème</th>
              <th className="text-left px-4 py-3 font-medium">Régime</th>
              <th className="text-left px-4 py-3 font-medium">Pers. min.</th>
              <th className="text-left px-4 py-3 font-medium">Prix/pers.</th>
              <th className="text-left px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {menus.map((menu) => (
              <tr key={menu.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <MenuThumbnail pictures={menu.pictures} />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{menu.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{menu.description}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{menu.theme.label}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{menu.diet.label}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{menu.minPeople}</td>
                <td className="px-4 py-3 text-muted-foreground">{menu.pricePerPeople} €</td>
                <td className="px-4 py-3">
                  <span className={menu.stock === 0 ? 'text-destructive font-medium' : ''}>
                    {menu.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link route="admin_menus.edit" routeParams={{ id: menu.id }}>
                      <Button variant="ghost" size="icon">
                        <PencilIcon className="size-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setDeletingMenu(menu)}>
                      <TrashIcon className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
