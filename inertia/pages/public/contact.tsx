import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

export default function Contact() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:flex md:items-start md:gap-16 md:py-28">
      <div className="md:flex-1">
        <p className="text-label-caps text-accent">Contact</p>
        <h1 className="text-h2">Une question, un événement à organiser ?</h1>
        <p className="text-muted-foreground mt-4 leading-relaxed md:max-w-prose">
          Décrivez-nous votre projet ou votre demande, nous vous répondons par mail dans les plus
          brefs délais.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-10 md:mt-0 md:flex-1 md:max-w-md">
        <Form route="contact" resetOnSuccess disableWhileProcessing>
          {({ errors, processing }) => (
            <FieldGroup>
              <Field data-invalid={errors.title ? 'true' : undefined}>
                <FieldLabel htmlFor="title">Titre</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Sujet de votre demande"
                  aria-invalid={errors.title ? 'true' : undefined}
                  required
                />
                <FieldError message={errors.title} />
              </Field>

              <Field data-invalid={errors.description ? 'true' : undefined}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Détaillez votre demande"
                  rows={5}
                  aria-invalid={errors.description ? 'true' : undefined}
                  required
                />
                <FieldError message={errors.description} />
              </Field>

              <Field data-invalid={errors.email ? 'true' : undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="adresse@exemple.com"
                  aria-invalid={errors.email ? 'true' : undefined}
                  required
                />
                <FieldError message={errors.email} />
              </Field>

              <Field>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Envoi…' : 'Envoyer'}
                </Button>
              </Field>
            </FieldGroup>
          )}
        </Form>
      </div>
    </section>
  )
}
