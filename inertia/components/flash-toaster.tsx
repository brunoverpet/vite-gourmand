import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'

export function FlashToaster() {
  // On récupère les props globales d'Inertia
  const { props } = usePage()
  const flash = props.flash as any

  useEffect(() => {
    if (flash?.error) {
      toast.error(flash.error)
    }
    if (flash?.success) {
      toast.success(flash.success)
    }
    if (flash?.info) {
      toast.info(flash.info)
    }
  }, [flash])

  return <Toaster position="top-center" richColors />
}
