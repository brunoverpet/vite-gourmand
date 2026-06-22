import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Star } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { StatusBadge } from '~/components/ui/status-badge'
import { NOTICE_STATUS_COLORS, NOTICE_STATUS_LABELS } from '~/lib/notice-status'
import type { NoticeItem } from '~/components/dashboard/notices-table'

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= note ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-none'}`}
        />
      ))}
    </div>
  )
}

type NoticeDialogProps = {
  notice: NoticeItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NoticeDialog({ notice, open, onOpenChange }: NoticeDialogProps) {
  const [processing, setProcessing] = useState(false)

  if (!notice) return null

  const client = notice.order?.user
  const isPending = notice.status === 'en_attente'

  function submit(status: string) {
    setProcessing(true)
    router.patch(
      `/dashboard/notices/${notice!.id}`,
      { notice_id: notice!.id, status },
      {
        preserveScroll: true,
        onFinish: () => {
          setProcessing(false)
          onOpenChange(false)
        },
      }
    )
  }

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

          {isPending && (
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                disabled={processing}
                onClick={() => submit('refuse')}
              >
                Refuser
              </Button>
              <Button size="sm" className="flex-1" disabled={processing} onClick={() => submit('valide')}>
                Valider
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
