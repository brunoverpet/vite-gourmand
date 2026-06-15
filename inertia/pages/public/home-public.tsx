import Hero from '~/components/home/hero'
import ReviewCard from '~/components/home/review-card'
import CardMenu from '~/components/menu/card-menu'
import { Button } from '~/components/ui/button'

const MENUS = [
  {
    name: 'Menu Noël',
    price: 68,
    minPersons: 8,
    image: '/assets/christmas.webp',
    tags: ['Classique', 'Noël'],
  },
  {
    name: 'Menu Pâques',
    price: 54,
    minPersons: 6,
    image: '/assets/easters.webp',
    tags: ['Classique', 'Pâques'],
  },
  {
    name: 'Menu Classique',
    price: 48,
    minPersons: 5,
    image: '/assets/classique.webp',
    tags: ['Classique'],
  },
]

const REVIEWS = [
  {
    rating: 4,
    comment:
      "Un repas de Noël absolument inoubliable. Les plats étaient raffinés, la livraison parfaite à l'heure. Julie et José ont su sublimer notre soirée en famille.",
    author: 'Sophie M.',
  },
  {
    rating: 5,
    comment:
      "Julie et José ont su s'adapter à nos contraintes alimentaires. Un service impeccable du début à la fin.",
    author: 'Pierre L.',
  },
  {
    rating: 5,
    comment:
      'Des saveurs exceptionnelles et une présentation digne des plus grands restaurants. Je recommande vivement.',
    author: 'Marie T.',
  },
]

export default function HomePublic() {
  return (
    <>
      <Hero />
      <section className="mt-20 mx-auto px-6 md:px-10 xl:px-20">
        <p className="text-label-caps text-accent">Le catalogue</p>
        <h2 className="text-h2">Nos menus du moment</h2>
        <p className="text-muted-foreground mt-2">
          Une sélection renouvelée selon les saisons, pensée pour chaque type d&apos;événement.
        </p>
        <div className="flex flex-col my-10 gap-5">
          {MENUS.map((menu) => (
            <CardMenu key={menu.name} {...menu} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" className="text-foreground">
            Voir nos menus
          </Button>
        </div>
      </section>

      <section className="mt-20">
        <img src="/assets/story.webp" alt="" className="rounded-t-2xl w-full" />
        <div className="bg-secondary py-5">
          <div className="mx-6">
            <p className="text-label-caps text-primary">Notre histoire</p>
            <h2 className="text-h2">25 ans de passion à Bordeaux</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Julie et José ont fondé Vite & Gourmand en 2001. Ce qui a commencé comme une petite
              aventure culinaire à Bordeaux est aujourd&apos;hui une référence locale pour les
              événements de toutes tailles. Depuis plus de 25 ans, ils sillonnent les marchés de la
              région pour sélectionner les meilleurs producteurs, adapter leurs menus aux saisons et
              créer des expériences gastronomiques sur mesure. Chaque commande est traitée avec la
              même rigueur et la même passion — qu&apos;il s&apos;agisse d&apos;un repas de famille
              de 6 personnes ou d&apos;un événement d&apos;entreprise de 200 convives.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 mx-6">
        <p className="text-label-caps text-accent">Avis client</p>
        <h2 className="text-h2">Ce qu&apos;ils en disent</h2>
        <div className="flex flex-col my-10 gap-5">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>
      </section>

      <section className="my-20">
        <h3 className="text-h3 text-center">Prêt à commander ?</h3>
        <p className="text-primary/70 mx-3 text-center">Commandez en quelques clics.</p>
        <div className="flex justify-center mt-4">
          <Button variant="outline">Voir nos menus</Button>
        </div>
      </section>
    </>
  )
}
