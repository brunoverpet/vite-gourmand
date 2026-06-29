import { NoticesTable } from '~/components/dashboard/notices-table'
import type { NoticeItem } from '~/components/dashboard/notices-table'
import type { InertiaProps } from '~/types'

type IndexProps = InertiaProps<{
  notices: NoticeItem[]
}>

export default function NoticesIndex({ notices }: IndexProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gestion des avis</h1>
        <p className="text-muted-foreground text-sm mt-1">{notices.length} avis</p>
      </div>
      <NoticesTable notices={notices} />
    </div>
  )
}
