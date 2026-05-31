import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function Signup() {
  return (
    <div className="bg-accent rounded-2xl p-5">
      <div>
        <h1> Signup </h1>
        <p>Enter your details below to create your account</p>
      </div>

      <div className="w-52">
        <Form route="register.store">
          {({ errors }) => (
            <>
              <div>
                <label htmlFor="lastname">Lastname</label>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  data-invalid={errors.lastname ? 'true' : undefined}
                />
                {errors.lastname && <div className="text-destructive">{errors.lastname}</div>}
              </div>

              <div>
                <label htmlFor="firstname">firstname</label>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  data-invalid={errors.firstname ? 'true' : undefined}
                />
                {errors.firstname && <div className="text-destructive">{errors.firstname}</div>}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  data-invalid={errors.email ? 'true' : undefined}
                />
                {errors.email && <div className="text-destructive">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  data-invalid={errors.password ? 'true' : undefined}
                />
                {errors.password && <div className="text-destructive">{errors.password}</div>}
              </div>

              <div>
                <label htmlFor="passwordConfirmation">Confirm password</label>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                  data-invalid={errors.passwordConfirmation ? 'true' : undefined}
                />
                {errors.passwordConfirmation && (
                  <div className="text-destructive">{errors.passwordConfirmation}</div>
                )}
              </div>

              <div>
                <Button type="submit" className="button">
                  Sign up
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
