import { OpeningHoursService } from '#services/opening_hours/opening_hours_service'
import OpeningHoursTransformer from '#transformers/opening_hours/opening_hours_transformer'
import { updateOpeningHoursValidator } from '#validators/opening_hours/opening_hours'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OpeningHoursController {
  constructor(private openingHoursService: OpeningHoursService) {}

  async render({ inertia }: HttpContext) {
    const hours = await this.openingHoursService.getOpeningHours()
    return inertia.render('dashboard/opening_hours/index', {
      openingHours: OpeningHoursTransformer.transform(hours),
    })
  }

  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateOpeningHoursValidator)
    await this.openingHoursService.updateHours(payload.hours)

    session.flash('success', 'Les horaires ont bien été mises à jour.')

    return response.redirect().toRoute('opening_hours.render')
  }
}
