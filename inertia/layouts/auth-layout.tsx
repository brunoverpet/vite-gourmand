import React from 'react'
import { GalleryVerticalEndIcon } from 'lucide-react'
import { FieldDescription } from '@/components/ui/field'
import { FlashToaster } from '~/components/flash-toaster'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: React.ReactNode
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEndIcon className="size-6" />
            </div>
            <span className="sr-only">Vite & Gourmand.</span>
          </a>
          <h1 className="text-xl font-bold">{title}</h1>
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>

        {children}

        <FieldDescription className="px-6 text-center">
          En cliquant sur continuer, vous acceptez nos <a href="#">conditions d’utilisation</a> et
          notre <a href="#">politique de confidentialité</a>.
        </FieldDescription>
      </div>
      <FlashToaster />
    </div>
  )
}
