import drive from '@adonisjs/drive/services/main'
import type { MultipartFile } from '@adonisjs/core/bodyparser'
import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'

export class FileService {
  async upload(file: MultipartFile, folder: string): Promise<string> {
    const key = this.#generateKey(file.clientName!, folder)
    await drive.use().moveFromFs(file.tmpPath!, key)
    return key
  }

  /**
   * Get the default disk instance
   */
  async readFile(key: string) {
    const disk = drive.use()
    return disk.get(key)
  }

  /**
   * Write content directly to storage
   */
  async writeReport(content: string) {
    const disk = drive.use()
    await disk.put('reports/monthly.txt', content)
  }

  /**
   * Delete a file
   */
  async deleteFile(key: string) {
    const disk = drive.use()
    await disk.delete(key)
  }

  /**
   * Check if a file exists
   */
  async fileExists(key: string) {
    const disk = drive.use()
    return disk.exists(key)
  }

  #generateKey(clientName: string, folder: string): string {
    return `${folder}/${randomUUID()}${extname(clientName)}`
  }
}
