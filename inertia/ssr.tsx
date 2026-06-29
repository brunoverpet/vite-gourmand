import { client } from '~/client'
import { type ReactElement } from 'react'
import Layout from '~/layouts/default'
import { type Data } from '@generated/data'
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import PublicLayout from '~/layouts/public-layout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      return resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob('./pages/**/*.tsx', { eager: true }),
        (resolvedPage: ReactElement<Data.SharedProps>) => {
          if (name.startsWith('auth/')) {
            return resolvedPage
          }

          if (name.startsWith('public/')) {
            return <PublicLayout>{page}</PublicLayout>
          }

          return <Layout children={resolvedPage} />
        }
      )
    },
    setup: ({ App, props }) => {
      return (
        <TuyauProvider client={client}>
          <App {...props} />
        </TuyauProvider>
      )
    },
  })
}
