import { cn } from '@/lib/utils'
import { usePage } from '@inertiajs/react'
import type React from 'react'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePage().url
  const isHome = pathname === '/'

  return (
    <main
      className={cn(
        'flex-1 w-full mx-auto px-5 md:px-10 xl:px-20 max-w-7xl',
        isHome ? 'pt-52' : 'pt-41 md:pt-45 xl:pt-53'
      )}
    >
      {children}
    </main>
  )
}
