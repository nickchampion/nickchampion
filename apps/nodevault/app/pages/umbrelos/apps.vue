<template>
  <UPage>
    <UPageHero
      title="Self-Hosted Apps for UmbrelOS"
      description="A curated guide to the best privacy-respecting applications you can run on your UmbrelOS home server. Replace cloud subscriptions with open-source software you own and control."
      align="center">
      <template #links>
        <UButton
          href="https://getumbrel.com"
          target="_blank"
          size="lg"
          icon="i-lucide-external-link"
          variant="ghost"
          color="neutral">
          UmbrelOS Website
        </UButton>

        <UButton
          to="/services"
          size="lg"
          icon="i-lucide-message-circle">
          Need help getting started
        </UButton>
      </template>
    </UPageHero>

    <UContainer class="py-12">
      <div class="space-y-16">
        <section
          v-for="cat in categories"
          :key="cat.name">
          <div class="flex items-center gap-2.5 mb-2">
            <UIcon
              :name="cat.icon"
              class="size-5 text-primary shrink-0" />

            <h2 class="text-xl font-bold">
              {{ cat.name }}
            </h2>
          </div>

          <p class="text-sm text-muted mb-6 max-w-2xl">
            {{ cat.description }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <AppCard
              v-for="app in cat.apps"
              :key="app.name"
              :app="app" />
          </div>
        </section>
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Best Self-Hosted Apps for UmbrelOS | NodeVault',
  description: 'A curated guide to the best apps you can self-host on UmbrelOS. Replace Dropbox, Google Photos, Spotify, and more with open-source software you own and control.',
  ogTitle: 'Best Self-Hosted Apps for UmbrelOS | NodeVault',
  ogDescription: 'Replace cloud subscriptions with open-source self-hosted apps. Nextcloud, Bitwarden, Jellyfin, Home Assistant and more.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Best Self-Hosted Apps for UmbrelOS | NodeVault',
  twitterDescription: 'Replace Dropbox, Google Photos, Spotify, and more with apps you run at home on UmbrelOS.',
  keywords: 'self-hosted apps, UmbrelOS apps, Nextcloud, Bitwarden, Jellyfin, Home Assistant, replace Dropbox, replace Google Photos, open source self-hosted',
})

const categories = [
  {
    name: 'File Storage & Sync',
    icon: 'i-lucide-hard-drive',
    description: 'Replace Dropbox, Google Drive, and iCloud with storage you own. Your files, on your hardware, synced to your devices.',
    apps: [
      {
        name: 'Nextcloud',
        icon: 'i-lucide-cloud',
        description: 'The de facto self-hosted cloud suite. Files, contacts, calendars, collaborative documents, and 400+ community apps — all on your hardware, none in someone else\'s cloud.',
        features: [
          'File storage and sync across desktop, mobile, and web interfaces',
          'Auto-upload replaces Google Photos and iCloud photo backup',
          'CalDAV and CardDAV replace Google Calendar and Google Contacts',
          'Nextcloud Office enables real-time collaborative document editing',
          'End-to-end encryption available for selected folders',
        ],
        openSource: true,
        free: true,
        tags: ['Files', 'Contacts', 'Calendar', 'Photos'],
      },
      {
        name: 'Syncthing',
        icon: 'i-lucide-refresh-cw',
        description: 'Peer-to-peer file sync with no central server. Files travel directly between your devices — nothing passes through a third party at any point.',
        features: [
          'No central server: all sync is direct device-to-device',
          'TLS-encrypted in transit on every connection',
          'Works automatically over both LAN and WAN',
          'Versioning keeps deleted and overwritten files recoverable',
          'Send-only mode for one-way backup from phone to server',
        ],
        openSource: true,
        free: true,
        tags: ['P2P', 'No cloud', 'Versioning'],
      },
    ],
  },
  {
    name: 'Photos & Memories',
    icon: 'i-lucide-image',
    description: 'Auto-backup and organise your photo library on hardware you own. No algorithm curating your memories. No facial data feeding an ad profile.',
    apps: [
      {
        name: 'Immich',
        icon: 'i-lucide-camera',
        description: 'The best Google Photos replacement. The mobile app silently backs up photos in the background; the web interface is fast and genuinely enjoyable to use daily.',
        features: [
          'Automatic background backup from iOS and Android apps',
          'On-device face recognition and person grouping',
          'Interactive map view using embedded GPS metadata',
          'Shared albums and partner sharing for family libraries',
          'Memories surface photos from the same date in previous years',
        ],
        openSource: true,
        free: true,
        tags: ['Auto-backup', 'Face recognition', 'Google Photos alternative'],
      },
      {
        name: 'PhotoPrism',
        icon: 'i-lucide-aperture',
        description: 'AI-powered photo management with machine learning classification. Built for large libraries where automatic tagging, geo-clustering, and duplicate detection matter.',
        features: [
          'Machine learning automatically labels photos by subject and scene',
          'Geo-location map clusters photos by where they were taken',
          'RAW file support for photographers with DSLR or mirrorless cameras',
          'Duplicate detection scans your entire library automatically',
          'WebDAV access for importing photos from any device or app',
        ],
        openSource: true,
        free: true,
        tags: ['AI tagging', 'RAW support', 'Large libraries'],
      },
    ],
  },
  {
    name: 'Media Servers',
    icon: 'i-lucide-tv',
    description: 'Stream your own film, TV, music, and audiobook library to any device. No subscription. No content that disappears because of a licensing deal.',
    apps: [
      {
        name: 'Jellyfin',
        icon: 'i-lucide-play-circle',
        description: 'A complete, free media server for films, TV shows, and music. No premium tier, no licensing fees — just a well-maintained open-source project with broad device support.',
        features: [
          'Hardware-accelerated transcoding for smooth remote streaming',
          'Multi-user support with individual watch history and ratings',
          'Live TV and DVR with a compatible TV tuner card',
          'Native apps for iOS, Android, smart TVs, and games consoles',
          'Parental controls per user account',
        ],
        openSource: true,
        free: true,
        tags: ['Video', 'Music', 'Live TV'],
      },
      {
        name: 'Navidrome',
        icon: 'i-lucide-music',
        description: 'A fast, lightweight music streaming server using the Subsonic API. Compatible with dozens of polished mobile clients like DSub, Symfonium, and Substreamer.',
        features: [
          'Subsonic API compatibility with all existing Subsonic clients',
          'Handles libraries of hundreds of thousands of tracks without issue',
          'Multi-user with per-user play counts, ratings, and playlists',
          'Last.fm and ListenBrainz scrobbling support',
          'Tiny resource footprint — runs happily on a Raspberry Pi',
        ],
        openSource: true,
        free: true,
        tags: ['Music', 'Subsonic API', 'Lightweight'],
      },
      {
        name: 'Audiobookshelf',
        icon: 'i-lucide-headphones',
        description: 'A self-hosted audiobook and podcast server with polished mobile apps. Progress syncs in real time across devices, and podcast feeds update automatically.',
        features: [
          'Real-time playback position sync across iOS and Android apps',
          'Podcast RSS subscriptions with automatic episode downloads',
          'OPDS catalogue for e-reader app and Kobo compatibility',
          'Multiple libraries: separate audiobooks, podcasts, and ebooks',
          'Per-user listening statistics and per-book progress tracking',
        ],
        openSource: true,
        free: true,
        tags: ['Audiobooks', 'Podcasts', 'Mobile apps'],
      },
    ],
  },
  {
    name: 'Passwords & Security',
    icon: 'i-lucide-key-round',
    description: 'Keep your credentials on hardware you control. Self-hosted password management eliminates the single point of failure that commercial password manager cloud services represent.',
    apps: [
      {
        name: 'Vaultwarden',
        icon: 'i-lucide-vault',
        description: 'A lightweight Bitwarden-compatible server written in Rust. Point any official Bitwarden client at your server instead of bitwarden.com — same apps, your infrastructure.',
        features: [
          'Full compatibility with all official Bitwarden clients and extensions',
          'End-to-end encrypted vault: Vaultwarden cannot read your passwords',
          'Organisations and collections for secure family or team sharing',
          'TOTP authenticator codes stored alongside credentials',
          'Uses a fraction of the RAM of the official Bitwarden server',
        ],
        openSource: true,
        free: true,
        tags: ['Bitwarden-compatible', 'Rust', 'Lightweight'],
      },
    ],
  },
  {
    name: 'Network & DNS',
    icon: 'i-lucide-wifi',
    description: 'Block tracking and advertising at the network level, encrypt DNS queries, and access your home server securely from anywhere.',
    apps: [
      {
        name: 'Pi-hole',
        icon: 'i-lucide-shield',
        description: 'Network-wide DNS-based ad and tracker blocking. Set it as your router\'s DNS server and every device on your network gets protection — no software required on each device.',
        features: [
          'Blocks ads and trackers for every device on the network',
          'Requires no software installation on individual devices',
          'Subscribe to community-maintained blocklists and customise them',
          'Per-device query statistics, graphs, and top blocked domains',
          'Optional DHCP server for complete local DNS control',
        ],
        openSource: true,
        free: true,
        tags: ['DNS blocking', 'Network-wide', 'All devices'],
      },
      {
        name: 'AdGuard Home',
        icon: 'i-lucide-shield-check',
        description: 'A more advanced alternative to Pi-hole. Adds encrypted upstream DNS, per-client rule granularity, and parental controls out of the box.',
        features: [
          'DNS-over-HTTPS and DNS-over-TLS for encrypted upstream queries',
          'Per-device custom blocking rules and override allowlists',
          'Parental controls with forced safe search on selected clients',
          'Real-time query log with one-click blocking from the dashboard',
          'Can enforce different rules for IoT devices, kids\' devices, and adults',
        ],
        openSource: true,
        free: true,
        tags: ['DNS-over-HTTPS', 'Encrypted DNS', 'Per-device rules'],
      },
      {
        name: 'WireGuard Easy',
        icon: 'i-lucide-lock',
        description: 'A clean web dashboard for managing a WireGuard VPN server. Generate peer configs with one click and access all your self-hosted services from anywhere, encrypted.',
        features: [
          'Visual dashboard for creating and revoking VPN peer configs',
          'QR code generation for instant mobile client configuration',
          'Access all self-hosted services remotely over encrypted WireGuard',
          'Minimal WireGuard codebase (~4,000 lines) is easy to audit',
          'Split tunnelling routes only selected traffic through the VPN',
        ],
        openSource: true,
        free: true,
        tags: ['VPN', 'Remote access', 'WireGuard'],
      },
    ],
  },
  {
    name: 'Smart Home',
    icon: 'i-lucide-home',
    description: 'Automate your home without Amazon, Google, or Apple knowing what happens inside it or when.',
    apps: [
      {
        name: 'Home Assistant',
        icon: 'i-lucide-cpu',
        description: 'The leading open-source smart home platform. Integrates with over 3,000 devices and processes everything locally — automations run even when your internet is down.',
        features: [
          '3,000+ device integrations including Z-Wave, Zigbee, and Matter',
          'Fully local processing — no internet required for automations to run',
          'Powerful visual automation engine with conditions, triggers, and actions',
          'Lovelace dashboard fully customisable per room and device',
          'iOS and Android companion apps with location-based automations',
        ],
        openSource: true,
        free: true,
        tags: ['Zigbee', 'Z-Wave', 'Matter', 'Local-first'],
      },
    ],
  },
  {
    name: 'Documents & Productivity',
    icon: 'i-lucide-files',
    description: 'Manage documents, recipes, ebooks, and PDFs on your own server. No files uploaded to third-party services. No data leaving your home.',
    apps: [
      {
        name: 'Paperless-ngx',
        icon: 'i-lucide-file-text',
        description: 'Document management with OCR. Scan anything and it becomes instantly searchable by full text, date, correspondent, and AI-assigned tags. End the physical paper pile.',
        features: [
          'OCR on upload — every scanned document becomes full-text searchable',
          'Machine learning automatically suggests tags and correspondents',
          'Email ingestion: forward documents directly from your inbox',
          'Consumption folder auto-imports scanner output',
          'REST API for custom document processing integrations',
        ],
        openSource: true,
        free: true,
        tags: ['OCR', 'Document management', 'Auto-tagging'],
      },
      {
        name: 'Mealie',
        icon: 'i-lucide-utensils',
        description: 'Self-hosted recipe manager with meal planning and shopping lists. Paste any recipe URL and Mealie scrapes it automatically — no more cooking from a phone screen with ads.',
        features: [
          'Scrapes recipes from any website URL with a single click',
          'Meal planner generates a weekly shopping list automatically',
          'Multi-user with individual recipe collections and cookbooks',
          'OIDC single sign-on integration with your identity provider',
          'Import and export in standard recipe formats for portability',
        ],
        openSource: true,
        free: true,
        tags: ['Recipes', 'Meal planning', 'Shopping lists'],
      },
      {
        name: 'Calibre-web',
        icon: 'i-lucide-book-open',
        description: 'A clean web interface for your Calibre ebook library. Browse, read, and sync books to your e-reader or Kobo device without a commercial storefront.',
        features: [
          'OPDS catalogue compatible with most e-reader apps and devices',
          'Kobo sync: reading progress and shelves sync directly with the device',
          'Metadata editing and automatic cover art fetching',
          'On-the-fly format conversion between ePub, MOBI, and PDF',
          'Per-user accounts with separate bookshelves and reading lists',
        ],
        openSource: true,
        free: true,
        tags: ['Ebooks', 'Kobo sync', 'OPDS'],
      },
      {
        name: 'Stirling PDF',
        icon: 'i-lucide-file-cog',
        description: 'A self-hosted PDF toolkit with over 50 operations. Split, merge, compress, OCR, convert — without uploading sensitive documents to a third-party online service.',
        features: [
          '50+ PDF operations: merge, split, compress, rotate, reorder pages',
          'OCR powered by Tesseract — makes scanned PDFs text-searchable',
          'PDF to Word, Excel, and image conversion on your hardware',
          'All processing happens locally — no documents leave your server',
          'REST API for automated document processing pipelines',
        ],
        openSource: true,
        free: true,
        tags: ['PDF tools', 'OCR', 'Local processing'],
      },
    ],
  },
  {
    name: 'Monitoring & Management',
    icon: 'i-lucide-activity',
    description: 'Keep your self-hosted services healthy and visible with lightweight monitoring and management tools.',
    apps: [
      {
        name: 'Uptime Kuma',
        icon: 'i-lucide-heart-pulse',
        description: 'A polished self-hosted uptime monitor. Tracks whether your services are responding and sends instant notifications through Signal, Telegram, ntfy, or 90+ other channels.',
        features: [
          'Multi-protocol monitoring: HTTP, TCP, DNS, Docker containers, and more',
          'Customisable public status page for family or team visibility',
          'Notifications via Signal, Telegram, email, ntfy, and 90+ providers',
          'Response time graphs and uptime percentage history over time',
          'TLS certificate expiry monitoring for HTTPS services',
        ],
        openSource: true,
        free: true,
        tags: ['Monitoring', 'Status page', 'Alerts'],
      },
      {
        name: 'Portainer',
        icon: 'i-lucide-layers',
        description: 'A visual management dashboard for Docker containers. Deploy, update, and inspect every service running on your server from a browser — no command line needed.',
        features: [
          'Visual container management without requiring command-line access',
          'Deploy services from Docker Compose stacks via the web UI',
          'Real-time container logs, resource usage stats, and inspection',
          'Network and volume management with full visibility',
          'Role-based access for multi-user server administration',
        ],
        openSource: true,
        free: true,
        tags: ['Docker', 'Container management', 'Web UI'],
      },
    ],
  },
]
</script>
