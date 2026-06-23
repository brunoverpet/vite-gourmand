import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon } from 'lucide-react'
import { MenuForm } from '~/components/dashboard/menus/menu-form'
import type { InertiaProps } from '~/types'

type Diet = { id: string; label: string }
type Theme = { id: string; label: string }

type CreateProps = InertiaProps<{ diets: Diet[]; themes: Theme[] }>

export default function MenusCreate({ diets, themes }: CreateProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          route="admin_menus.index"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeftIcon className="size-4" />
          Retour aux menus
        </Link>
        <h1 className="text-2xl font-semibold">Créer un menu</h1>
      </div>

      <MenuForm diets={diets} themes={themes} />
    </div>
  )
}
