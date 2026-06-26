import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { FormSelect } from '~/components/ui/form-select'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

type Diet = { id: string; label: string }
type Theme = { id: string; label: string }

type Props = {
  diets: Diet[]
  themes: Theme[]
  menu?: {
    id: string
    title: string
    description: string
    conditions: string | null
    minPeople: number
    pricePerPeople: string
    stock: number
    diet: Diet
    theme: Theme
  }
}

export function MenuForm({ diets, themes, menu }: Props) {
  const form = useForm({
    title: menu?.title ?? '',
    description: menu?.description ?? '',
    conditions: menu?.conditions ?? '',
    min_people: String(menu?.minPeople ?? ''),
    price_per_people: String(menu?.pricePerPeople ?? ''),
    stock: String(menu?.stock ?? ''),
    diet_id: menu?.diet.id ?? '',
    theme_id: menu?.theme.id ?? '',
  })

  const canCreate =
    !!form.data.title &&
    !!form.data.description &&
    !!form.data.diet_id &&
    !!form.data.theme_id &&
    !!form.data.min_people &&
    !!form.data.price_per_people &&
    !!form.data.stock

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (menu) {
      form.patch(`/dashboard/menus/${menu.id}`)
    } else {
      form.post('/dashboard/menus')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Titre</FieldLabel>
          <Input
            id="title"
            value={form.data.title}
            onChange={(e) => form.setData('title', e.target.value)}
            placeholder="Nom du menu"
            required
          />
          <FieldError message={form.errors.title} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            value={form.data.description}
            onChange={(e) => form.setData('description', e.target.value)}
            placeholder="Présentation du menu"
            rows={3}
            required
          />
          <FieldError message={form.errors.description} />
        </Field>

        <Field>
          <FieldLabel htmlFor="conditions">Conditions</FieldLabel>
          <Textarea
            id="conditions"
            value={form.data.conditions}
            onChange={(e) => form.setData('conditions', e.target.value)}
            placeholder="Conditions de commande (optionnel)"
            rows={2}
          />
          <FieldError message={form.errors.conditions} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="diet_id">Régime</FieldLabel>
            <FormSelect
              id="diet_id"
              value={form.data.diet_id}
              onValueChange={(v) => form.setData('diet_id', v)}
              options={diets.map((d) => ({ value: d.id, label: d.label }))}
              placeholder="Sélectionner…"
            />
            <FieldError message={form.errors.diet_id} />
          </Field>

          <Field>
            <FieldLabel htmlFor="theme_id">Thème</FieldLabel>
            <FormSelect
              id="theme_id"
              value={form.data.theme_id}
              onValueChange={(v) => form.setData('theme_id', v)}
              options={themes.map((t) => ({ value: t.id, label: t.label }))}
              placeholder="Sélectionner…"
            />
            <FieldError message={form.errors.theme_id} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="min_people">Personnes min.</FieldLabel>
            <Input
              id="min_people"
              type="number"
              min={1}
              placeholder="ex. 10"
              value={form.data.min_people}
              onChange={(e) => form.setData('min_people', e.target.value)}
              required
            />
            <FieldError message={form.errors.min_people} />
          </Field>

          <Field>
            <FieldLabel htmlFor="price_per_people">Prix / personne (€)</FieldLabel>
            <Input
              id="price_per_people"
              type="number"
              min={0}
              step="0.01"
              placeholder="ex. 45.00"
              value={form.data.price_per_people}
              onChange={(e) => form.setData('price_per_people', e.target.value)}
              required
            />
            <FieldError message={form.errors.price_per_people} />
          </Field>

          <Field>
            <FieldLabel htmlFor="stock">Stock</FieldLabel>
            <Input
              id="stock"
              type="number"
              min={0}
              placeholder="ex. 5"
              value={form.data.stock}
              onChange={(e) => form.setData('stock', e.target.value)}
              required
            />
            <FieldError message={form.errors.stock} />
          </Field>
        </div>

        <Button
          type="submit"
          disabled={form.processing || (menu ? !form.isDirty : !canCreate)}
          className="w-fit"
        >
          {menu ? 'Enregistrer les modifications' : 'Créer le menu'}
        </Button>
      </FieldGroup>
    </form>
  )
}
