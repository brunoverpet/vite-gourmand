/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'home-public': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/home_public_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/home_public_controller').default['render']>>>
    }
  }
  'contact.render': {
    methods: ["GET","HEAD"]
    pattern: '/contact'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/contact/contact_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/contact/contact_controller').default['render']>>>
    }
  }
  'contact': {
    methods: ["POST"]
    pattern: '/contact'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/contact/contact').createContactValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/contact/contact').createContactValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/contact/contact_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/contact/contact_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'menus.render': {
    methods: ["GET","HEAD"]
    pattern: '/menus'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/menus_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/menus_controller').default['render']>>>
    }
  }
  'menus.show': {
    methods: ["GET","HEAD"]
    pattern: '/menus/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/menus_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/menus_controller').default['show']>>>
    }
  }
  'register.render': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['render']>>>
    }
  }
  'register': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/user').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/user').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.render': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['render']>>>
    }
  }
  'session': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['handle']>>>
    }
  }
  'request_password_reset.show': {
    methods: ["GET","HEAD"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/request_password_reset_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/request_password_reset_controller').default['show']>>>
    }
  }
  'request_password_reset': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/forgot_password').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/forgot_password').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/request_password_reset_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/request_password_reset_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reset_password.show': {
    methods: ["GET","HEAD"]
    pattern: '/reset-password/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/reset_password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/reset_password_controller').default['show']>>>
    }
  }
  'reset_password': {
    methods: ["POST"]
    pattern: '/reset-password/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/forgot_password').resetPasswordValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/forgot_password').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/reset_password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/reset_password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'order.render': {
    methods: ["GET","HEAD"]
    pattern: '/orders/:menuId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { menuId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/order_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/order_controller').default['render']>>>
    }
  }
  'order.store': {
    methods: ["POST"]
    pattern: '/orders'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/orders/order').createOrderValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/orders/order').createOrderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/order_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/order_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_menus.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/menus'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['index']>>>
    }
  }
  'admin_menus.create': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/menus/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['create']>>>
    }
  }
  'admin_menus.store': {
    methods: ["POST"]
    pattern: '/dashboard/menus'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/menus/menu').createMenuValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/menus/menu').createMenuValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_menus.edit': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/menus/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['edit']>>>
    }
  }
  'admin_menus.update': {
    methods: ["PATCH"]
    pattern: '/dashboard/menus/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/menus/menu').updateMenuValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/menus/menu').updateMenuValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_menus.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/menus/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/admin_menus_controller').default['destroy']>>>
    }
  }
  'pictures': {
    methods: ["POST"]
    pattern: '/dashboard/menus/:menuId/pictures'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/menus/picture').uploadPictureValidator)>>
      paramsTuple: [ParamValue]
      params: { menuId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/menus/picture').uploadPictureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/pictures_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/pictures_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pictures.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/menus/:menuId/pictures/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { menuId: ParamValue; id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/pictures_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/pictures_controller').default['destroy']>>>
    }
  }
  'menu_dishes.sync': {
    methods: ["PUT"]
    pattern: '/dashboard/menus/:id/dishes'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/menus/menu_dishes_controller').default['sync']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/menus/menu_dishes_controller').default['sync']>>>
    }
  }
  'admin_dishes.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/dishes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['index']>>>
    }
  }
  'admin_dishes.create': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/dishes/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['create']>>>
    }
  }
  'admin_dishes.store': {
    methods: ["POST"]
    pattern: '/dashboard/dishes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dishes/dish').createDishValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/dishes/dish').createDishValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_dishes.edit': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/dishes/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['edit']>>>
    }
  }
  'admin_dishes.update': {
    methods: ["PATCH"]
    pattern: '/dashboard/dishes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/dishes/dish').updateDishValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/dishes/dish').updateDishValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_dishes.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/dishes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dishes/admin_dishes_controller').default['destroy']>>>
    }
  }
  'order_status.update': {
    methods: ["PATCH"]
    pattern: '/orders/:id/status'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/orders/order_status').updateOrderStatusValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/orders/order_status').updateOrderStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/order_status_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/order_status_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'orders_management.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/orders'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/orders_management_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/orders_management_controller').default['index']>>>
    }
  }
  'order_material_loan.update': {
    methods: ["PATCH"]
    pattern: '/orders/:id/material-loan'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/orders/order_material_loan').updateMaterialLoanValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/orders/order_material_loan').updateMaterialLoanValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/order_material_loan_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/order_material_loan_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cancel_order': {
    methods: ["PATCH"]
    pattern: '/orders/:id/cancel'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/orders/cancel_order').cancelOrderValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/orders/cancel_order').cancelOrderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/cancel_order_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/cancel_order_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'validate_notice.render': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/notices'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notice/validate_notice_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notice/validate_notice_controller').default['render']>>>
    }
  }
  'validate_notice': {
    methods: ["PATCH"]
    pattern: '/dashboard/notices/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/notice/notice').validateNoticeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/notice/notice').validateNoticeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notice/validate_notice_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notice/validate_notice_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'opening_hours.render': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/opening-hours'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/opening_hours/opening_hours_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/opening_hours/opening_hours_controller').default['render']>>>
    }
  }
  'opening_hours.update': {
    methods: ["PUT"]
    pattern: '/dashboard/opening-hours'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/opening_hours/opening_hours').updateOpeningHoursValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/opening_hours/opening_hours').updateOpeningHoursValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/opening_hours/opening_hours_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/opening_hours/opening_hours_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin_employees.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/employees'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['index']>>>
    }
  }
  'admin_employees.create': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/employees/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['create']>>>
    }
  }
  'admin_employees.store': {
    methods: ["POST"]
    pattern: '/dashboard/employees'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/user').adminCreateEmployeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/user').adminCreateEmployeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/employees/admin_employees_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'client_orders.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/my-orders'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['index']>>>
    }
  }
  'client_orders.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/my-orders/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['show']>>>
    }
  }
  'client_orders.update': {
    methods: ["PATCH"]
    pattern: '/dashboard/my-orders/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/orders/order').updateOrderValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/orders/order').updateOrderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'client_orders.cancel': {
    methods: ["DELETE"]
    pattern: '/dashboard/my-orders/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['cancel']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/orders/client_orders_controller').default['cancel']>>>
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile/profile_controller').default['show']>>>
    }
  }
  'profile.update': {
    methods: ["PATCH"]
    pattern: '/dashboard/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/user').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/user').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile/profile_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile/profile_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'register_notice': {
    methods: ["POST"]
    pattern: '/reviews'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/notice/notice').createNoticeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/notice/notice').createNoticeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notice/register_notice_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notice/register_notice_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['destroy']>>>
    }
  }
}
