import { useState } from 'react'
import { Star } from 'lucide-react'

type Props = {
  selected: number
  onSelect: (note: number) => void
}

export function StarPicker({ selected, onSelect }: Props) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1" role="group" aria-label="Note sur 5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hovered || selected) >= star
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} étoile${star > 1 ? 's' : ''} sur 5`}
            aria-pressed={selected === star}
            onClick={() => onSelect(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' && star < 5) {
                e.preventDefault()
                onSelect(star + 1)
              }
              if (e.key === 'ArrowLeft' && star > 1) {
                e.preventDefault()
                onSelect(star - 1)
              }
            }}
            className="transition-colors"
          >
            <Star
              aria-hidden="true"
              className={`w-8 h-8 transition-colors ${active ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-none'}`}
            />
          </button>
        )
      })}
    </div>
  )
}
