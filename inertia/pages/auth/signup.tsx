import { SignupForm } from '~/components/auth/signup-form'
import AuthLayout from '~/layouts/auth-layout'

export default function Signup() {
  return <SignupForm />
}

Signup.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Créer votre compte"
    description={
      <>
        Vous possédez déjà un compte? <a href="/login">Se connecter</a>
      </>
    }
  >
    {page}
  </AuthLayout>
)
