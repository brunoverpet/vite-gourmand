import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon, TrashIcon } from 'lucide-react'
import { MenuForm } from '~/components/dashboard/menus/menu-form'
import { PictureUpload } from '~/components/dashboard/menus/picture-upload'
import { DishPicker } from '~/components/dashboard/menus/dish-picker'
import { MenuDeleteDialog } from '~/components/dashboard/menus/menu-delete-dialog'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

type Diet = { id: string; label: string }
type Theme = { id: string; label: string }
type Picture = { id: string; imagePath: string }
type Dish = { id: string; title: string; photoPath: string | null }

type MenuEdit = {
  id: string
  title: string
  description: string
  conditions: string | null
  minPeople: number
  pricePerPeople: string
  stock: number
  diet: Diet
  theme: Theme
  pictures?: Picture[]
}

type EditProps = InertiaProps<{
  menu: MenuEdit
  selectedDishIds: string[]
  diets: Diet[]
  themes: Theme[]
  dishes: {
    entrées: Dish[]
    plats: Dish[]
    desserts: Dish[]
  }
}>

export default function MenusEdit({ menu, selectedDishIds, diets, themes, dishes }: EditProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <Link
          route="admin_menus.index"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeftIcon className="size-4" />
          Retour aux menus
        </Link>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">{menu.title}</h1>
          <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
            <TrashIcon className="size-4" />
            <span className="hidden sm:inline">Supprimer</span>
          </Button>
        </div>
      </div>

      <div className="lg:flex lg:gap-10 lg:items-start">
        <div className="flex-1 min-w-0 max-w-2xl">
          <MenuForm diets={diets} themes={themes} menu={menu} />
        </div>
        <div className="mt-8 lg:mt-0 lg:w-[460px] shrink-0">
          <PictureUpload menuId={menu.id} pictures={menu.pictures ?? []} />
        </div>
      </div>

      <Separator />

      <DishPicker
        menuId={menu.id}
        dishes={dishes}
        selectedIds={selectedDishIds}
      />

      <MenuDeleteDialog
        menuId={menu.id}
        menuTitle={menu.title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </div>
  )
}
