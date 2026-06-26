import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Link } from '@adonisjs/inertia/react'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm({ email: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post('/forgot-password')
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder="adresse@exemple.com"
              autoComplete="email"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              data-invalid={form.errors.email ? 'true' : undefined}
              required
            />
            <FieldError message={form.errors.email} />
          </Field>

          <Button
            type="submit"
            disabled={!form.data.email || form.processing}
            tooltip="Saisissez votre adresse email"
          >
            Réinitialiser mon mot de passe
          </Button>

          <FieldSeparator />
        </FieldGroup>
      </form>

      <Button variant="outline" type="button" asChild>
        <Link route="session.render">Se connecter</Link>
      </Button>
    </div>
  )
}
