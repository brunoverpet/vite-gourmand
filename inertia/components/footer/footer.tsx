import NavLink from '~/components/nav/nav-link'

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
    <footer className="bg-primary text-primary-foreground py-10 px-4">
      <h4 className="text-h4 md:text-center">Vite & Gourmand</h4>
      <p className="text-primary-foreground/60 md:text-center">
        Traiteur événementiel à Bordeaux depuis 2001.
      </p>
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <div className="md:flex gap-6 justify-center">
        <div>
          <h5 className="text-label-caps text-primary-foreground/60 my-1">Horaires</h5>
          <p>Lun – Ven : 9h – 18h</p>
          <p>Sam – Dim : 10h – 16h</p>
        </div>
        <hr className="mx-auto border-border w-1/2 my-4 md:hidden" />
        <div>
          <h5 className="text-label-caps text-primary-foreground/60 my-1">Navigation</h5>
          {FOOTER_LINKS.map((link) => (
            <div key={link.href} className="flex flex-row gap-1">
              <NavLink key={link.href} href={link.href} className="text-primary-foreground">
                {link.label}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <h5 className="text-label-caps text-primary-foreground/60 my-1 text-center">Légal</h5>
      {LEGAL_LINKS.map((link) => (
        <div key={link.href} className="flex flex-row gap-1 md:justify-center">
          <NavLink key={link.href} href={link.href} className="text-primary-foreground">
            {link.label}
          </NavLink>
        </div>
      ))}
      <hr className="mx-auto border-border w-1/2 my-4 md:w-1/12" />
      <p className="text-center text-caption text-primary-foreground/50">
        © 2001 – 2026 Vite & Gourmand
      </p>
    </footer>
  )
}
