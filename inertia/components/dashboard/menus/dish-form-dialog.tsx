import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { Input } from '~/components/ui/input'
import { FormSelect } from '~/components/ui/form-select'
import { Textarea } from '~/components/ui/textarea'

const DISH_TYPE_OPTIONS = [
  { value: 'entrée', label: 'Entrée' },
  { value: 'plat', label: 'Plat' },
  { value: 'dessert', label: 'Dessert' },
]

type Allergen = { id: string; label: string }

export type DishFormItem = {
  id: string
  title: string
  type: string
  description: string
  photoPath: string
  allergens?: Allergen[]
}

type Props = {
  menuId: string
  allergens: Allergen[]
  dish?: DishFormItem
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function DishFormDialog({ menuId, allergens, dish, open, onOpenChange }: Props) {
  const form = useForm({
    title: dish?.title ?? '',
    type: dish?.type ?? '',
    description: dish?.description ?? '',
    photo_path: dish?.photoPath ?? '',
    allergen_ids: dish?.allergens?.map((a) => a.id) ?? ([] as string[]),
  })

  function toggleAllergen(id: string) {
    const current = form.data.allergen_ids
    form.setData(
      'allergen_ids',
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (dish) {
      form.patch(`/dashboard/menus/${menuId}/dishes/${dish.id}`, {
        preserveScroll: true,
        onSuccess: () => onOpenChange(false),
      })
    } else {
      form.post(`/dashboard/menus/${menuId}/dishes`, {
        preserveScroll: true,
        onSuccess: () => {
          form.reset()
          onOpenChange(false)
        },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{dish ? 'Modifier le plat' : 'Ajouter un plat'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <FieldGroup className="py-2">
            <Field>
              <FieldLabel htmlFor="dish-title">Nom du plat</FieldLabel>
              <Input
                id="dish-title"
                value={form.data.title}
                onChange={(e) => form.setData('title', e.target.value)}
                required
              />
              <FieldError message={form.errors.title} />
            </Field>

            <Field>
              <FieldLabel htmlFor="dish-type">Type</FieldLabel>
              <FormSelect
                id="dish-type"
                value={form.data.type}
                onValueChange={(v) => form.setData('type', v)}
                options={DISH_TYPE_OPTIONS}
                placeholder="Sélectionner…"
              />
              <FieldError message={form.errors.type} />
            </Field>

            <Field>
              <FieldLabel htmlFor="dish-description">Description</FieldLabel>
              <Textarea
                id="dish-description"
                value={form.data.description}
                onChange={(e) => form.setData('description', e.target.value)}
                rows={2}
                required
              />
              <FieldError message={form.errors.description} />
            </Field>

            <Field>
              <FieldLabel htmlFor="dish-photo">URL de la photo</FieldLabel>
              <Input
                id="dish-photo"
                type="url"
                value={form.data.photo_path}
                onChange={(e) => form.setData('photo_path', e.target.value)}
                placeholder="https://…"
                required
              />
              <FieldError message={form.errors.photo_path} />
            </Field>

            {allergens.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Allergènes</p>
                <div className="grid grid-cols-2 gap-2">
                  {allergens.map((allergen) => (
                    <label
                      key={allergen.id}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={form.data.allergen_ids.includes(allergen.id)}
                        onCheckedChange={() => toggleAllergen(allergen.id)}
                      />
                      {allergen.label}
                    </label>
                  ))}
                </div>
                <FieldError message={form.errors.allergen_ids} />
              </div>
            )}
          </FieldGroup>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={form.processing}
            >
              Annuler
            </Button>
            <Button type="submit" size="sm" disabled={form.processing}>
              {dish ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
