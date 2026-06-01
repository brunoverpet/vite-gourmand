import { LoginForm } from '~/components/login-form'
import AuthLayout from '~/layouts/auth-layout'

export default function Login() {
  return <LoginForm />
}

Login.layout = (page: React.ReactNode) => (
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
