import { useState } from 'react'
import { FilterSelect } from '~/components/ui/filter-select'
import { StarRating } from '~/components/ui/star-rating'
import { StatusBadge } from '~/components/ui/status-badge'
import { NoticeActions } from '~/components/dashboard/notice-actions'
import { NoticeDialog } from '~/components/dashboard/notice-dialog'
import { NOTICE_STATUS_COLORS, NOTICE_STATUS_LABELS } from '~/lib/notice-status'

export type NoticeItem = {
  id: string
  note: number
  description: string
  status: string
  createdAt: string | null
  order: {
    orderNumber: string
    user: {
      firstname: string
      lastname: string
      email: string
    } | null
  } | null
}

type NoticesTableProps = {
  notices: NoticeItem[]
}

export function NoticesTable({ notices }: NoticesTableProps) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [noteFilter, setNoteFilter] = useState('all')
  const [selected, setSelected] = useState<NoticeItem | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = notices.filter((n) => {
    if (statusFilter !== 'all' && n.status !== statusFilter) return false
    if (noteFilter !== 'all' && String(n.note) !== noteFilter) return false
    return true
  })

  function openDialog(notice: NoticeItem) {
    setSelected(notice)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <FilterSelect
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={Object.entries(NOTICE_STATUS_LABELS).map(([value, label]) => ({ value, label }))}
          allLabel="Tous les statuts"
          className="sm:w-48"
        />
        <FilterSelect
          value={noteFilter}
          onValueChange={setNoteFilter}
          options={[1, 2, 3, 4, 5].map((n) => ({
            value: String(n),
            label: `${'★'.repeat(n)}${'☆'.repeat(5 - n)} (${n}/5)`,
          }))}
          allLabel="Toutes les notes"
          className="sm:w-40"
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center">Aucun avis trouvé</p>
        ) : (
          filtered.map((notice) => (
            <div
              key={notice.id}
              role="button"
              tabIndex={0}
              onClick={() => openDialog(notice)}
              onKeyDown={(e) => e.key === 'Enter' && openDialog(notice)}
              className="w-full text-left border rounded-lg p-4 space-y-2 bg-card hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {notice.order?.orderNumber ?? '—'}
                  </p>
                  {notice.order?.user && (
                    <p className="text-sm font-medium">
                      {notice.order.user.firstname} {notice.order.user.lastname}
                    </p>
                  )}
                </div>
                <StatusBadge
                  status={notice.status}
                  labels={NOTICE_STATUS_LABELS}
                  colors={NOTICE_STATUS_COLORS}
                />
              </div>
              <StarRating note={notice.note} />
              <p className="text-xs text-muted-foreground line-clamp-2">{notice.description}</p>
              {notice.status === 'en_attente' && (
                <div onClick={(e) => e.stopPropagation()}>
                  <NoticeActions notice={notice} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Commande</th>
              <th className="text-left px-4 py-3 font-medium">Note</th>
              <th className="text-left px-4 py-3 font-medium">Commentaire</th>
              <th className="text-left px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Aucun avis trouvé
                </td>
              </tr>
            ) : (
              filtered.map((notice) => (
                <tr
                  key={notice.id}
                  onClick={() => openDialog(notice)}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    {notice.order?.user ? (
                      <div>
                        <p className="font-medium">
                          {notice.order.user.firstname} {notice.order.user.lastname}
                        </p>
                        <p className="text-xs text-muted-foreground">{notice.order.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {notice.order?.orderNumber ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating note={notice.note} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs">
                    <p className="truncate">{notice.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      status={notice.status}
                      labels={NOTICE_STATUS_LABELS}
                      colors={NOTICE_STATUS_COLORS}
                    />
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <NoticeActions notice={notice} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NoticeDialog notice={selected} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
