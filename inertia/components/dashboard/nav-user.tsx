import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { Form } from '@adonisjs/inertia/react'
import { LogOutIcon } from 'lucide-react'

export interface UserInfo {
  user: {
    name: string
    email: string
    avatar: string
    role?: string
  }
}

export function NavUser({ user }: UserInfo) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Form route="session.destroy">
          <SidebarMenuButton asChild>
            <button type="submit" className="w-full">
              <LogOutIcon />
              <span>Déconnexion</span>
            </button>
          </SidebarMenuButton>
        </Form>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-8 w-8 rounded-lg shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            {user.role && (
              <span className="truncate text-xs text-primary/70">{user.role}</span>
            )}
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
