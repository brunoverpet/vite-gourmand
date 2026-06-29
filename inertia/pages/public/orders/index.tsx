import type { Data } from '@generated/data'
import type { InertiaProps } from '~/types'
import { OrderForm } from '~/components/orders/order-form'

type Estimate = {
  distanceKm: number
  deliveryFee: number
  menuPrice: number
  total: number
  hasReduction: boolean
  savedAmount: number
} | null

type CommandeProps = InertiaProps<{
  menu: Data.Menus.Menu | null
  estimate?: Estimate
}>

export default function Commande({ menu, user, estimate }: CommandeProps) {
  return <OrderForm menu={menu} user={user} estimate={estimate} />
}
