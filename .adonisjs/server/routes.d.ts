import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'contact': { paramsTuple?: []; params?: {} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'menus.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'register.render': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'session': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'order.render': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'order.store': { paramsTuple?: []; params?: {} }
    'admin_menus.index': { paramsTuple?: []; params?: {} }
    'admin_menus.create': { paramsTuple?: []; params?: {} }
    'admin_menus.store': { paramsTuple?: []; params?: {} }
    'admin_menus.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_menus.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_menus.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pictures': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'pictures.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'menuId': ParamValue,'id': ParamValue} }
    'menu_dishes.sync': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.index': { paramsTuple?: []; params?: {} }
    'admin_dishes.create': { paramsTuple?: []; params?: {} }
    'admin_dishes.store': { paramsTuple?: []; params?: {} }
    'admin_dishes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'order_status.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders_management.index': { paramsTuple?: []; params?: {} }
    'order_material_loan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cancel_order': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'validate_notice.render': { paramsTuple?: []; params?: {} }
    'validate_notice': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_orders.index': { paramsTuple?: []; params?: {} }
    'client_orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_orders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_orders.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'register_notice': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'menus.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'register.render': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'order.render': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'admin_menus.index': { paramsTuple?: []; params?: {} }
    'admin_menus.create': { paramsTuple?: []; params?: {} }
    'admin_menus.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.index': { paramsTuple?: []; params?: {} }
    'admin_dishes.create': { paramsTuple?: []; params?: {} }
    'admin_dishes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders_management.index': { paramsTuple?: []; params?: {} }
    'validate_notice.render': { paramsTuple?: []; params?: {} }
    'client_orders.index': { paramsTuple?: []; params?: {} }
    'client_orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'menus.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'register.render': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'order.render': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'admin_menus.index': { paramsTuple?: []; params?: {} }
    'admin_menus.create': { paramsTuple?: []; params?: {} }
    'admin_menus.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.index': { paramsTuple?: []; params?: {} }
    'admin_dishes.create': { paramsTuple?: []; params?: {} }
    'admin_dishes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders_management.index': { paramsTuple?: []; params?: {} }
    'validate_notice.render': { paramsTuple?: []; params?: {} }
    'client_orders.index': { paramsTuple?: []; params?: {} }
    'client_orders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'contact': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'session': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'order.store': { paramsTuple?: []; params?: {} }
    'admin_menus.store': { paramsTuple?: []; params?: {} }
    'pictures': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'admin_dishes.store': { paramsTuple?: []; params?: {} }
    'register_notice': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'admin_menus.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin_dishes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'order_status.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'order_material_loan.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cancel_order': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'validate_notice': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_orders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'admin_menus.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pictures.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'menuId': ParamValue,'id': ParamValue} }
    'admin_dishes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'client_orders.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'menu_dishes.sync': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}