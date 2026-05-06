<template>
  <UPage>
    <UPageHero
      title="Own Your Data. Run Your Own Cloud."
      description="UmbrelOS turns any small home computer into a personal server that replaces the cloud services you pay for every month. Your files, your music, your passwords, your smart home — all running on hardware you own, in a place you control."
      align="center">
      <template #links>
        <UButton
          to="/umbrelos/consulting"
          size="xl"
          icon="i-lucide-wrench">
          Get Help Setting Up
        </UButton>

        <UButton
          to="https://getumbrel.com"
          target="_blank"
          size="xl"
          icon="i-lucide-external-link"
          variant="outline"
          color="neutral">
          Learn About UmbrelOS
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="What You Can Self-Host"
      description="One home server can replace a dozen paid cloud subscriptions. These are the apps we set up most frequently."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="app in apps"
          :key="app.name"
          :title="app.name"
          :description="app.description"
          :icon="app.icon" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Why Self-Host?"
      description="Cloud services are convenient. But convenience has a cost most people don't see on their bank statement."
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

    <UPageSection
      title="What Hardware Do You Need?"
      description="UmbrelOS runs on modest hardware. You don't need a server room — a small box in a cupboard is enough."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="option in hardware"
          :key="option.title"
          :title="option.title"
          :description="option.description"
          :icon="option.icon" />
      </UPageGrid>

      <div class="flex justify-center mt-10">
        <UButton
          to="/umbrelos/consulting"
          size="lg"
          icon="i-lucide-wrench">
          Get expert hardware recommendations
        </UButton>
      </div>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
const apps = [
  {
    name: 'Nextcloud',
    description: 'Your own Google Drive and Google Photos. Files, contacts, calendars, and photo backups — on your hardware, synced to all your devices.',
    icon: 'i-lucide-cloud',
  },
  {
    name: 'Vaultwarden',
    description: 'A self-hosted Bitwarden-compatible password manager. Your entire password vault lives on your server — not on a company\'s cloud.',
    icon: 'i-lucide-key-round',
  },
  {
    name: 'Jellyfin',
    description: 'Stream your own music, films, and TV shows to any device at home or away. No subscription, no licensing restrictions, no content that disappears.',
    icon: 'i-lucide-play-circle',
  },
  {
    name: 'Pi-hole',
    description: 'Network-wide ad and tracker blocking for every device on your home network — phones, TVs, smart speakers, and laptops — without installing anything on each device.',
    icon: 'i-lucide-shield',
  },
  {
    name: 'WireGuard VPN',
    description: 'Securely access your home network from anywhere in the world. Beats commercial VPNs because you control the server and there are no logs by design.',
    icon: 'i-lucide-lock',
  },
  {
    name: 'Home Assistant',
    description: 'Smart home automation without sending your data to Amazon, Google, or Apple. Connects to thousands of devices and runs entirely offline.',
    icon: 'i-lucide-home',
  },
  {
    name: 'Immich',
    description: 'A fast, self-hosted Google Photos alternative with face recognition, automatic backups from your phone, and album sharing with family.',
    icon: 'i-lucide-image',
  },
  {
    name: 'Paperless-ngx',
    description: 'Scan, OCR, and organise all your documents. Search your entire archive instantly — from bank statements to warranties — without anything leaving your home.',
    icon: 'i-lucide-file-text',
  },
]

const reasons = [
  {
    title: 'No Monthly Subscriptions',
    description: 'Pay for hardware once. Run Nextcloud, Bitwarden, and Jellyfin indefinitely at zero ongoing cost. Most setups pay for themselves within a year.',
    icon: 'i-lucide-receipt',
  },
  {
    title: 'Your Data Never Leaves Home',
    description: 'Files you store on your Nextcloud server stay on your Nextcloud server. No terms-of-service changes, no data mining, no breach notifications from someone else\'s cloud.',
    icon: 'i-lucide-house',
  },
  {
    title: 'No Accounts to Compromise',
    description: 'Self-hosted services don\'t share a login database with millions of other users. A breach at Dropbox or LastCloud can\'t affect you if your data isn\'t there.',
    icon: 'i-lucide-user-x',
  },
  {
    title: 'Works When the Internet Is Down',
    description: 'Local network access means your files, music, and home automation keep working during outages. No "service is currently unavailable" — it\'s your server.',
    icon: 'i-lucide-wifi-off',
  },
]

const hardware = [
  {
    title: 'Mini PC (Recommended)',
    description: 'An Intel N100 mini PC costs around £130, uses 6W of power, and runs UmbrelOS flawlessly. Silent, small enough to hide behind a router, and powerful enough for 4K video transcoding.',
    icon: 'i-lucide-server',
  },
  {
    title: 'Raspberry Pi 4 or 5',
    description: 'The classic self-hosting hardware. The Pi 5 especially handles most UmbrelOS apps well. Best for lighter workloads — file storage, password manager, Pi-hole.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'Repurposed Laptop or Desktop',
    description: 'Have an old machine gathering dust? It can almost certainly run UmbrelOS. We\'ll assess whether your existing hardware is suitable before recommending anything new.',
    icon: 'i-lucide-laptop',
  },
]
</script>
