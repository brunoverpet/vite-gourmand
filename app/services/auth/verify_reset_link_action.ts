import { UserService } from '#services/auth/user_service'
import { inject } from '@adonisjs/core'

@inject()
export class VerifyResetLinkAction {
  constructor(private userService: UserService) {}
  /**
   * Vérifie si le lien de reset est valide en comparant le hash de l'URL
   * avec le mot de passe actuel en base de données.
   */
  async execute(id: string, tokenHash: string): Promise<boolean> {
    const user = await this.userService.findById(id)

    // Si l'utilisateur n'existe pas, le lien est invalide
    if (!user) {
      return false
    }

    // Si le mot de passe en BDD a changé, il ne correspondra plus
    // au hash encodé dans l'URL du mail -> Lien déjà utilisé !
    return user.password === tokenHash
  }
}
