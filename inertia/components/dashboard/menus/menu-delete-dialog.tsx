import { useForm } from '@inertiajs/react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'

type Props = {
  menuId: string
  menuTitle: string
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function MenuDeleteDialog({ menuId, menuTitle, open, onOpenChange }: Props) {
  const form = useForm({})

  function handleDelete() {
    form.delete(`/dashboard/menus/${menuId}`, {
      preserveScroll: true,
      onSuccess: () => onOpenChange(false),
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le menu</AlertDialogTitle>
          <AlertDialogDescription>
            Vous allez supprimer{' '}
            <span className="font-medium text-foreground">&laquo;&nbsp;{menuTitle}&nbsp;&raquo;</span>.
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={form.processing}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={form.processing}
          >
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
