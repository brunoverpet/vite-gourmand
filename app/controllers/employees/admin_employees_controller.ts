import { CreateEmployeeAction } from '#services/employees/create_employee_action'
import { UserService } from '#services/shared/user_service'
import UserTransformer from '#transformers/auth/user_transformer'
import { adminCreateEmployeValidator } from '#validators/auth/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AdminEmployeesController {
  constructor(
    private userService: UserService,
    private createEmployeAction: CreateEmployeeAction
  ) {}

  async index({ inertia }: HttpContext) {
    const employes = await this.userService.getEmployees()

    return inertia.render('dashboard/employees/index', {
      employes: UserTransformer.transform(employes).useVariant('forEmploye'),
    })
  }

  async store({ request, inertia }: HttpContext) {
    const payload = await request.validateUsing(adminCreateEmployeValidator)
    const { employe, password } = await this.createEmployeAction.execute(payload)
    const employes = await this.userService.getEmployees()

    return inertia.render('dashboard/employees/index', {
      employes: UserTransformer.transform(employes).useVariant('forEmploye'),
      generatedPassword: password,
    })
  }
}
