import { imageUrl as buildImageUrl } from '~/lib/utils'
import type { Data } from '@generated/data'

type Props = {
  pictures: Data.Menus.MenuDetail['pictures']
  activeImage: string | null
  alt: string
  onSelect: (imagePath: string) => void
}

export function MenuGallery({ pictures, activeImage, alt, onSelect }: Props) {
  const imageSrc = activeImage ? (buildImageUrl(activeImage) ?? '') : 'https://placehold.co/800x600'

  return (
    <div className="md:sticky md:top-24 md:self-start">
      <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted">
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
      </div>

      {pictures && pictures.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {pictures.map((pic) => (
            <button
              key={pic.id}
              onClick={() => onSelect(pic.imagePath)}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                activeImage === pic.imagePath ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={buildImageUrl(pic.imagePath) ?? ''}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
