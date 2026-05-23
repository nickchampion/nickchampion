<template>
  <UPage>
    <UPageHero
      title="Sign in to NodeVault"
      align="center"
      :ui="{ container: 'py-12 sm:py-16' }" />

    <UContainer class="pb-16 sm:pb-24">
      <div class="max-w-lg mx-auto">
        <UCard v-if="verifying">
          <div class="flex flex-col items-center gap-4 py-10 text-center">
            <UIcon
              name="i-lucide-loader-circle"
              class="size-8 text-primary animate-spin" />

            <p class="text-sm text-muted">
              Verifying your login…
            </p>
          </div>
        </UCard>

        <UCard v-else-if="sent">
          <div class="flex flex-col items-center gap-5 py-10 text-center">
            <div class="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <UIcon
                name="i-lucide-mail"
                class="size-6 text-primary" />
            </div>

            <div>
              <p class="font-semibold">
                Check your email
              </p>

              <p class="text-sm text-muted mt-1">
                We've sent a login link to <strong>{{ state.email }}</strong>.
              </p>
            </div>

            <UButton
              variant="ghost"
              color="neutral"
              size="sm"
              @click="sent = false">
              Use a different email
            </UButton>
          </div>
        </UCard>

        <UCard v-else>
          <div class="space-y-6 py-2">
            <div>
              <p class="font-semibold text-lg">
                Welcome back
              </p>

              <p class="text-sm text-muted mt-1">
                Enter your email and we'll send you a sign-in link.
              </p>
            </div>

            <UForm
              :validate="zodValidate(schema)"
              :state="state"
              class="space-y-4"
              @submit="submit">
              <UFormField
                label="Email"
                name="email"
                required>
                <UInput
                  v-model="state.email"
                  type="email"
                  placeholder="you@example.com"
                  class="w-full" />
              </UFormField>

              <UButton
                type="submit"
                :loading="pending"
                class="w-full justify-center">
                Continue
              </UButton>
            </UForm>

            <p class="text-sm text-center text-muted">
              Don't have an account?
              <ULink
                to="/auth/register"
                class="text-primary font-medium hover:underline">
                Create one
              </ULink>
            </p>
          </div>
        </UCard>

        <UAlert
          v-if="message && !sent && !verifying"
          color="info"
          variant="subtle"
          icon="i-lucide-info"
          class="mt-3"
          :title="message" />

        <UAlert
          v-if="error"
          color="error"
          variant="subtle"
          icon="i-lucide-circle-x"
          class="mt-3"
          :title="error" />
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useAuthStore } from '../../stores/auth-store.js'
import { zodValidate } from '../../utils/validation/index.js'

useSeoMeta({ title: 'Sign In | NodeVault' })

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const config = useConfig()
const posthog = usePostHog()

const state = reactive({ email: config.environment === 'dev' ? 'mail@nickchampion.me' : '' })
const pending = ref(false)
const sent = ref(false)
const verifying = ref(false)
const error = ref<string | null>(null)
const message = computed(() => route.query.message as string | undefined)

const schema = z.object({
  email: z.email('Enter a valid email address'),
})

const submit = async () => {
  pending.value = true
  error.value = null

  const response = await useApiClient().auth.login(state.email)

  if (response.success) {
    sent.value = true
    posthog?.capture('login_requested', { email: state.email })
  } else {
    error.value = 'Something went wrong. Please try again.'
  }

  pending.value = false
}

const verify = async (code: string) => {
  verifying.value = true
  error.value = null

  const response = await useApiClient().auth.verify(code)

  if (response.success) {
    authStore.setAuthTokens(response)
    posthog?.identify(authStore.user?.id, { email: authStore.user?.email })
    posthog?.capture('login_verified')
    await router.replace('/account')
  } else {
    error.value = 'Invalid or expired link. Please request a new one.'
    posthog?.capture('login_failed')
    verifying.value = false
  }
}

onMounted(() => {
  const code = route.query.code as string | undefined

  if (code) verify(code)
})
</script>
