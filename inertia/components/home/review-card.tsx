import { StarRating } from '~/components/ui/star-rating'

type ReviewCardProps = {
  rating: number
  comment: string
  author: string
}

export default function ReviewCard({ rating, comment, author }: ReviewCardProps) {
  return (
    <article className="rounded-2xl bg-card p-6 border border-border md:flex-1">
      <div className="mb-4">
        <StarRating
          note={rating}
          size="md"
          activeClass="fill-accent-text text-accent-text"
          inactiveClass="text-accent-text/40"
        />
      </div>
      <p className="italic text-foreground mb-4">{`"${comment}"`}</p>
      <p className="text-body-sm text-muted-foreground">{author}</p>
    </article>
  )
}
