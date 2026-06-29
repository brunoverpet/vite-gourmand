import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { StarRating } from '~/components/ui/star-rating'
import { StatusBadge } from '~/components/ui/status-badge'
import { NoticeActions } from '~/components/dashboard/notice-actions'
import { NOTICE_STATUS_COLORS, NOTICE_STATUS_LABELS } from '~/lib/notice-status'
import type { NoticeItem } from '~/components/dashboard/notices-table'

type NoticeDialogProps = {
  notice: NoticeItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NoticeDialog({ notice, open, onOpenChange }: NoticeDialogProps) {
  if (!notice) return null

  const client = notice.order?.user

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Avis — {notice.order?.orderNumber ?? '—'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {client && (
            <div className="space-y-0.5">
              <p className="text-sm font-medium">
                {client.firstname} {client.lastname}
              </p>
              <p className="text-xs text-muted-foreground">{client.email}</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <StarRating note={notice.note} />
            <span className="text-sm text-muted-foreground">{notice.note}/5</span>
          </div>

          <p className="text-sm leading-relaxed">{notice.description}</p>

          <div className="flex items-center justify-between pt-4 border-t">
            <StatusBadge
              status={notice.status}
              labels={NOTICE_STATUS_LABELS}
              colors={NOTICE_STATUS_COLORS}
            />
            {notice.createdAt && (
              <span className="text-xs text-muted-foreground">
                {new Date(notice.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>

          <NoticeActions notice={notice} onSuccess={() => onOpenChange(false)} fullWidth />
        </div>
      </DialogContent>
    </Dialog>
  )
}
