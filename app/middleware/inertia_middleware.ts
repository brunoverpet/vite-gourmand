import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UserTransformer from '#transformers/auth/user_transformer'
import { OpeningHoursService } from '#services/opening_hours/opening_hours_service'
import OpeningHoursTransformer from '#transformers/opening_hours/opening_hours_transformer'
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  async share(ctx: HttpContext) {
    /**
     * The share method is called everytime an Inertia page is rendered. In
     * certain cases, a page may get rendered before the session middleware
     * or the auth middleware are executed. For example: During a 404 request.
     *
     * In that case, we must always assume that HttpContext is not fully hydrated
     * with all the properties
     */
    const { session, auth } = ctx as Partial<HttpContext>

    /**
     * Fetching the first error from the flash messages
     */
    const error = session?.flashMessages.get('error') as string
    const success = session?.flashMessages.get('success') as string
    const info = session?.flashMessages.get('info') as string

    let openingHours: ReturnType<typeof OpeningHoursTransformer.transform> = []
    try {
      const hours = await new OpeningHoursService().getOpeningHours()
      openingHours = OpeningHoursTransformer.transform(hours)
    } catch {}

    /**
     * Data shared with all Inertia pages. Make sure you are using
     * transformers for rich data-types like Models.
     */
    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      flash: ctx.inertia.always({
        error,
        success,
        info,
      }),
      user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
      openingHours: ctx.inertia.always(openingHours),
    }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx)

    const output = await next()
    this.dispose(ctx)

    return output
  }
}

declare module '@adonisjs/inertia/types' {
  type MiddlewareSharedProps = InferSharedProps<InertiaMiddleware>
  export interface SharedProps extends MiddlewareSharedProps {}
}
