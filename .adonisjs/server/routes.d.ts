import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'register.create': { paramsTuple?: []; params?: {} }
    'register.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'register.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'register.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'request_password_reset.show': { paramsTuple?: []; params?: {} }
    'reset_password.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'register.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'request_password_reset': { paramsTuple?: []; params?: {} }
    'reset_password': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}