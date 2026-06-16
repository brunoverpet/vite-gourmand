import type React from 'react'
import { FlashToaster } from '~/components/flash-toaster'
import Footer from '~/components/footer/footer'
import Navbar from '~/components/nav/navbar'
import MainWrapper from '~/layouts/main-wrapper'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <MainWrapper>{children}</MainWrapper>
      <Footer />

      <FlashToaster />
    </div>
  )
}
