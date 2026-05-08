<template>
  <div class="fixed inset-0 flex flex-col overflow-hidden">
    <header class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-default bg-background z-50">
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5">
        <AppLogo class="size-7 shrink-0" />

        <span class="font-semibold text-sm tracking-tight">NodeVault</span>
      </NuxtLink>

      <UDropdownMenu :items="userMenuItems">
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          class="flex items-center gap-2">
          <UIcon
            name="i-lucide-circle-user"
            class="size-5 shrink-0" />

          <span class="text-sm font-medium hidden sm:block">{{ displayName }}</span>

          <UIcon
            name="i-lucide-chevron-down"
            class="size-3 text-muted" />
        </UButton>
      </UDropdownMenu>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside class="hidden lg:flex flex-col w-56 shrink-0 border-r border-default overflow-y-auto">
        <UNavigationMenu
          orientation="vertical"
          :items="navLinks"
          class="px-2 py-2 flex-1" />
      </aside>

      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => {
  const u = authStore.user

  if (!u) return null

  return u.firstName ? `${u.firstName} ${u.lastName}`.trim() : u.email
})

const userMenuItems = [[
  {
    label: 'Sign out',
    icon: 'i-lucide-log-out',
    onSelect: () => {
      authStore.logout()
      router.push('/')
    },
  },
]]

const navLinks: NavigationMenuItem[][] = [
  [
    { label: 'Dashboard', icon: 'i-lucide-layout-dashboard', to: '/admin' },
    { label: 'Vault', icon: 'i-lucide-key-round', to: '/admin/vault' },
    { label: 'Users', icon: 'i-lucide-users', to: '/admin/users' },
    { label: 'Settings', icon: 'i-lucide-settings', to: '/admin/settings' },
  ],
  [
    { label: 'View Site', icon: 'i-lucide-globe', to: '/' },
  ],
]
</script>
