import type { ApiHandler } from '@platform/components.context'
import * as authHandlers from './auth/index.js'
import * as commsHandlers from './comms/index.js'
import * as systemHandlers from './system/index.js'
import * as blogHandlers from './blog/index.js'

export const apiHandlers: Record<string, ApiHandler> = {
  ...authHandlers,
  ...commsHandlers,
  ...systemHandlers,
  ...blogHandlers,
}
