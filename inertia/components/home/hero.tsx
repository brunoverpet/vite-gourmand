import { Link } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-svh w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/hero.webp')" }}
    >
      <div
        className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pt-32 pb-12 md:px-20 md:pb-20 xl:pb-24">
        <div className="max-w-3xl">
          <h1 id="hero-title" className="text-h1 text-primary-foreground">
            Cuisinés avec soin. Livrés avec amour.
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button asChild>
              <Link href="/menu">Voir nos menus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
