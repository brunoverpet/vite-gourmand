import { Form } from '@adonisjs/inertia/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { StarPicker } from '~/components/ui/star-picker'
import { Textarea } from '~/components/ui/textarea'

type ReviewFormProps = {
  orderId: string
}

export function ReviewForm({ orderId }: ReviewFormProps) {
  const [selected, setSelected] = useState(0)

  return (
    <Form route="register_notice">
      {({ errors }) => (
        <FieldGroup>
          <input type="hidden" name="order_id" value={orderId} />

          <Field>
            <input type="hidden" name="note" value={selected} />
            <StarPicker selected={selected} onSelect={setSelected} />
            <FieldError message={errors.note} />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Commentaire</FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Partagez votre expérience..."
              rows={4}
              required
            />
            <FieldError message={errors.description} />
          </Field>

          <Button type="submit" disabled={selected === 0} className="w-full sm:w-auto">
            Envoyer mon avis
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
