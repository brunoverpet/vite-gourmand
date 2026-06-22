import * as React from 'react'
import { NavUser } from '@/components/dashboard/nav-user'
import { NavGroup } from '@/components/dashboard/nav-group'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ExternalLinkIcon, UtensilsIcon } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { ACCOUNT_NAV, ADMIN_EXTRA_NAV, CLIENT_NAV, EMPLOYEE_NAV } from '~/lib/dashboard-nav'
import type { InertiaProps } from '~/types'
import type { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'

type PageProps = InertiaProps<{
  user: Data.Auth.User
}>

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrateur',
  employe: 'Employé',
  user: 'Client',
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const page = usePage()
  const { user } = page.props as unknown as PageProps

  const isEmployeeOrAdmin = user?.role === 'employe' || user?.role === 'admin'
  const isAdmin = user?.role === 'admin'

  const navGroups = isEmployeeOrAdmin
    ? isAdmin
      ? [...EMPLOYEE_NAV, ...ADMIN_EXTRA_NAV, ...ACCOUNT_NAV]
      : [...EMPLOYEE_NAV, ...ACCOUNT_NAV]
    : [...CLIENT_NAV, ...ACCOUNT_NAV]

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link route="home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg border border-border bg-background">
                  <UtensilsIcon className="size-4 text-foreground" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Vite &amp; Gourmand</span>
                  <span className="truncate text-xs text-muted-foreground">Traiteur Bordeaux</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, i) => (
          <NavGroup key={group.label ?? i} group={group} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link route="home-public">
                <ExternalLinkIcon />
                <span>Retour au site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser
          user={{
            name: user ? `${user.firstname} ${user.lastname}` : 'Invité',
            email: user?.email ?? '',
            avatar: '',
            role: ROLE_LABELS[user?.role ?? ''] ?? '',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
