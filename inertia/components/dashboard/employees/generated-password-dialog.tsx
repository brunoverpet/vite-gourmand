import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
type Props = {
  password: string
  open: boolean
  onOpenChange: (v: boolean) => void
}
export function GeneratedPasswordDialog({ password, open, onOpenChange }: Props) {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Compte créé avec succès</DialogTitle>
          <DialogDescription>
            Communiquez ce mot de passe à l&apos;employé. Il ne sera plus affiché après fermeture.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3">
          <code className="flex-1 font-mono text-sm tracking-widest select-all">{password}</code>
          <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
            {copied ? (
              <CheckIcon className="size-4 text-green-600" />
            ) : (
              <CopyIcon className="size-4" />
            )}
            <span className="sr-only">Copier</span>
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>J&apos;ai noté le mot de passe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
