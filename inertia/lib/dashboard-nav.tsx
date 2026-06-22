import {
  BarChart2Icon,
  ClipboardListIcon,
  ClockIcon,
  ShoppingBagIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  UtensilsIcon,
} from 'lucide-react'
import type { NavGroupDef } from '~/components/dashboard/nav-group'

export const ACCOUNT_NAV: NavGroupDef[] = [
  {
    label: 'Compte',
    items: [{ href: '/dashboard/profile', icon: <UserIcon />, label: 'Mon profil' }],
  },
]

export const CLIENT_NAV: NavGroupDef[] = [
  {
    label: 'Mon espace',
    items: [{ href: '/dashboard/my-orders', icon: <ShoppingBagIcon />, label: 'Mes commandes' }],
  },
]

export const EMPLOYEE_NAV: NavGroupDef[] = [
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

export const ADMIN_EXTRA_NAV: NavGroupDef[] = [
  {
    label: 'Administration',
    items: [
      { href: '/dashboard/employees', icon: <UsersIcon />, label: 'Comptes employés' },
      { href: '/dashboard/stats', icon: <BarChart2Icon />, label: 'Statistiques' },
    ],
  },
]
