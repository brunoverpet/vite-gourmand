import * as React from 'react'
import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export type NavItemDef = {
  href: string
  icon: React.ReactNode
  label: string
}

export type NavGroupDef = {
  label?: string
  items: NavItemDef[]
}

export function NavGroup({ group }: { group: NavGroupDef }) {
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
