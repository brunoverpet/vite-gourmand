import { usePage } from '@inertiajs/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'

const SEGMENT_LABELS: Record<string, string> = {
  'dashboard': 'Dashboard',
  'menus': 'Menus',
  'dishes': 'Plats',
  'orders': 'Commandes',
  'my-orders': 'Mes commandes',
  'notices': 'Avis clients',
  'profile': 'Mon profil',
  'employees': 'Comptes employés',
  'stats': 'Statistiques',
  'opening-hours': 'Horaires',
  'create': 'Créer',
  'edit': 'Modifier',
}

export function DashboardBreadcrumb() {
  const { url } = usePage()
  const pathname = url.split('?')[0]
  const segments = pathname.split('/').filter(Boolean)

  type CrumbItem = { label: string; href: string }
  const items: CrumbItem[] = []
  let accPath = ''

  for (const segment of segments) {
    accPath += `/${segment}`
    if (segment in SEGMENT_LABELS) {
      items.push({ label: SEGMENT_LABELS[segment], href: accPath })
    }
  }

  if (items.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.flatMap((item, i) => {
          const isLast = i === items.length - 1
          const hidden = !isLast ? 'hidden md:flex' : ''
          const result = []

          if (i > 0) {
            result.push(<BreadcrumbSeparator key={`sep-${i}`} className={hidden} />)
          }

          result.push(
            <BreadcrumbItem key={item.href} className={hidden}>
              {isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          )

          return result
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
