import type { HttpContext } from '@adonisjs/core/http'

export default class CgvController {
  render({ inertia }: HttpContext) {
    return inertia.render('public/cgv', {})
  }
}
