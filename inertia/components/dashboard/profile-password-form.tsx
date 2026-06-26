import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'

export function ProfilePasswordForm() {
  const form = useForm({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const isEmpty = !form.data.currentPassword || !form.data.password || !form.data.passwordConfirmation

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.patch('/dashboard/profile/password', {
      onSuccess: () => form.reset(),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="currentPassword">Mot de passe actuel</FieldLabel>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Votre mot de passe actuel"
            autoComplete="current-password"
            value={form.data.currentPassword}
            onChange={(e) => form.setData('currentPassword', e.target.value)}
            required
          />
          <FieldError message={form.errors.currentPassword} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Au moins 10 caractères, une majuscule, un caractère spécial"
            autoComplete="new-password"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.target.value)}
            required
          />
          <FieldError message={form.errors.password} />
        </Field>

        <Field>
          <FieldLabel htmlFor="passwordConfirmation">Confirmer le mot de passe</FieldLabel>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="Répétez le nouveau mot de passe"
            autoComplete="new-password"
            value={form.data.passwordConfirmation}
            onChange={(e) => form.setData('passwordConfirmation', e.target.value)}
            required
          />
          <FieldError message={form.errors.passwordConfirmation} />
        </Field>

        <Button
          type="submit"
          disabled={isEmpty || form.processing}
          className="sm:w-fit sm:self-start"
        >
          Mettre à jour
        </Button>
      </FieldGroup>
    </form>
  )
}
