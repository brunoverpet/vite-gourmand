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
        'address',
        'city',
        'email',
        'createdAt',
        'updatedAt',
      ]),
      role: this.resource.$preloaded['role'] ? (this.resource.role as unknown as Role).label : null,
    }
  }
}
