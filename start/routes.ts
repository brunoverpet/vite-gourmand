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

    router.post('menus/:menuId/pictures', [controllers.menus.Pictures, 'handle'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('dashboard').renderInertia('home', {}).as('home')
    router.get('orders/:menuId', [controllers.orders.Order, 'render'])
    router.post('orders', [controllers.orders.Order, 'store'])

    router.patch('orders/:id/status', [controllers.orders.OrderStatus, 'update']).as('order.status.update')

    router.post('logout', [controllers.auth.Session, 'destroy'])
  })
  .use(middleware.auth())
