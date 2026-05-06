<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable>
      <template #header>
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 px-1 min-w-0">
          <AppLogo class="size-7 shrink-0" />

          <span class="font-semibold text-base truncate">NodeVault</span>
        </NuxtLink>
      </template>

      <UNavigationMenu
        orientation="vertical"
        :items="navLinks"
        class="px-2 data-[collapsed=true]:px-0" />

      <template #footer>
        <div class="flex items-center gap-3 px-1 min-w-0">
          <UAvatar
            icon="i-lucide-user"
            size="sm"
            class="shrink-0" />

          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">
              Admin
            </p>

            <p class="text-xs text-muted truncate">
              admin@nodevault.io
            </p>
          </div>

          <UButton
            icon="i-lucide-log-out"
            variant="ghost"
            color="neutral"
            size="sm"
            class="shrink-0" />
        </div>
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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
