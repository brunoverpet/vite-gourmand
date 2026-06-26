import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { type Data } from '@generated/data'
import { createInertiaApp } from '@inertiajs/react'
import { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from '~/layouts/default'
import PublicLayout from '~/layouts/public-layout'
import { client } from './client'
import './css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'Vite & Gourmand'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
      (page: ReactElement<Data.SharedProps>) => {
        if (name.startsWith('auth/')) {
          return page
        }

        if (name.startsWith('public/') || name.startsWith('errors/')) {
          return <PublicLayout>{page}</PublicLayout>
        }

        return <Layout children={page} />
      }
    )
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <App {...props} />
      </TuyauProvider>
    )
  },
  progress: {
    color: '#4B5563',
  },
})
