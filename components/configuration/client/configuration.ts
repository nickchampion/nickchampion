import type { Environment } from '@nodevault/platform.components.configuration.core'

export interface ClientConfiguration {
  version: string
  environment: Environment
  dist: string
  app: string
  platform: {
    api: string
    apiProxy: string
    assets: string
  }
}

export const clientConfiguration: any = {
  environment: 'env$NUXT_PUBLIC_ENVIRONMENT', // set to the value of NUXT_PUBLIC_ENVIRONMENT env var
  local: 'env$NODE_ENV$development', // will be true if the NODE_ENV env var equals development, otherwise false
  dist: 'env$NUXT_PUBLIC_DIST',
  platform: {
    assets: 'https://assets.nodevault.com',
    apiProxy: {
      default: 'http://dev.nodevault.cloud',
      prod: 'https://app.nodevault.com/api',
    },
    api: {
      default: 'http://dev.nodevault.cloud',
      prod: 'https://api.nodevault.cloud',
    },
  },
}
