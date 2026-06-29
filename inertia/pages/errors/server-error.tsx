import { Link } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-8xl font-bold text-primary/20 select-none">500</p>
      <h1 className="mt-4 text-2xl font-semibold">Une erreur est survenue</h1>
      <p className="mt-2 text-muted-foreground max-w-sm">
        Nos équipes ont été notifiées. Veuillez réessayer dans quelques instants.
      </p>
      <Link href="/" className="mt-8">
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </div>
  )
}
