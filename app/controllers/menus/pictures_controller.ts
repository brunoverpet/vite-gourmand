import { UploadPictureActionService } from '#services/menus/upload_picture_action_service'
import { uploadPictureValidator } from '#validators/menus/picture'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PicturesController {
  constructor(private uploadPictureAction: UploadPictureActionService) {}

  async handle({ params, request, response, session }: HttpContext) {
    const { menuId } = params
    const picture = await request.validateUsing(uploadPictureValidator)
    await this.uploadPictureAction.execute(picture, menuId)

    session.flash('success', 'Photo ajoutée avec succès')
    return response.redirect().back()
  }
}
