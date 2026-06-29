import type { HttpContext } from '@adonisjs/core/http'

export default class LegalNoticesController {
  render({ inertia }: HttpContext) {
    return inertia.render('public/legal-notices', {})
  }
}
