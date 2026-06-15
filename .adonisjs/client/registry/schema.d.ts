/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home-public': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'register.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['create']>>>
    }
  }
  'register.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth/user').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth/user').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/register_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/session_controller').default['store']>>>
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
