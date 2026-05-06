<template>
  <UPage>
    <UPageHero
      title="Your Privacy. Your Rules."
      description="NodeVault helps you reclaim your digital sovereignty — from private smartphones running GrapheneOS to self-hosted home networks powered by UmbrelOS. No Big Tech surveillance. No data harvesting. Just you, in control."
      align="center">
      <template #links>
        <UButton
          to="/grapheneos"
          size="xl"
          icon="i-lucide-smartphone">
          Explore GrapheneOS
        </UButton>

        <UButton
          to="/umbrelos"
          size="xl"
          icon="i-lucide-server"
          variant="outline"
          color="neutral">
          Explore UmbrelOS
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Two Ways to Take Back Control"
      description="Whether it's the phone in your pocket or the network in your home, we help you own every layer of your digital life."
      align="center">
      <UPageGrid>
        <UPageCard
          title="GrapheneOS Phones"
          description="The most secure Android experience available. We sell Google Pixel phones with GrapheneOS pre-installed and fully hardened — no Google account required, no tracking, no compromise."
          icon="i-lucide-smartphone"
          to="/grapheneos" />

        <UPageCard
          title="UmbrelOS Home Networks"
          description="Replace Dropbox, Google Photos, Spotify, and more with apps you run at home. We design and configure your personal server so you can leave Big Tech behind for good."
          icon="i-lucide-server"
          to="/umbrelos" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Why Privacy Matters Now"
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="reason in reasons"
          :key="reason.title"
          :title="reason.title"
          :description="reason.description"
          :icon="reason.icon" />
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
const reasons = [
  {
    title: 'Your Phone Tracks Everything',
    description: 'Stock Android sends telemetry back to Google constantly. GrapheneOS eliminates this at the OS level — no Google Play Services, no location pings, no background data harvesting.',
    icon: 'i-lucide-eye-off',
  },
  {
    title: 'Your Cloud Is Someone Else\'s Computer',
    description: 'Every photo, message, and document stored in iCloud, Google Drive, or OneDrive is available to those companies and any government that asks. Your home server isn\'t.',
    icon: 'i-lucide-cloud-off',
  },
  {
    title: 'Surveillance Is the Business Model',
    description: 'Free apps and services profit by profiling you. The alternative isn\'t paying more — it\'s owning your infrastructure. We make that accessible to everyone.',
    icon: 'i-lucide-bar-chart-2',
  },
  {
    title: 'You Don\'t Need to Be Technical',
    description: 'Privacy tools used to require deep technical knowledge. We handle the hard parts — setup, configuration, and ongoing support — so you can focus on using them.',
    icon: 'i-lucide-wrench',
  },
]
</script>
