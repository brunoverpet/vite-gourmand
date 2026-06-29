import { useForm } from '@inertiajs/react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function EmployeeCreateDialog({ open, onOpenChange }: Props) {
  const form = useForm({ lastname: '', firstname: '', email: '' })

  const canSubmit = !!form.data.lastname && !!form.data.firstname && !!form.data.email

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post('/dashboard/employees', {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un compte employé</DialogTitle>
        </DialogHeader>

        <form id="employee-create-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="lastname">Nom</FieldLabel>
                <Input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Doe"
                  value={form.data.lastname}
                  onChange={(e) => form.setData('lastname', e.target.value)}
                  required
                />
                <FieldError message={form.errors.lastname} />
              </Field>
              <Field>
                <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
                <Input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="given-name"
                  placeholder="John"
                  value={form.data.firstname}
                  onChange={(e) => form.setData('firstname', e.target.value)}
                  required
                />
                <FieldError message={form.errors.firstname} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="employe@vitegourmand.fr"
                value={form.data.email}
                onChange={(e) => form.setData('email', e.target.value)}
                required
              />
              <FieldError message={form.errors.email} />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={form.processing}>
            Annuler
          </Button>
          <Button
            type="submit"
            form="employee-create-form"
            disabled={!canSubmit || form.processing}
            tooltip="Remplissez tous les champs requis"
          >
            {form.processing ? 'Création…' : 'Créer le compte'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
