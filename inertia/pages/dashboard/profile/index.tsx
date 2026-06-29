import { ProfileForm } from '~/components/dashboard/profile-form'
import { ProfilePasswordForm } from '~/components/dashboard/profile-password-form'
import type { InertiaProps } from '~/types'

export default function Profile({ user }: InertiaProps) {
  return (
    <div className="space-y-10 max-w-xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Mon profil</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Modifiez vos informations personnelles.
          </p>
        </div>

        <ProfileForm user={user} />
      </div>

      <div className="border-t pt-8 space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Mot de passe</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Choisissez un nouveau mot de passe pour sécuriser votre compte.
          </p>
        </div>

        <ProfilePasswordForm />
      </div>
    </div>
  )
}
