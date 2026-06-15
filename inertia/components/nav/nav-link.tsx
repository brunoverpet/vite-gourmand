import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'

type NavLinkProps = ComponentProps<typeof Link> & {}

export default function NavLink({ children, ...props }: NavLinkProps) {
  const currentUrl = usePage().url

  return (
    <Link
      className={cn(
        'text-foreground hover:underline hover:underline-offset-4 hover:decoration-accent transition-colors',
        currentUrl === props.href ? 'underline underline-offset-4 decoration-accent' : ''
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
