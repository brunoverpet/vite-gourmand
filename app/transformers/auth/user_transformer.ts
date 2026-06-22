import type Role from '#models/role'
import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'lastname',
        'firstname',
        'phone',
        'email',
        'createdAt',
        'updatedAt',
      ]),
      role: (this.whenLoaded(this.resource.role) as unknown as Role | undefined)?.label ?? null,
    }
  }
}
