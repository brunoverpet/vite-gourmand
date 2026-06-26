import { useEffect, useRef } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import NavLink from '~/components/nav/nav-link'
import { cn } from '~/lib/utils'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos menus', href: '/menus' },
  { label: 'Contact', href: '/contact' },
]

type Props = {
  isOpen: boolean
  onClose: () => void
  isStaff: boolean
  isClient: boolean
}

export function MobileMenu({ isOpen, onClose, isStaff, isClient }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className={cn(
        'fixed inset-0 z-50 bg-primary flex flex-col px-5 py-10 transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      inert={!isOpen}
    >
      <div className="flex items-center justify-between">
        <Link route="home-public" className="text-h4 text-primary-foreground" onClick={onClose}>
          Vite & Gourmand
        </Link>
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary/80"
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
            <NavLink href={link.href} className="text-h2 text-primary-foreground" onClick={onClose}>
              {link.label}
            </NavLink>
          </div>
        ))}
      </nav>

      {isStaff ? (
        <Button asChild variant="outline" className="w-full text-primary-foreground">
          <Link route="orders_management.index" onClick={onClose}>
            Tableau de bord
          </Link>
        </Button>
      ) : isClient ? (
        <Button asChild variant="outline" className="w-full text-primary-foreground">
          <Link route="orders_management.index" onClick={onClose}>
            Mes commandes
          </Link>
        </Button>
      ) : (
        <Button asChild variant="outline" className="w-full text-primary-foreground">
          <Link route="session.render" onClick={onClose}>
            Connexion
          </Link>
        </Button>
      )}
    </div>
  )
}
