import { ResetPasswordForm } from '~/components/auth/reset-password-form'
import AuthLayout from '~/layouts/auth-layout'
import type { InertiaProps } from '~/types'

type PageProps = InertiaProps<{ id: string }>

export default function ResetPassword({ id }: PageProps) {
  return <ResetPasswordForm id={id} />
}

ResetPassword.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Bienvenue chez Vite & Gourmand."
    description={<>{/* Se connecter <a href="/login">Se connecter</a> */}</>}
  >
    {page}
  </AuthLayout>
)
