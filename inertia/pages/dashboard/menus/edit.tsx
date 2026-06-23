import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon } from 'lucide-react'
import { MenuForm } from '~/components/dashboard/menus/menu-form'
import { PictureUpload } from '~/components/dashboard/menus/picture-upload'
import { DishList } from '~/components/dashboard/menus/dish-list'
import { Separator } from '~/components/ui/separator'
import type { InertiaProps } from '~/types'
import type { DishFormItem } from '~/components/dashboard/menus/dish-form-dialog'

type Diet = { id: string; label: string }
type Theme = { id: string; label: string }
type Allergen = { id: string; label: string }
type Picture = { id: string; imagePath: string }

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
  dishes?: DishFormItem[]
}

type EditProps = InertiaProps<{
  menu: MenuEdit
  diets: Diet[]
  themes: Theme[]
  allergens: Allergen[]
}>

export default function MenusEdit({ menu, diets, themes, allergens }: EditProps) {
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
        <h1 className="text-2xl font-semibold">{menu.title}</h1>
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

      <div className="max-w-2xl">
        <DishList menuId={menu.id} dishes={menu.dishes ?? []} allergens={allergens} />
      </div>
    </div>
  )
}
