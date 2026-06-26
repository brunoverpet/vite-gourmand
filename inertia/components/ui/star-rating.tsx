import { Star } from 'lucide-react'
import { cn } from '~/lib/utils'

type Props = {
  note: number
  size?: 'sm' | 'md'
  activeClass?: string
  inactiveClass?: string
}

export function StarRating({
  note,
  size = 'sm',
  activeClass = 'text-amber-400 fill-amber-400',
  inactiveClass = 'text-amber-200 fill-none',
}: Props) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn(
            size === 'md' ? 'size-5' : 'w-4 h-4',
            star <= note ? activeClass : inactiveClass
          )}
        />
      ))}
    </div>
  )
}
