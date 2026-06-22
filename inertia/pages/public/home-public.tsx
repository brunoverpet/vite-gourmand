import { Link } from '@adonisjs/inertia/react'
import type { Data } from '@generated/data'
import Hero from '~/components/home/hero'
import ReviewCard from '~/components/home/review-card'
import CardMenu from '~/components/menu/card-menu'
import { Button } from '~/components/ui/button'
import type { InertiaProps } from '~/types'

type HomeProps = InertiaProps<{
  menus: Data.Menus.Menu[]
  notices: Data.Notices.Notice.Variants['forPublic'][]
}>

export default function HomePublic({ menus, notices }: HomeProps) {
  return (
    <>
      <Hero />
      <section className="mt-20 mx-auto px-6 max-w-7xl">
        <p className="text-label-caps text-accent">Le catalogue</p>
        <h2 className="text-h2">Nos menus du moment</h2>
        <p className="text-muted-foreground mt-2">
          Une sélection renouvelée selon les saisons, pensée pour chaque type d&apos;événement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-10 gap-5">
          {menus.map((menu) => (
            <CardMenu
              key={menu.id}
              id={menu.id}
              name={menu.title}
              description={menu.description}
              price={menu.pricePerPeople}
              minPersons={menu.minPeople}
              image={
                menu.pictures?.[0]
                  ? `/uploads/${menu.pictures[0].imagePath}`
                  : 'https://placehold.co/600x400'
              }
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline">
            <Link route="menus.render">Voir nos menus</Link>
          </Button>
        </div>
      </section>

      <section className="mt-20 md:my-52">
        <div className="md:flex md:h-130">
          <img
            src="/assets/story.webp"
            alt=""
            className="rounded-t-2xl w-full md:w-1/2 md:rounded-l-none md:rounded-r-2xl md:h-full md:object-cover"
          />
          <div className="bg-secondary py-5 md:rounded-l-2xl md:rounded-r-none md:w-1/2 md:flex md:items-center">
            <div className="mx-6 max-w-prose">
              <p className="text-label-caps text-primary">Notre histoire</p>
              <h2 className="text-h2">25 ans de passion à Bordeaux</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Julie et José ont fondé Vite &amp; Gourmand en 2001. Ce qui a commencé comme une
                petite aventure culinaire à Bordeaux est aujourd&apos;hui une référence locale pour
                les événements de toutes tailles.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Depuis plus de 25 ans, ils sillonnent les marchés de la région, adaptent leurs menus
                aux saisons et traitent chaque commande avec la même rigueur — qu&apos;il
                s&apos;agisse d&apos;un repas de famille ou d&apos;un événement de 200 convives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <p className="text-label-caps text-accent">Avis client</p>
        <h2 className="text-h2">Ce qu&apos;ils en disent</h2>
        <div className="flex flex-col my-10 gap-5 md:flex-row">
          {notices.map((notice, i) => (
            <ReviewCard
              key={i}
              rating={notice.note}
              comment={notice.description}
              author={notice.author ?? ''}
            />
          ))}
        </div>
      </section>

      <section className="my-20 max-w-7xl mx-auto px-6">
        <h3 className="text-h3 text-center">Prêt à commander ?</h3>
        <p className="text-primary/70 mx-3 text-center">Commandez en quelques clics.</p>
        <div className="flex justify-center mt-4">
          <Button variant="outline">
            <Link route="menus.render">Voir nos menus</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
