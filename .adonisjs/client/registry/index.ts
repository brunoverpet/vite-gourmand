/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'home-public': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home-public']['types'],
  },
  'contact.render': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['contact.render']['types'],
  },
  'contact': {
    methods: ["POST"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['contact']['types'],
  },
  'menus.render': {
    methods: ["GET","HEAD"],
    pattern: '/menus',
    tokens: [{"old":"/menus","type":0,"val":"menus","end":""}],
    types: placeholder as Registry['menus.render']['types'],
  },
  'menus.show': {
    methods: ["GET","HEAD"],
    pattern: '/menus/:id',
    tokens: [{"old":"/menus/:id","type":0,"val":"menus","end":""},{"old":"/menus/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['menus.show']['types'],
  },
  'register.render': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['register.render']['types'],
  },
  'register': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['register']['types'],
  },
  'session.render': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.render']['types'],
  },
  'session': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session']['types'],
  },
  'request_password_reset.show': {
    methods: ["GET","HEAD"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['request_password_reset.show']['types'],
  },
  'request_password_reset': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['request_password_reset']['types'],
  },
  'reset_password.show': {
    methods: ["GET","HEAD"],
    pattern: '/reset-password/:id',
    tokens: [{"old":"/reset-password/:id","type":0,"val":"reset-password","end":""},{"old":"/reset-password/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reset_password.show']['types'],
  },
  'reset_password': {
    methods: ["POST"],
    pattern: '/reset-password/:id',
    tokens: [{"old":"/reset-password/:id","type":0,"val":"reset-password","end":""},{"old":"/reset-password/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reset_password']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'order.render': {
    methods: ["GET","HEAD"],
    pattern: '/orders/:menuId',
    tokens: [{"old":"/orders/:menuId","type":0,"val":"orders","end":""},{"old":"/orders/:menuId","type":1,"val":"menuId","end":""}],
    types: placeholder as Registry['order.render']['types'],
  },
  'order.store': {
    methods: ["POST"],
    pattern: '/orders',
    tokens: [{"old":"/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['order.store']['types'],
  },
  'admin_menus.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/menus',
    tokens: [{"old":"/dashboard/menus","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus","type":0,"val":"menus","end":""}],
    types: placeholder as Registry['admin_menus.index']['types'],
  },
  'admin_menus.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/menus/create',
    tokens: [{"old":"/dashboard/menus/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/create","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin_menus.create']['types'],
  },
  'admin_menus.store': {
    methods: ["POST"],
    pattern: '/dashboard/menus',
    tokens: [{"old":"/dashboard/menus","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus","type":0,"val":"menus","end":""}],
    types: placeholder as Registry['admin_menus.store']['types'],
  },
  'admin_menus.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/menus/:id/edit',
    tokens: [{"old":"/dashboard/menus/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:id/edit","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/menus/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin_menus.edit']['types'],
  },
  'admin_menus.update': {
    methods: ["PATCH"],
    pattern: '/dashboard/menus/:id',
    tokens: [{"old":"/dashboard/menus/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:id","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_menus.update']['types'],
  },
  'admin_menus.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/menus/:id',
    tokens: [{"old":"/dashboard/menus/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:id","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_menus.destroy']['types'],
  },
  'pictures': {
    methods: ["POST"],
    pattern: '/dashboard/menus/:menuId/pictures',
    tokens: [{"old":"/dashboard/menus/:menuId/pictures","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:menuId/pictures","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:menuId/pictures","type":1,"val":"menuId","end":""},{"old":"/dashboard/menus/:menuId/pictures","type":0,"val":"pictures","end":""}],
    types: placeholder as Registry['pictures']['types'],
  },
  'pictures.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/menus/:menuId/pictures/:id',
    tokens: [{"old":"/dashboard/menus/:menuId/pictures/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:menuId/pictures/:id","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:menuId/pictures/:id","type":1,"val":"menuId","end":""},{"old":"/dashboard/menus/:menuId/pictures/:id","type":0,"val":"pictures","end":""},{"old":"/dashboard/menus/:menuId/pictures/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pictures.destroy']['types'],
  },
  'menu_dishes.sync': {
    methods: ["PUT"],
    pattern: '/dashboard/menus/:id/dishes',
    tokens: [{"old":"/dashboard/menus/:id/dishes","type":0,"val":"dashboard","end":""},{"old":"/dashboard/menus/:id/dishes","type":0,"val":"menus","end":""},{"old":"/dashboard/menus/:id/dishes","type":1,"val":"id","end":""},{"old":"/dashboard/menus/:id/dishes","type":0,"val":"dishes","end":""}],
    types: placeholder as Registry['menu_dishes.sync']['types'],
  },
  'admin_dishes.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/dishes',
    tokens: [{"old":"/dashboard/dishes","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes","type":0,"val":"dishes","end":""}],
    types: placeholder as Registry['admin_dishes.index']['types'],
  },
  'admin_dishes.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/dishes/create',
    tokens: [{"old":"/dashboard/dishes/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes/create","type":0,"val":"dishes","end":""},{"old":"/dashboard/dishes/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin_dishes.create']['types'],
  },
  'admin_dishes.store': {
    methods: ["POST"],
    pattern: '/dashboard/dishes',
    tokens: [{"old":"/dashboard/dishes","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes","type":0,"val":"dishes","end":""}],
    types: placeholder as Registry['admin_dishes.store']['types'],
  },
  'admin_dishes.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/dishes/:id/edit',
    tokens: [{"old":"/dashboard/dishes/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes/:id/edit","type":0,"val":"dishes","end":""},{"old":"/dashboard/dishes/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/dishes/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin_dishes.edit']['types'],
  },
  'admin_dishes.update': {
    methods: ["PATCH"],
    pattern: '/dashboard/dishes/:id',
    tokens: [{"old":"/dashboard/dishes/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes/:id","type":0,"val":"dishes","end":""},{"old":"/dashboard/dishes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_dishes.update']['types'],
  },
  'admin_dishes.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/dishes/:id',
    tokens: [{"old":"/dashboard/dishes/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/dishes/:id","type":0,"val":"dishes","end":""},{"old":"/dashboard/dishes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin_dishes.destroy']['types'],
  },
  'order_status.update': {
    methods: ["PATCH"],
    pattern: '/orders/:id/status',
    tokens: [{"old":"/orders/:id/status","type":0,"val":"orders","end":""},{"old":"/orders/:id/status","type":1,"val":"id","end":""},{"old":"/orders/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['order_status.update']['types'],
  },
  'orders_management.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/orders',
    tokens: [{"old":"/dashboard/orders","type":0,"val":"dashboard","end":""},{"old":"/dashboard/orders","type":0,"val":"orders","end":""}],
    types: placeholder as Registry['orders_management.index']['types'],
  },
  'order_material_loan.update': {
    methods: ["PATCH"],
    pattern: '/orders/:id/material-loan',
    tokens: [{"old":"/orders/:id/material-loan","type":0,"val":"orders","end":""},{"old":"/orders/:id/material-loan","type":1,"val":"id","end":""},{"old":"/orders/:id/material-loan","type":0,"val":"material-loan","end":""}],
    types: placeholder as Registry['order_material_loan.update']['types'],
  },
  'cancel_order': {
    methods: ["PATCH"],
    pattern: '/orders/:id/cancel',
    tokens: [{"old":"/orders/:id/cancel","type":0,"val":"orders","end":""},{"old":"/orders/:id/cancel","type":1,"val":"id","end":""},{"old":"/orders/:id/cancel","type":0,"val":"cancel","end":""}],
    types: placeholder as Registry['cancel_order']['types'],
  },
  'validate_notice.render': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/notices',
    tokens: [{"old":"/dashboard/notices","type":0,"val":"dashboard","end":""},{"old":"/dashboard/notices","type":0,"val":"notices","end":""}],
    types: placeholder as Registry['validate_notice.render']['types'],
  },
  'validate_notice': {
    methods: ["PATCH"],
    pattern: '/dashboard/notices/:id',
    tokens: [{"old":"/dashboard/notices/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/notices/:id","type":0,"val":"notices","end":""},{"old":"/dashboard/notices/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['validate_notice']['types'],
  },
  'opening_hours.render': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/opening-hours',
    tokens: [{"old":"/dashboard/opening-hours","type":0,"val":"dashboard","end":""},{"old":"/dashboard/opening-hours","type":0,"val":"opening-hours","end":""}],
    types: placeholder as Registry['opening_hours.render']['types'],
  },
  'opening_hours.update': {
    methods: ["PUT"],
    pattern: '/dashboard/opening-hours',
    tokens: [{"old":"/dashboard/opening-hours","type":0,"val":"dashboard","end":""},{"old":"/dashboard/opening-hours","type":0,"val":"opening-hours","end":""}],
    types: placeholder as Registry['opening_hours.update']['types'],
  },
  'admin_employees.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/employees',
    tokens: [{"old":"/dashboard/employees","type":0,"val":"dashboard","end":""},{"old":"/dashboard/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['admin_employees.index']['types'],
  },
  'admin_employees.store': {
    methods: ["POST"],
    pattern: '/dashboard/employees',
    tokens: [{"old":"/dashboard/employees","type":0,"val":"dashboard","end":""},{"old":"/dashboard/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['admin_employees.store']['types'],
  },
  'admin_employees.toggle_active': {
    methods: ["PATCH"],
    pattern: '/dashboard/employees/:id/active',
    tokens: [{"old":"/dashboard/employees/:id/active","type":0,"val":"dashboard","end":""},{"old":"/dashboard/employees/:id/active","type":0,"val":"employees","end":""},{"old":"/dashboard/employees/:id/active","type":1,"val":"id","end":""},{"old":"/dashboard/employees/:id/active","type":0,"val":"active","end":""}],
    types: placeholder as Registry['admin_employees.toggle_active']['types'],
  },
  'client_orders.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/my-orders',
    tokens: [{"old":"/dashboard/my-orders","type":0,"val":"dashboard","end":""},{"old":"/dashboard/my-orders","type":0,"val":"my-orders","end":""}],
    types: placeholder as Registry['client_orders.index']['types'],
  },
  'client_orders.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/my-orders/:id',
    tokens: [{"old":"/dashboard/my-orders/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/my-orders/:id","type":0,"val":"my-orders","end":""},{"old":"/dashboard/my-orders/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client_orders.show']['types'],
  },
  'client_orders.update': {
    methods: ["PATCH"],
    pattern: '/dashboard/my-orders/:id',
    tokens: [{"old":"/dashboard/my-orders/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/my-orders/:id","type":0,"val":"my-orders","end":""},{"old":"/dashboard/my-orders/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client_orders.update']['types'],
  },
  'client_orders.cancel': {
    methods: ["DELETE"],
    pattern: '/dashboard/my-orders/:id',
    tokens: [{"old":"/dashboard/my-orders/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/my-orders/:id","type":0,"val":"my-orders","end":""},{"old":"/dashboard/my-orders/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['client_orders.cancel']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/profile',
    tokens: [{"old":"/dashboard/profile","type":0,"val":"dashboard","end":""},{"old":"/dashboard/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.update': {
    methods: ["PATCH"],
    pattern: '/dashboard/profile',
    tokens: [{"old":"/dashboard/profile","type":0,"val":"dashboard","end":""},{"old":"/dashboard/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'register_notice': {
    methods: ["POST"],
    pattern: '/reviews',
    tokens: [{"old":"/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['register_notice']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
