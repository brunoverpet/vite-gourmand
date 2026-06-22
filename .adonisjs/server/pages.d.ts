import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/forgot-password': ExtractProps<(typeof import('../../inertia/pages/auth/forgot-password.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/reset-password': ExtractProps<(typeof import('../../inertia/pages/auth/reset-password.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'dashboard/my-orders/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/my-orders/index.tsx'))['default']>
    'dashboard/my-orders/show': ExtractProps<(typeof import('../../inertia/pages/dashboard/my-orders/show.tsx'))['default']>
    'dashboard/orders/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/orders/index.tsx'))['default']>
    'errors/not-found': ExtractProps<(typeof import('../../inertia/pages/errors/not-found.tsx'))['default']>
    'errors/server-error': ExtractProps<(typeof import('../../inertia/pages/errors/server-error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'public/contact': ExtractProps<(typeof import('../../inertia/pages/public/contact.tsx'))['default']>
    'public/home-public': ExtractProps<(typeof import('../../inertia/pages/public/home-public.tsx'))['default']>
    'public/menus/index': ExtractProps<(typeof import('../../inertia/pages/public/menus/index.tsx'))['default']>
    'public/menus/show': ExtractProps<(typeof import('../../inertia/pages/public/menus/show.tsx'))['default']>
    'public/orders/index': ExtractProps<(typeof import('../../inertia/pages/public/orders/index.tsx'))['default']>
    'dashboard/profile/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/profile/index.tsx'))['default']>
  }
}
