import { ChangePasswordForm } from '~/components/auth/change-password-form'
import AuthLayout from '~/layouts/auth-layout'

export default function ChangePassword() {
  return <ChangePasswordForm />
}

ChangePassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Définir votre mot de passe"
    description="Votre compte a été créé par un administrateur. Veuillez choisir un mot de passe personnel avant de continuer."
  >
    {page}
  </AuthLayout>
)
