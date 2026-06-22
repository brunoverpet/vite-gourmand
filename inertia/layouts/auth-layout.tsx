import React from 'react'
import { FieldDescription } from '@/components/ui/field'
import { FlashToaster } from '~/components/flash-toaster'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description?: React.ReactNode
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-svh flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src="/assets/story.webp"
          alt="Vite & Gourmand"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-primary-foreground">
          <p className="font-serif text-4xl italic leading-tight mb-4">
            L&apos;art de recevoir,
            <br />
            livré chez vous.
          </p>
          <p className="text-primary-foreground/70 text-sm">Vite &amp; Gourmand · Bordeaux</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-h2">{title}</h1>
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>

          {children}

          <FieldDescription className="text-center">
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">
              conditions d&apos;utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">
              politique de confidentialité
            </a>
            .
          </FieldDescription>
        </div>

        <FlashToaster />
      </div>
    </div>
  )
}
