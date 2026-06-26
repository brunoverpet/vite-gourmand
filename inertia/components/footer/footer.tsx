import NavLink from '~/components/nav/nav-link'
import { FooterOpeningHours } from '~/components/footer/footer-opening-hours'

type FooterProps = {}

const FOOTER_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos menus', href: '/menu' },
  { label: 'Contact', href: '/contact' },
  { label: 'Inscription', href: '/signup' },
  { label: 'Connexion', href: '/login' },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/legal-notices' },
  { label: 'CGV', href: '/cgv' },
]

export default function Footer({}: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground py-10 px-6">
      <h2 className="text-h4 md:text-center">Vite & Gourmand</h2>
      <p className="text-primary-foreground md:text-center">
        Traiteur événementiel à Bordeaux depuis 2001.
      </p>
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <div className="md:flex gap-20 justify-center">
        <FooterOpeningHours />
        <hr className="mx-auto border-border w-1/2 my-4 md:hidden" />
        <nav aria-label="Navigation du site">
          <p className="text-label-caps text-primary-foreground my-1">Navigation</p>
          {FOOTER_LINKS.map((link) => (
            <div key={link.href} className="flex flex-row gap-1">
              <NavLink href={link.href} className="text-primary-foreground">
                {link.label}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <nav aria-label="Liens légaux" className="text-center">
        <p className="text-label-caps text-primary-foreground my-1">Légal</p>
        {LEGAL_LINKS.map((link) => (
          <div key={link.href} className="flex flex-row gap-1 md:justify-center">
            <NavLink href={link.href} className="text-primary-foreground">
              {link.label}
            </NavLink>
          </div>
        ))}
      </nav>
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <p className="text-center text-caption text-primary-foreground/90">
        © 2001 – 2026 Vite & Gourmand
      </p>
    </footer>
  )
}
