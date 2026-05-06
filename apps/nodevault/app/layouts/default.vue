<template>
  <div class="bg-background min-h-screen flex flex-col">
    <AppHeader :links="navLinks" />

    <UMain class="flex-1">
      <slot />
    </UMain>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navLinks: NavigationMenuItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'GrapheneOS',
    to: '/grapheneos',
    children: [
      { label: 'Why GrapheneOS', description: 'Privacy-first Android for everyone', to: '/grapheneos', icon: 'i-lucide-shield' },
      { label: 'Buy a Phone', description: 'Pixel + GrapheneOS, pre-configured', to: '/grapheneos/phones', icon: 'i-lucide-smartphone' },
    ],
  },
  {
    label: 'UmbrelOS',
    to: '/umbrelos',
    children: [
      { label: 'Self-Hosting Overview', description: 'Own your data and ditch Big Tech', to: '/umbrelos', icon: 'i-lucide-server' },
      { label: 'Consulting', description: 'Expert setup for your home network', to: '/umbrelos/consulting', icon: 'i-lucide-wrench' },
    ],
  },
]
</script>
