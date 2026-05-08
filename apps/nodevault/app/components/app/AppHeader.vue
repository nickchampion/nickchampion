<template>
  <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-default">
    <UContainer class="flex items-center justify-between gap-4 h-16">
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 shrink-0">
        <AppLogo class="size-8" />

        <span class="font-semibold text-sm tracking-tight">NodeVault</span>
      </NuxtLink>

      <UNavigationMenu
        :items="links"
        variant="link"
        color="neutral"
        class="hidden sm:flex" />

      <div class="flex items-center gap-2 shrink-0">
        <UDropdownMenu
          v-if="authStore.authenticated()"
          :items="userMenuItems"
          class="hidden sm:flex">
          <UButton
            variant="ghost"
            color="neutral"
            class="flex items-center gap-2">
            <UIcon
              name="i-lucide-circle-user"
              class="size-6 shrink-0" />

            <span class="text-sm font-medium">{{ displayName }}</span>

            <UIcon
              name="i-lucide-chevron-down"
              class="size-3 text-muted" />
          </UButton>
        </UDropdownMenu>

        <UButton
          v-else
          to="/auth/login"
          variant="ghost"
          color="neutral"
          icon="i-lucide-log-in"
          class="hidden sm:flex">
          Sign in
        </UButton>

        <UButton
          class="flex sm:hidden"
          variant="ghost"
          color="neutral"
          :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          aria-label="Toggle menu"
          @click="mobileOpen = true" />
      </div>
    </UContainer>
  </header>

  <USlideover
    v-model:open="mobileOpen"
    side="right"
    :ui="{ content: 'w-72' }">
    <template #content>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-4 h-16 border-b border-default shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center gap-2.5"
            @click="mobileOpen = false">
            <AppLogo class="size-8" />

            <span class="font-semibold text-sm tracking-tight">NodeVault</span>
          </NuxtLink>

          <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-x"
            aria-label="Close menu"
            @click="mobileOpen = false" />
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <UNavigationMenu
            :items="links"
            orientation="vertical"
            variant="link"
            color="neutral"
            class="w-full" />
        </div>

        <div class="p-4 border-t border-default shrink-0">
          <template v-if="authStore.authenticated()">
            <div class="flex items-center gap-3 px-1 py-2 mb-2">
              <UIcon
                name="i-lucide-circle-user"
                class="size-5 text-muted shrink-0" />

              <span class="text-sm font-medium truncate">{{ displayName }}</span>
            </div>

            <div class="flex flex-col gap-1">
              <UButton
                to="/account"
                variant="ghost"
                color="neutral"
                icon="i-lucide-user"
                class="w-full justify-start"
                @click="mobileOpen = false">
                My account
              </UButton>

              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-log-out"
                class="w-full justify-start"
                @click="() => { authStore.logout(); router.push('/'); mobileOpen = false }">
                Sign out
              </UButton>
            </div>
          </template>

          <template v-else>
            <UButton
              to="/auth/login"
              variant="outline"
              color="neutral"
              icon="i-lucide-log-in"
              class="w-full justify-center"
              @click="mobileOpen = false">
              Sign in
            </UButton>
          </template>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const mobileOpen = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => {
  const u = authStore.user

  if (!u) return null

  return u.firstName ? `${u.firstName} ${u.lastName}`.trim() : u.email
})

const userMenuItems = computed(() => [[
  { label: 'My account', icon: 'i-lucide-user', to: '/account' },
  {
    label: 'Sign out',
    icon: 'i-lucide-log-out',
    onSelect: () => {
      authStore.logout()
      router.push('/')
    },
  },
]])

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>
