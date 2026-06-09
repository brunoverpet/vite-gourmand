import { useState } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePage } from '@inertiajs/react'

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'La Carte', href: '/carte' },
  { label: 'Formules', href: '/formules' },
  { label: 'À propos', href: '/a-propos' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const currentUrl = usePage().url

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto h-24 px-5 md:px-10 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          Vite & Gourmand.
        </Link>

        {/* NAVIGATION DESKTOP (Masquée sur mobile, flex à partir de md) */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors ',
                currentUrl === link.href
                  ? 'text-accent-foreground font-semibold'
                  : 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* BOUTON BURGER (Mobile-first : visible par défaut, masqué sur md) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 md:hidden text-gray-600 hover:text-black"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* MENU MOBILE EXPANSIBLE */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Ferme le menu au clic
              className={cn(
                'text-base font-medium py-2 transition-colors',
                currentUrl === link.href
                  ? 'text-foreground font-semibold'
                  : 'text-accent-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
