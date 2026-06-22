import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from '~/components/ui/button'

type Props = {
  notice: { id: string; status: string }
  onSuccess?: () => void
  fullWidth?: boolean
}

export function NoticeActions({ notice, onSuccess, fullWidth }: Props) {
  const [processing, setProcessing] = useState(false)

  if (notice.status !== 'en_attente') return null

  function submit(status: string) {
    setProcessing(true)
    router.patch(
      `/dashboard/notices/${notice.id}`,
      { notice_id: notice.id, status },
      {
        preserveScroll: true,
        onFinish: () => {
          setProcessing(false)
          onSuccess?.()
        },
      }
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="destructive"
        className={fullWidth ? 'flex-1' : undefined}
        disabled={processing}
        onClick={() => submit('refuse')}
      >
        Refuser
      </Button>
      <Button
        size="sm"
        className={fullWidth ? 'flex-1' : undefined}
        disabled={processing}
        onClick={() => submit('valide')}
      >
        Valider
      </Button>
    </div>
  )
}
