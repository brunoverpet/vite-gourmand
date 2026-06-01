import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="session.store">
        {({ errors }) => (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="adresse@exemple.com"
                autoComplete="email"
                data-invalid={errors.email ? 'true' : undefined}
                required
              />
              {errors.email && <div className="text-destructive text-sm">{errors.email}</div>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Votre nouveau mot de passe"
                required
                autoComplete="current-password"
              />
              {errors.password && <div className="text-destructive text-sm">{errors.password}</div>}
            </Field>

            <Field>
              <Button type="submit">Se connecter</Button>
            </Field>

            <FieldSeparator />

            <Field className="flex items-center">
              <Button variant="outline" type="button" asChild>
                <Link href="/forgot-password">Mot de passe oublié</Link>
              </Button>
            </Field>
          </FieldGroup>
        )}
      </Form>
    </div>
  )
}
