import { Star } from 'lucide-react'
import { cn } from '~/lib/utils'

type ReviewCardProps = {
  rating: number
  comment: string
  author: string
}

export default function ReviewCard({ rating, comment, author }: ReviewCardProps) {
  return (
    <article className="rounded-2xl bg-secondary p-6 border border-border">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn('size-5', i < rating ? 'fill-accent text-accent' : 'text-accent')}
          />
        ))}
      </div>
      <p className="italic text-foreground mb-4">{`"${comment}"`}</p>
      <p className="text-body-sm text-muted-foreground">{author}</p>
    </article>
  )
}
