import { useEffect, useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { Menu, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import NavLink from '~/components/nav/nav-link'
import { cn } from '~/lib/utils'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos menus', href: '/menus' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = usePage().url === '/'
  const isTransparent = isHome && !isScrolled

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-colors duration-300',
          isTransparent ? 'bg-transparent md:bg-background' : 'bg-background'
        )}
      >
        <div className="max-w-full mx-auto h-20 px-6 md:px-20 flex items-center justify-between">
          <Link
            route="home-public"
            className={`text-h4 transition-colors duration-300 ${isTransparent ? 'text-primary-foreground md:text-foreground' : 'text-foreground'}`}
          >
            Vite & Gourmand
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <Button asChild>
              <Link route="session.render">Connexion</Link>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className={cn(
              'md:hidden transition-colors duration-300',
              isTransparent ? 'text-primary-foreground' : 'text-foreground'
            )}
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-primary flex flex-col px-5 py-10 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        inert={!isOpen}
      >
        <div className="flex items-center justify-between">
          <Link
            route="home-public"
            className="text-h4 text-sidebar-foreground"
            onClick={() => setIsOpen(false)}
          >
            Vite & Gourmand
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </Button>
        </div>

        <nav className="flex flex-col gap-6 mt-12 flex-1">
          {NAV_LINKS.map((link, index) => (
            <div
              key={link.href}
              className={cn(
                'transition-all duration-300',
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: isOpen ? `${index * 100 + 150}ms` : '0ms' }}
            >
              <NavLink
                href={link.href}
                className="text-h2 text-sidebar-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <Button asChild variant="outline" className="w-full text-primary-foreground">
          <Link route="session.render" onClick={() => setIsOpen(false)}>
            Connexion
          </Link>
        </Button>
      </div>
    </>
  )
}
