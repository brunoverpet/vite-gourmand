import type React from 'react'
import Header from '~/layouts/header'
import MainWrapper from '~/layouts/main-wrapper'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <MainWrapper>{children}</MainWrapper>
    </div>
  )
}
