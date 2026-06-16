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

router.on('/').renderInertia('public/home-public', {}).as('home-public')
router.get('/contact', [controllers.contact.Contact, 'render'])
router.post('/contact', [controllers.contact.Contact, 'handle'])

router
  .group(() => {
    router.get('signup', [controllers.auth.Register, 'create'])
    router.post('signup', [controllers.auth.Register, 'store'])

    router.get('login', [controllers.auth.Session, 'create'])
    router.post('login', [controllers.auth.Session, 'store'])

    router.get('forgot-password', [controllers.auth.RequestPasswordReset, 'show'])
    router.post('forgot-password', [controllers.auth.RequestPasswordReset, 'handle'])

    router.get('reset-password/:id', [controllers.auth.ResetPassword, 'show'])
    router.post('reset-password/:id', [controllers.auth.ResetPassword, 'handle'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').renderInertia('home', {}).as('home')
    router.post('logout', [controllers.auth.Session, 'destroy'])
  })
  .use(middleware.auth())
