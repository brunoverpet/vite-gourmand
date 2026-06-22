/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  homePublic: typeof routes['home-public']
  contact: typeof routes['contact'] & {
    render: typeof routes['contact.render']
  }
  menus: {
    render: typeof routes['menus.render']
    show: typeof routes['menus.show']
  }
  register: typeof routes['register'] & {
    render: typeof routes['register.render']
  }
  session: typeof routes['session'] & {
    render: typeof routes['session.render']
    destroy: typeof routes['session.destroy']
  }
  requestPasswordReset: typeof routes['request_password_reset'] & {
    show: typeof routes['request_password_reset.show']
  }
  resetPassword: typeof routes['reset_password'] & {
    show: typeof routes['reset_password.show']
  }
  pictures: typeof routes['pictures']
  home: typeof routes['home']
  order: {
    render: typeof routes['order.render']
    store: typeof routes['order.store']
  }
  orderStatus: {
    update: typeof routes['order_status.update']
  }
  ordersManagement: {
    index: typeof routes['orders_management.index']
  }
  clientOrders: {
    index: typeof routes['client_orders.index']
    show: typeof routes['client_orders.show']
    update: typeof routes['client_orders.update']
    cancel: typeof routes['client_orders.cancel']
  }
  profile: {
    show: typeof routes['profile.show']
    update: typeof routes['profile.update']
  }
  registerNotice: typeof routes['register_notice']
  validateNotice: typeof routes['validate_notice'] & {
    render: typeof routes['validate_notice.render']
  }
}
