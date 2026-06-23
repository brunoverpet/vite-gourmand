import { UploadPictureAction } from '#services/menus/upload_picture_action'
import { uploadPictureValidator } from '#validators/menus/picture'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PicturesController {
  constructor(private uploadPictureAction: UploadPictureAction) {}

  async handle({ params, request, response, session }: HttpContext) {
    const { menuId } = params
    const picture = await request.validateUsing(uploadPictureValidator)
    await this.uploadPictureAction.execute(picture, menuId)

    session.flash('success', 'Photo ajoutée avec succès')
    return response.redirect().back()
  }

  async destroy({ params, response }: HttpContext) {
    await this.uploadPictureAction.delete(params.id, params.menuId)
    return response.redirect().back()
  }
}
