import { useEffect, useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { Menu } from 'lucide-react'
import { Button } from '~/components/ui/button'
import NavLink from '~/components/nav/nav-link'
import { MobileMenu } from '~/components/nav/mobile-menu'
import { cn } from '~/lib/utils'
import type { InertiaProps } from '~/types'

type PageProps = InertiaProps

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos menus', href: '/menus' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const page = usePage()
  const { user } = page.props as unknown as PageProps
  const isHome = page.url === '/'
  const isTransparent = isHome && !isScrolled

  const isStaff = user?.role === 'admin' || user?.role === 'employe'
  const isClient = user?.role === 'user'

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

          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            {isStaff ? (
              <Button asChild variant="outline">
                <Link href="/dashboard/orders">Tableau de bord</Link>
              </Button>
            ) : isClient ? (
              <Button asChild variant="outline">
                <Link href="/dashboard/my-orders">Mes commandes</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link route="session.render">Connexion</Link>
              </Button>
            )}
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
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isStaff={isStaff}
        isClient={isClient}
      />
    </>
  )
}
