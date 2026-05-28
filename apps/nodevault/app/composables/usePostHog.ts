import type { PostHog } from 'posthog-js'

/**
 * Returns the PostHog instance, or undefined when PostHog is not initialised
 * (e.g. no public key in local development). All call sites use optional
 * chaining (posthog?.capture(...)) so returning undefined is safe.
 */
export function usePostHog(): PostHog | undefined {
  const nuxtApp = useNuxtApp() as { $posthog?: () => PostHog }

  return nuxtApp.$posthog?.()
}
