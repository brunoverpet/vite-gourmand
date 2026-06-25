import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'

export function ChangePasswordForm() {
  const form = useForm({ password: '', passwordConfirmation: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post('/dashboard/change-password')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••"
            autoComplete="new-password"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            required
          />
          <FieldError message={form.errors.password} />
        </Field>

        <Field>
          <FieldLabel htmlFor="passwordConfirmation">Confirmation</FieldLabel>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="••••••••••"
            autoComplete="new-password"
            value={form.data.passwordConfirmation}
            onChange={(e) => form.setData('passwordConfirmation', e.target.value)}
            required
          />
          <FieldError message={form.errors.passwordConfirmation} />
        </Field>

        <p className="text-xs text-muted-foreground">
          Au moins 10 caractères, une majuscule et un caractère spécial.
        </p>

        <Button type="submit" className="w-full" disabled={form.processing}>
          {form.processing ? 'Enregistrement…' : 'Définir mon mot de passe'}
        </Button>
      </FieldGroup>
    </form>
  )
}
