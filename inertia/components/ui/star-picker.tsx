import { useState } from 'react'
import { Star } from 'lucide-react'

type Props = {
  selected: number
  onSelect: (note: number) => void
}

export function StarPicker({ selected, onSelect }: Props) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hovered || selected) >= star
        return (
          <button
            key={star}
            type="button"
            onClick={() => onSelect(star)}
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
  )
}
