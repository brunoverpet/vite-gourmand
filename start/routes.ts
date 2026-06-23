/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import { Roles } from '#enums/roles'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.HomePublic, 'render']).as('home-public')
router.get('contact', [controllers.contact.Contact, 'render'])
router.post('contact', [controllers.contact.Contact, 'handle'])

router.get('menus', [controllers.menus.Menus, 'render'])
router.get('menus/:id', [controllers.menus.Menus, 'show'])

router
  .group(() => {
    router.get('signup', [controllers.auth.Register, 'render'])
    router.post('signup', [controllers.auth.Register, 'handle'])

    router.get('login', [controllers.auth.Session, 'render'])
    router.post('login', [controllers.auth.Session, 'handle'])

    router.get('forgot-password', [controllers.auth.RequestPasswordReset, 'show'])
    router.post('forgot-password', [controllers.auth.RequestPasswordReset, 'handle'])

    router.get('reset-password/:id', [controllers.auth.ResetPassword, 'show'])
    router.post('reset-password/:id', [controllers.auth.ResetPassword, 'handle'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('dashboard').renderInertia('home', {}).as('home')
    router.get('orders/:menuId', [controllers.orders.Order, 'render'])
    router.post('orders', [controllers.orders.Order, 'store'])

    router
      .get('dashboard/menus', [controllers.menus.AdminMenus, 'index'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .get('dashboard/menus/create', [controllers.menus.AdminMenus, 'create'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .post('dashboard/menus', [controllers.menus.AdminMenus, 'store'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .get('dashboard/menus/:id/edit', [controllers.menus.AdminMenus, 'edit'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .patch('dashboard/menus/:id', [controllers.menus.AdminMenus, 'update'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .delete('dashboard/menus/:id', [controllers.menus.AdminMenus, 'destroy'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router
      .post('dashboard/menus/:menuId/pictures', [controllers.menus.Pictures, 'handle'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .delete('dashboard/menus/:menuId/pictures/:id', [controllers.menus.Pictures, 'destroy'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router
      .patch('orders/:id/status', [controllers.orders.OrderStatus, 'update'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router
      .get('dashboard/orders', [controllers.orders.OrdersManagement, 'index'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router
      .patch('orders/:id/material-loan', [controllers.orders.OrderMaterialLoan, 'update'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router
      .patch('orders/:id/cancel', [controllers.orders.CancelOrder, 'handle'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router.get('dashboard/my-orders', [controllers.orders.ClientOrders, 'index'])
    router.get('dashboard/my-orders/:id', [controllers.orders.ClientOrders, 'show'])
    router.patch('dashboard/my-orders/:id', [controllers.orders.ClientOrders, 'update'])
    router.delete('dashboard/my-orders/:id', [controllers.orders.ClientOrders, 'cancel'])

    router.get('dashboard/profile', [controllers.profile.Profile, 'show'])
    router.patch('dashboard/profile', [controllers.profile.Profile, 'update'])

    router.post('reviews', [controllers.notice.RegisterNotice, 'handle'])

    router
      .get('dashboard/notices', [controllers.notice.ValidateNotice, 'render'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))
    router
      .patch('dashboard/notices/:id', [controllers.notice.ValidateNotice, 'handle'])
      .use(middleware.role([Roles.EMPLOYE, Roles.ADMIN]))

    router.post('logout', [controllers.auth.Session, 'destroy'])
  })
  .use(middleware.auth())
