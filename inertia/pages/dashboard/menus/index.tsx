import { Link } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import {
  MenuAdminTable,
  type MenuAdminItem,
} from '~/components/dashboard/menus/menu-admin-table'
import type { InertiaProps } from '~/types'

type IndexProps = InertiaProps<{ menus: MenuAdminItem[] }>

export default function MenusIndex({ menus }: IndexProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menus & plats</h1>
          <p className="text-muted-foreground text-sm mt-1">{menus.length} menu(s)</p>
        </div>
        <Link route="admin_menus.create">
          <Button size="sm">Créer un menu</Button>
        </Link>
      </div>

      <MenuAdminTable menus={menus} />
    </div>
  )
}
