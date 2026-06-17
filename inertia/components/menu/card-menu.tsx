import { Badge } from '~/components/ui/badge'

type CardMenuProps = {
  name: string
  description: string
  price: string
  minPersons: number
  image: string
  tags?: string[]
}

export default function CardMenu({
  name,
  description,
  price,
  minPersons,
  image,
  tags = [],
}: CardMenuProps) {
  const [tagLeft, tagRight] = tags

  return (
    <article className="relative overflow-hidden rounded-2xl aspect-3/4 md:aspect-auto md:h-96 md:flex-1">
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"
        aria-hidden="true"
      />

      {tagLeft && (
        <Badge className="absolute top-4 left-4 bg-accent text-primary-foreground">{tagLeft}</Badge>
      )}
      {tagRight && (
        <Badge variant="secondary" className="absolute top-4 right-4 text-foreground">
          {tagRight}
        </Badge>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-h2 text-primary-foreground line-clamp-2">{name}</h3>
          <div className="text-right shrink-0">
            <p className="text-h3 text-accent">
              {price}€<span className="text-body text-primary-foreground/70">/pers</span>
            </p>
            <p className="text-body-sm text-primary-foreground/60">
              À partir de {minPersons} personnes
            </p>
          </div>
        </div>
        <p className="text-body text-primary-foreground/90 mt-4 line-clamp-2">{description}</p>
      </div>
    </article>
  )
}
