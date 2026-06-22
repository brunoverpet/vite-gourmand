import * as React from 'react'

import { NavUser } from '@/components/dashboard/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  BarChart2Icon,
  ClipboardListIcon,
  ClockIcon,
  ExternalLinkIcon,
  ShoppingBagIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  UtensilsIcon,
} from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { useSidebar } from '@/components/ui/sidebar'
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

type NavItemDef = {
  href: string
  icon: React.ReactNode
  label: string
}

type NavGroupDef = {
  label?: string
  items: NavItemDef[]
}

function NavGroup({ group }: { group: NavGroupDef }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const { url } = usePage()

  function handleClick() {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <SidebarGroup>
      {group.label && (
        <SidebarGroupLabel className="text-primary font-medium">{group.label}</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={url.startsWith(item.href)}>
                <Link href={item.href} onClick={handleClick}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const ACCOUNT_NAV: NavGroupDef[] = [
  {
    label: 'Compte',
    items: [{ href: '/dashboard/profile', icon: <UserIcon />, label: 'Mon profil' }],
  },
]

const CLIENT_NAV: NavGroupDef[] = [
  {
    label: 'Mon espace',
    items: [{ href: '/dashboard/my-orders', icon: <ShoppingBagIcon />, label: 'Mes commandes' }],
  },
]

const EMPLOYEE_NAV: NavGroupDef[] = [
  {
    label: 'Commandes',
    items: [
      { href: '/dashboard/orders', icon: <ClipboardListIcon />, label: 'Gestion des commandes' },
    ],
  },
  {
    label: 'Catalogue',
    items: [
      { href: '/dashboard/menus', icon: <UtensilsIcon />, label: 'Menus & plats' },
      { href: '/dashboard/schedules', icon: <ClockIcon />, label: 'Horaires' },
    ],
  },
  {
    label: 'Communauté',
    items: [{ href: '/dashboard/notices', icon: <StarIcon />, label: 'Avis clients' }],
  },
]

const ADMIN_EXTRA_NAV: NavGroupDef[] = [
  {
    label: 'Administration',
    items: [
      { href: '/dashboard/employees', icon: <UsersIcon />, label: 'Comptes employés' },
      { href: '/dashboard/stats', icon: <BarChart2Icon />, label: 'Statistiques' },
    ],
  },
]

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
