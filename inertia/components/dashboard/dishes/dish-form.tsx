import { useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { CameraIcon, ImageOffIcon } from 'lucide-react'
import { imageUrl } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { FieldError } from '~/components/ui/field-error'
import { FormSelect } from '~/components/ui/form-select'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

const DISH_TYPE_OPTIONS = [
  { value: 'entrée', label: 'Entrée' },
  { value: 'plat', label: 'Plat' },
  { value: 'dessert', label: 'Dessert' },
]

type Allergen = { id: string; label: string }

type Props = {
  allergens: Allergen[]
  dish?: {
    id: string
    title: string
    description: string
    type: string
    photoPath: string | null
    allergens: Allergen[]
  }
}

export function DishForm({ allergens, dish }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const form = useForm<{
    title: string
    description: string
    type: string
    photo: File | null
    allergen_ids: string[]
  }>({
    title: dish?.title ?? '',
    description: dish?.description ?? '',
    type: dish?.type ?? '',
    photo: null,
    allergen_ids: dish?.allergens?.map((a) => a.id) ?? [],
  })

  function toggleAllergen(id: string) {
    const current = form.data.allergen_ids
    form.setData(
      'allergen_ids',
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
    )
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dish) {
      form.patch(`/dashboard/dishes/${dish.id}`, { forceFormData: true })
    } else {
      form.post('/dashboard/dishes', { forceFormData: true })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Nom du plat</FieldLabel>
          <Input
            id="title"
            value={form.data.title}
            onChange={(e) => form.setData('title', e.target.value)}
            required
          />
          <FieldError message={form.errors.title} />
        </Field>

        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <FormSelect
            id="type"
            value={form.data.type}
            onValueChange={(v) => form.setData('type', v)}
            options={DISH_TYPE_OPTIONS}
            placeholder="Sélectionner…"
          />
          <FieldError message={form.errors.type} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            value={form.data.description}
            onChange={(e) => form.setData('description', e.target.value)}
            rows={3}
            required
          />
          <FieldError message={form.errors.description} />
        </Field>

        <Field>
          <FieldLabel>Photo</FieldLabel>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative size-20 rounded-lg overflow-hidden border shrink-0"
            >
              {previewUrl || imageUrl(dish?.photoPath) ? (
                <img
                  src={previewUrl ?? imageUrl(dish?.photoPath)!}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full bg-muted flex items-center justify-center">
                  <ImageOffIcon className="size-6 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="size-5 text-white" />
              </div>
            </button>
            <p className="text-xs text-muted-foreground">
              {previewUrl ? 'Photo sélectionnée' : 'Cliquer pour choisir une photo'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                form.setData('photo', file)
                setPreviewUrl(file ? URL.createObjectURL(file) : null)
              }}
            />
          </div>
          <FieldError message={form.errors.photo} />
        </Field>

        {allergens.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Allergènes</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allergens.map((allergen) => (
                <label key={allergen.id} className="flex items-center gap-2 text-sm cursor-pointer">
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

        {(form.isDirty || !dish) && (
          <Button type="submit" size="sm" disabled={form.processing} className="w-fit">
            {dish ? 'Enregistrer les modifications' : 'Créer le plat'}
          </Button>
        )}
      </FieldGroup>
    </form>
  )
}
