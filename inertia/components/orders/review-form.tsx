import { Form } from '@adonisjs/inertia/react'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Textarea } from '~/components/ui/textarea'

type ReviewFormProps = {
  orderId: string
}

export function ReviewForm({ orderId }: ReviewFormProps) {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)

  return (
    <Form route="register_notice">
      {({ errors }) => (
        <FieldGroup>
          <input type="hidden" name="order_id" value={orderId} />

          <Field>
            <FieldLabel>Note</FieldLabel>
            <input type="hidden" name="note" value={selected} />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hovered || selected) >= star
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelected(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${active ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-none'}`}
                    />
                  </button>
                )
              })}
            </div>
            {errors.note && <p className="text-destructive text-sm">{errors.note}</p>}
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
            {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
          </Field>

          <Button type="submit" disabled={selected === 0} className="w-full sm:w-auto">
            Envoyer mon avis
          </Button>
        </FieldGroup>
      )}
    </Form>
  )
}
