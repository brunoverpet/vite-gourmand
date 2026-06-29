import { type Data } from '@generated/data'
import { type ReactElement } from 'react'
import { AppSidebar } from '~/components/dashboard/app-sidebar'
import { DashboardBreadcrumb } from '~/components/dashboard/dashboard-breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { FlashToaster } from '~/components/flash-toaster'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <DashboardBreadcrumb />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-6 md:p-8 pt-0">{children}</main>
      </SidebarInset>

      <FlashToaster />
    </SidebarProvider>
  )
}
