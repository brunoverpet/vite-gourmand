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
  dishId: string
  dishTitle: string
  open: boolean
  onOpenChange: (v: boolean) => void
}
export function DishDeleteDialog({ dishId, dishTitle, open, onOpenChange }: Props) {
  const form = useForm({})
  function handleDelete() {
    form.delete(`/dashboard/dishes/${dishId}`, {
      onSuccess: () => onOpenChange(false),
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le plat</AlertDialogTitle>
          <AlertDialogDescription>
            Vous allez supprimer{' '}
            <span className="font-medium text-foreground">&laquo;&nbsp;{dishTitle}&nbsp;&raquo;</span>.
            Ce plat sera retiré de tous les menus auxquels il appartient.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={form.processing}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
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
