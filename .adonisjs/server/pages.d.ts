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
    'dashboard/change-password': ExtractProps<(typeof import('../../inertia/pages/dashboard/change-password.tsx'))['default']>
    'dashboard/dishes/create': ExtractProps<(typeof import('../../inertia/pages/dashboard/dishes/create.tsx'))['default']>
    'dashboard/dishes/edit': ExtractProps<(typeof import('../../inertia/pages/dashboard/dishes/edit.tsx'))['default']>
    'dashboard/dishes/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/dishes/index.tsx'))['default']>
    'dashboard/employees/create': ExtractProps<(typeof import('../../inertia/pages/dashboard/employees/create.tsx'))['default']>
    'dashboard/employees/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/employees/index.tsx'))['default']>
    'dashboard/menus/create': ExtractProps<(typeof import('../../inertia/pages/dashboard/menus/create.tsx'))['default']>
    'dashboard/menus/edit': ExtractProps<(typeof import('../../inertia/pages/dashboard/menus/edit.tsx'))['default']>
    'dashboard/menus/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/menus/index.tsx'))['default']>
    'dashboard/my-orders/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/my-orders/index.tsx'))['default']>
    'dashboard/my-orders/show': ExtractProps<(typeof import('../../inertia/pages/dashboard/my-orders/show.tsx'))['default']>
    'dashboard/notices/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/notices/index.tsx'))['default']>
    'dashboard/opening_hours/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/opening_hours/index.tsx'))['default']>
    'dashboard/orders/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/orders/index.tsx'))['default']>
    'dashboard/profile/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/profile/index.tsx'))['default']>
    'dashboard/statistics/index': ExtractProps<(typeof import('../../inertia/pages/dashboard/statistics/index.tsx'))['default']>
    'errors/not-found': ExtractProps<(typeof import('../../inertia/pages/errors/not-found.tsx'))['default']>
    'errors/server-error': ExtractProps<(typeof import('../../inertia/pages/errors/server-error.tsx'))['default']>
    'public/contact': ExtractProps<(typeof import('../../inertia/pages/public/contact.tsx'))['default']>
    'public/home-public': ExtractProps<(typeof import('../../inertia/pages/public/home-public.tsx'))['default']>
    'public/menus/index': ExtractProps<(typeof import('../../inertia/pages/public/menus/index.tsx'))['default']>
    'public/menus/show': ExtractProps<(typeof import('../../inertia/pages/public/menus/show.tsx'))['default']>
    'public/orders/index': ExtractProps<(typeof import('../../inertia/pages/public/orders/index.tsx'))['default']>
  }
}
