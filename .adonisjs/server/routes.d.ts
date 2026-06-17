import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'contact': { paramsTuple?: []; params?: {} }
    'register.render': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'session': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'pictures': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'register.render': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'home-public': { paramsTuple?: []; params?: {} }
    'contact.render': { paramsTuple?: []; params?: {} }
    'register.render': { paramsTuple?: []; params?: {} }
    'session.render': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'menus.render': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'contact': { paramsTuple?: []; params?: {} }
    'register': { paramsTuple?: []; params?: {} }
    'session': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pictures': { paramsTuple: [ParamValue]; params: {'menuId': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}