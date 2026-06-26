import { cn } from '@/lib/utils'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Link } from '@adonisjs/inertia/react'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm({ email: '', password: '' })

  const canSubmit = !!form.data.email && !!form.data.password

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post('/login')
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
              placeholder="adresse@exemple.com"
              autoComplete="email"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              data-invalid={form.errors.email ? 'true' : undefined}
              required
            />
            <FieldError message={form.errors.email} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              value={form.data.password}
              onChange={(e) => form.setData('password', e.target.value)}
              required
            />
            <FieldError message={form.errors.password} />
          </Field>

          <Button
            type="submit"
            disabled={!canSubmit || form.processing}
            tooltip="Saisissez votre email et mot de passe"
            className="sm:w-fit sm:mx-auto"
          >
            Se connecter
          </Button>

          <FieldSeparator />

          <Button variant="outline" type="button" className="sm:w-fit sm:mx-auto" asChild>
            <Link route="request_password_reset.show">Mot de passe oublié</Link>
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
