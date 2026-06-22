import * as React from 'react'

import { NavUser } from '@/components/dashboard/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ClipboardListIcon, ShoppingBagIcon, UtensilsIcon } from 'lucide-react'
import { usePage, Link } from '@inertiajs/react'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'

type PageProps = InertiaProps<{
  user: Data.Auth.User
}>

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href}>
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const page = usePage()
  const { user } = page.props as unknown as PageProps

  const isEmployeeOrAdmin = user?.role === 'employe' || user?.role === 'admin'

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UtensilsIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Vite &amp; Gourmand</span>
                  <span className="truncate text-xs capitalize">{user?.role ?? 'Espace'}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2 py-2">
          {isEmployeeOrAdmin ? (
            <>
              <NavItem
                href="/dashboard/orders"
                icon={<ClipboardListIcon />}
                label="Gestion des commandes"
              />
              <NavItem href="/menus" icon={<UtensilsIcon />} label="Menus" />
            </>
          ) : (
            <>
              <NavItem
                href="/dashboard/my-orders"
                icon={<ShoppingBagIcon />}
                label="Mes commandes"
              />
              <NavItem href="/menus" icon={<UtensilsIcon />} label="Nos menus" />
            </>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user ? `${user.firstname} ${user.lastname}` : 'Invité',
            email: user?.email ?? '',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
