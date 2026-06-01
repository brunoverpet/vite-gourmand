import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Form, Link } from '@adonisjs/inertia/react'

interface ResetPasswordFormProps extends React.ComponentProps<'div'> {
  id: string
}

export function ResetPasswordForm({ id, className, ...props }: ResetPasswordFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form route="reset_password" routeParams={{ id }}>
        {({ errors }) => (
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Votre nouveau mot de passe"
                autoComplete="password"
                data-invalid={errors.password ? 'true' : undefined}
                required
              />
              {errors.password && <div className="text-destructive text-sm">{errors.password}</div>}
            </Field>

            <Field>
              <FieldLabel htmlFor="passwordConfirmation">Confirmation du Mot de passe</FieldLabel>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirmation du nouveau mot de passe"
                required
                autoComplete="current-passwordConfirmation"
              />
              {errors.passwordConfirmation && (
                <div className="text-destructive text-sm">{errors.passwordConfirmation}</div>
              )}
            </Field>

            <Field>
              <Button type="submit">Changer le mot de passe</Button>
            </Field>

            <FieldSeparator />

            <Field className="flex items-center">
              <Button variant="outline" type="button" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
            </Field>
          </FieldGroup>
        )}
      </Form>
    </div>
  )
}
