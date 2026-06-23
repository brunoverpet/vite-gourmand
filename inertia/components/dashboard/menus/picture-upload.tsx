import { useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { PlusIcon, XIcon } from 'lucide-react'

type Picture = { id: string; imagePath: string }

type Props = {
  menuId: string
  pictures: Picture[]
}

export function PictureUpload({ menuId, pictures }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadForm = useForm<{ picture: File | null }>({ picture: null })
  const deleteForm = useForm({})
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    uploadForm.setData('picture', file)
    uploadForm.post(`/dashboard/menus/${menuId}/pictures`, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        uploadForm.reset()
        if (fileInputRef.current) fileInputRef.current.value = ''
      },
    })
  }

  function handleDelete(pictureId: string) {
    setDeletingId(pictureId)
    deleteForm.delete(`/dashboard/menus/${menuId}/pictures/${pictureId}`, {
      preserveScroll: true,
      onFinish: () => setDeletingId(null),
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Galerie</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {pictures.map((picture) => (
          <div
            key={picture.id}
            className="relative group aspect-square rounded-lg overflow-hidden border"
          >
            <img src={`/uploads/${picture.imagePath}`} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => handleDelete(picture.id)}
              disabled={deletingId === picture.id || deleteForm.processing}
              className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              <XIcon className="size-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadForm.processing}
          className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-muted-foreground/60 transition-colors disabled:opacity-50"
        >
          <PlusIcon className="size-6 text-muted-foreground/40" />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploadForm.processing}
      />
    </div>
  )
}
