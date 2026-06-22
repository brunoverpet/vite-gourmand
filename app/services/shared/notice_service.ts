import Notice from '#models/notice'

export class NoticeService {
  async getNotices() {
    return Notice.query().preload('order', (q) => q.preload('user')).orderBy('created_at', 'desc')
  }

  async findNoticeById(id: string) {
    return Notice.findOrFail(id)
  }
}
