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
  {
    label: 'Small Businesses',
    to: '/business',
    children: [
      {
        label: 'Overview', description: 'Tools and infrastructure for small professional practices', to: '/business', icon: 'i-lucide-building-2',
      },
      {
        label: 'GDPR Compliance', description: 'Your legal obligations and how to meet them', to: '/gdpr', icon: 'i-lucide-scroll-text',
      },
      {
        label: 'Secure Infrastructure', description: 'EU-hosted, GDPR-compliant data storage', to: '/business/servers', icon: 'i-lucide-server',
      },
      {
        label: 'Secure Devices', description: 'Hardened phones for you and your team', to: '/business/phones', icon: 'i-lucide-smartphone',
      },
    ],
  },
  {
    label: 'GrapheneOS',
    to: '/grapheneos',
    children: [
      {
        label: 'Why GrapheneOS', description: 'Privacy-first Android for everyone', to: '/grapheneos', icon: 'i-lucide-shield',
      },
      {
        label: 'Buy a Phone', description: 'Pixel + GrapheneOS, pre-configured', to: '/grapheneos/phones', icon: 'i-lucide-smartphone',
      },
      {
        label: 'App Reviews', description: 'Best privacy apps for your phone', to: '/grapheneos/apps', icon: 'i-lucide-layout-grid',
      },
    ],
  },
  {
    label: 'UmbrelOS',
    to: '/umbrelos',
    children: [
      {
        label: 'Self-Hosting Overview', description: 'Own your data and ditch Big Tech', to: '/umbrelos', icon: 'i-lucide-server',
      },
      {
        label: 'Consulting', description: 'Expert setup for your home network', to: '/umbrelos/consulting', icon: 'i-lucide-wrench',
      },
      {
        label: 'App Reviews', description: 'Self-hosted app directory', to: '/umbrelos/apps', icon: 'i-lucide-layout-grid',
      },
    ],
  },
  { label: 'Contact', to: '/company/contact' },
]
</script>
