import { Star } from 'lucide-react'

export function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= note ? 'text-amber-400 fill-amber-400' : 'text-amber-200 fill-none'}`}
        />
      ))}
    </div>
  )
}
