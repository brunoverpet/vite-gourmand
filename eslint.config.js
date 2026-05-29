import { configApp } from '@adonisjs/eslint-config'
import { react } from '@adonisjs/eslint-config/react'

export default configApp(...react, {
  files: ['inertia/**/*'],
  rules: {
    '@unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-shadow': 'off',
  },
})
