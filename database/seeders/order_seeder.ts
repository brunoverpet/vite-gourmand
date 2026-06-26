import { OrderStatus } from '#enums/order_status'
import Menu from '#models/menu'
import Order from '#models/order'
import OrderStatusHistory from '#models/order_status_history'
import User from '#models/user'
import { OrderStat } from '../../app/mongodb/order_stat.js'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

const STATUSES_PAST_ACCEPTED = [
  OrderStatus.ACCEPTED,
  OrderStatus.IN_PREPARATION,
  OrderStatus.IN_DELIVERY,
  OrderStatus.DELIVERED,
  OrderStatus.COMPLETED,
]

export default class OrderSeeder extends BaseSeeder {
  async run() {
    const client = await User.findByOrFail('email', 'client@vite-gourmand.fr')
    const menus = await Menu.all()

    if (menus.length === 0) return

    const orders: {
      menuIndex: number
      numberOfPeople: number
      status: OrderStatus
      orderDate: DateTime
    }[] = [
      {
        menuIndex: 0,
        numberOfPeople: 12,
        status: OrderStatus.COMPLETED,
        orderDate: DateTime.now().minus({ months: 2 }),
      },
      {
        menuIndex: 0,
        numberOfPeople: 10,
        status: OrderStatus.ACCEPTED,
        orderDate: DateTime.now().minus({ weeks: 3 }),
      },
      {
        menuIndex: 1,
        numberOfPeople: 8,
        status: OrderStatus.COMPLETED,
        orderDate: DateTime.now().minus({ months: 1 }),
      },
      {
        menuIndex: 1,
        numberOfPeople: 6,
        status: OrderStatus.IN_PREPARATION,
        orderDate: DateTime.now().minus({ days: 5 }),
      },
      {
        menuIndex: 2,
        numberOfPeople: 15,
        status: OrderStatus.COMPLETED,
        orderDate: DateTime.now().minus({ months: 3 }),
      },
      {
        menuIndex: 2,
        numberOfPeople: 8,
        status: OrderStatus.DELIVERED,
        orderDate: DateTime.now().minus({ days: 10 }),
      },
      {
        menuIndex: 0,
        numberOfPeople: 20,
        status: OrderStatus.CANCELLED,
        orderDate: DateTime.now().minus({ weeks: 2 }),
      },
      {
        menuIndex: 1,
        numberOfPeople: 10,
        status: OrderStatus.PENDING,
        orderDate: DateTime.now().minus({ days: 1 }),
      },
    ]

    for (const data of orders) {
      const menu = menus[data.menuIndex % menus.length]
      const pricePerPeople = Number(menu.pricePerPeople)
      const menuPrice = pricePerPeople * data.numberOfPeople
      const deliveryFees = 5
      const totalAmount = menuPrice + deliveryFees

      const order = await Order.create({
        userId: client.id,
        menuId: menu.id,
        status: data.status,
        numberOfPeople: data.numberOfPeople,
        menuPrice: menuPrice.toFixed(2),
        deliveryFees: deliveryFees.toFixed(2),
        reductionAmount: '0',
        totalAmount: totalAmount.toFixed(2),
        deliveryAddress: '12 rue de la Paix',
        deliveryCity: 'Bordeaux',
        deliveryZipcode: '33000',
        deliveryTime: '12:00',
        eventDate: data.orderDate.plus({ days: 7 }),
        orderDate: data.orderDate,
        orderNumber: 'ORD-' + Math.random().toString(36).slice(2, 6).toUpperCase(),
        materialLoan: false,
      })

      await OrderStatusHistory.create({
        orderId: order.id,
        status: data.status,
        changedAt: data.orderDate,
      })

      if (STATUSES_PAST_ACCEPTED.includes(data.status)) {
        await OrderStat.findOneAndUpdate(
          { orderId: order.id },
          {
            orderId: order.id,
            menuId: menu.id,
            menuTitle: menu.title,
            totalPrice: totalAmount,
            orderDate: data.orderDate.toJSDate(),
          },
          { upsert: true }
        )
      }
    }
  }
}
