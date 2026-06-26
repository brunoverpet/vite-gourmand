import type React from 'react'
import { FlashToaster } from '~/components/flash-toaster'
import Footer from '~/components/footer/footer'
import Navbar from '~/components/nav/navbar'
import MainWrapper from '~/layouts/main-wrapper'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:outline-none"
      >
        Aller au contenu
      </a>
      <Navbar />

      <MainWrapper>{children}</MainWrapper>
      <Footer />

      <FlashToaster />
    </div>
  )
}
