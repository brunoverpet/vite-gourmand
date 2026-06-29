import CardMenu from '~/components/menu/card-menu'
import CardMenuSkeleton from '~/components/menu/card-menu-skeleton'
import { EmptyState } from '~/components/ui/empty-state'
import { imageUrl } from '~/lib/utils'
import type { Data } from '@generated/data'

type Props = {
  menus: Data.Menus.Menu[]
  loading: boolean
  loadingType: 'page' | 'filter'
  gridClass: string
  skeletonCount: number
}

export function MenuCardsGrid({ menus, loading, loadingType, gridClass, skeletonCount }: Props) {
  if (loading && loadingType === 'page') {
    return (
      <div className={`animate-in fade-in duration-200 ${gridClass}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CardMenuSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (menus.length === 0) {
    return (
      <EmptyState
        title="Aucun menu trouvé"
        description="Aucun menu ne correspond à vos filtres. Essayez d'en retirer quelques-uns."
      />
    )
  }

  return (
    <div
      className={`transition-opacity duration-200 ${loading && loadingType === 'filter' ? 'opacity-40 pointer-events-none' : ''}`}
    >
      <div className={`animate-in fade-in duration-300 ${gridClass}`}>
        {menus.map((menu) => (
          <CardMenu
            key={menu.id}
            id={menu.id}
            name={menu.title}
            description={menu.description}
            price={menu.pricePerPeople}
            minPersons={menu.minPeople}
            tags={[menu.theme.label, menu.diet.label]}
            image={
              menu.pictures?.[0]
                ? (imageUrl(menu.pictures[0].imagePath) ?? 'https://placehold.co/600x400')
                : 'https://placehold.co/600x400'
            }
          />
        ))}
      </div>
    </div>
  )
}
