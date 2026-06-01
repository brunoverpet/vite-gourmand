import { ForgotPasswordForm } from '~/components/forgot-password-form'
import AuthLayout from '~/layouts/auth-layout'

export default function ForgotPassword() {
  return <ForgotPasswordForm />
}

ForgotPassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Bienvenue chez Vite & Gourmand."
    description={
      <>
        Pas encore de compte ? <a href="/signup">S&apos;inscrire</a>
      </>
    }
  >
    {page}
  </AuthLayout>
)
