import { ProfileForm } from '~/components/dashboard/profile-form'
import type { InertiaProps } from '~/types'

export default function Profile({ user }: InertiaProps) {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-semibold">Mon profil</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Modifiez vos informations personnelles.
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  )
}
