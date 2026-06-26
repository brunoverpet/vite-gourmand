import { Link } from '@adonisjs/inertia/react'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Mobile : image en background full-bleed */}
      <div
        className="md:hidden relative h-dvh w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero.webp')" }}
      >
        <div
          className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-h1 text-primary-foreground">
              Cuisinés avec soin. Livrés avec amour.
            </h1>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                route="contact.render"
                className={cn(buttonVariants({ variant: 'outline' }), 'text-primary-foreground')}
              >
                Nous contacter
              </Link>
              <Link route="menus.render" className={cn(buttonVariants({ variant: 'default' }))}>
                Voir nos menus
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop : layout 2 colonnes */}
      <div className="hidden md:flex min-h-svh items-center pl-32 gap-12">
        <div className="flex-1 max-w-lg">
          <p className="text-label-caps text-muted-foreground mb-4">
            Traiteur événementiel à Bordeaux depuis 2001
          </p>
          <h1 className="text-h1 text-primary">Cuisinés avec soin. Livrés avec amour.</h1>
          <p className="text-body-lg text-muted-foreground mt-4">
            Noël, Pâques, mariages, repas d&apos;entreprise — des menus raffinés livrés à domicile.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link route="contact.render" className={cn(buttonVariants({ variant: 'outline' }))}>
              Nous contacter
            </Link>
            <Link route="menus.render" className={cn(buttonVariants({ variant: 'default' }))}>
              Voir nos menus
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/assets/hero.webp"
            alt="Table dressée Vite & Gourmand"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
