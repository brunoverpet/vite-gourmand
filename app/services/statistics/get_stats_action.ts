import { OrderStat } from '../../mongodb/order_stat.js'

export class GetStatsAction {
  async execute(menuId: string | null, from: string | null, to: string | null) {
    const match: Record<string, unknown> = {}

    if (menuId) {
      match.menuId = menuId
    }

    if (from || to) {
      const dateFilter: Record<string, Date> = {}
      if (from) dateFilter.$gte = new Date(from)
      if (to) dateFilter.$lte = new Date(to)
      match.orderDate = dateFilter
    }

    return OrderStat.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$menuId',
          menuTitle: { $first: '$menuTitle' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' },
        },
      },
      { $sort: { revenue: -1 } },
    ])
  }
}
