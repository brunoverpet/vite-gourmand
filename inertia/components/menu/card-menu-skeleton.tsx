export default function CardMenuSkeleton() {
  return (
    <article className="relative overflow-hidden rounded-2xl aspect-3/4 md:aspect-auto md:h-96 md:flex-1 bg-muted">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)] w-[200%]" />

      <div className="absolute top-4 left-4 h-5 w-16 rounded-full bg-muted-foreground/20" />
      <div className="absolute top-4 right-4 h-5 w-20 rounded-full bg-muted-foreground/20" />

      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        <div className="h-6 w-3/4 rounded bg-muted-foreground/20" />
        <div className="flex items-end justify-between gap-4">
          <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
          <div className="shrink-0 space-y-1">
            <div className="h-5 w-20 rounded bg-muted-foreground/20 ml-auto" />
            <div className="h-3 w-28 rounded bg-muted-foreground/20 ml-auto" />
          </div>
        </div>
      </div>
    </article>
  )
}
