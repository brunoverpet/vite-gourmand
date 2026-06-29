import Menu from '#models/menu'
import Picture from '#models/picture'
import { FileService } from '#services/shared/file_service'
import type { UploadPicturePayload } from '#validators/menus/picture'
import { inject } from '@adonisjs/core'

@inject()
export class UploadPictureAction {
  constructor(private fileService: FileService) {}

  async execute(payload: UploadPicturePayload, menuId: string) {
    const menu = await Menu.findOrFail(menuId)

    const key = await this.fileService.upload(payload.picture, 'pictures')
    return await menu.related('pictures').create({ imagePath: key })
  }

  async delete(pictureId: string, menuId: string) {
    const picture = await Picture.query()
      .where('id', pictureId)
      .where('menu_id', menuId)
      .firstOrFail()

    if (!picture.imagePath.startsWith('http')) {
      await this.fileService.deleteFile(picture.imagePath)
    }
    await picture.delete()
  }
}
