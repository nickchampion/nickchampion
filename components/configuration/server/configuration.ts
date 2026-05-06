import type { EnvironmentSettings } from '@nodevault/platform.components.configuration.core'

export type ServerConfiguration = {
  production: boolean
  dev: boolean
  api: string
  app: string
  environment: EnvironmentSettings
  version: string
  ravendb: RavenDB
  cloudflare: Cloudflare
}

export type BasicAuth = {
  username: string
  password: string
  secret: string
}

export type RavenDB = {
  nodes: string[]
  endpoints: string[]
  certificate: string
  database: string
  databases?: Record<string, string>
  testDatabaseName?: string
}

export type Cloudflare = {
  accountId: string
  apiToken: string
}

export const server = {
  dev: {
    default: true,
    prod: false,
  },
  production: {
    default: false,
    prod: true,
  },
  version: {
    default: 'dev',
    prod: 'env$NODEVAULT_VERSION',
  },
  api: {
    default: 'http://api.nodevault.local:9002',
    prod: 'https://api.nodevault.cloud',
  },
  app: {
    default: 'http://www.nodevault.local:9001',
    prod: 'https://www.nodevault.cloud',
  },
  ravendb: {
    certificate: {
      encrypted: true,
      default: '',
      prod: '',
    },
    endpoints: {
      default: ['https://a.dev.nodevault.ravendb.cloud/'],
    },
    nodes: {
      default: ['A'],
      prod: ['A'],
    },
    database: {
      default: 'NodeVault_Dev',
      prod: 'NodeVault',
    },
  },
  cloudflare: {
    accountId: '6588d1ee1643e6a11baba75c0cbea29e',
    apiToken: {
      default: 'zshhB3CwntGNBdMigHIC3eleLw33laknTfZ0+3aS8jEwciTVZDNaaJCd90mWCbkbs6LpcPXVNPDokgSoz5ou',
      prod: 'C5hRCGX0iUDF6fbZLUCcCZlEgPmyjM+VSJXwe8PsdYEHF2/leyn+6RgfE7ht1SMtfY2uW83/tXj2rdfNmMSK',
      encrypted: true,
    },
  },
}
