<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

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

      <UColorModeButton class="shrink-0" />
    </UContainer>
  </header>
</template>
