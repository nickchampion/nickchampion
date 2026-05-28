import posthog from 'posthog-js'

/**
 * PostHog client plugin.
 * Only initialises PostHog when a public key is present — silences the
 * "initialized without a token" warning in local development.
 */
export default defineNuxtPlugin({
  name: 'posthog-client',
  setup(nuxtApp) {
    const config = useRuntimeConfig()
    const publicKey = config.public.posthogPublicKey as string | undefined
    const posthogClientConfig = config.public.posthogClientConfig as Record<string, unknown>

    if (!publicKey) return

    posthog.init(publicKey, {
      api_host: 'https://eu.i.posthog.com',
      ...posthogClientConfig,
    })

    nuxtApp.hook('vue:error', (error, _target, info) => {
      if (posthogClientConfig.capture_exceptions) {
        posthog.captureException(error as Error, { info })
      }
    })

    return {
      provide: {
        posthog: () => posthog,
      },
    }
  },
})
