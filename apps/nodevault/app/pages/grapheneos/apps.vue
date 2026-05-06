<template>
  <UPage>
    <UPageHero
      title="Privacy Apps for GrapheneOS"
      description="A curated guide to the best privacy-respecting apps available on GrapheneOS. Every app listed here is open source, free from surveillance advertising, and works without Google Play Services."
      align="center">
      <template #links>
        <UButton
          to="/grapheneos/phones"
          size="lg"
          icon="i-lucide-smartphone">
          Get a Pre-Configured Phone
        </UButton>

        <UButton
          to="/grapheneos"
          size="lg"
          icon="i-lucide-arrow-left"
          variant="outline"
          color="neutral">
          About GrapheneOS
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
  title: 'Best Privacy Apps for GrapheneOS | NodeVault',
  description: 'A curated guide to the best privacy-respecting apps for GrapheneOS. Signal, Brave, Proton Mail, Mullvad VPN, Bitwarden and more — all open source, no surveillance advertising.',
  ogTitle: 'Best Privacy Apps for GrapheneOS | NodeVault',
  ogDescription: 'Open-source, surveillance-free app recommendations for GrapheneOS. Messaging, browsers, email, maps, VPNs and more.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Best Privacy Apps for GrapheneOS | NodeVault',
  twitterDescription: 'Curated open-source apps that work without Google Play Services. Signal, Brave, Bitwarden, Proton Mail, and more.',
  keywords: 'GrapheneOS apps, privacy apps Android, open source apps, Signal, Brave, Bitwarden, Proton Mail, Mullvad VPN, F-Droid, no Google Play',
})

const categories = [
  {
    name: 'Communication & Messaging',
    icon: 'i-lucide-message-circle',
    description: 'End-to-end encrypted replacements for WhatsApp, Facebook Messenger, and standard SMS that work without Google Play Services.',
    apps: [
      {
        name: 'Signal',
        icon: 'i-lucide-message-circle',
        description: 'The gold standard in private messaging. Used by journalists, security professionals, and activists worldwide. Runs natively on GrapheneOS without Google services.',
        features: [
          'End-to-end encryption for all messages, calls, and video',
          'Disappearing messages with per-conversation timers',
          'No metadata collection — Signal cannot see who you contact or when',
          'Sealed sender hides recipient identity from Signal\'s servers',
          'Note to self doubles as an encrypted private scratchpad',
        ],
        openSource: true,
        free: true,
        tags: ['Messaging', 'Calls', 'Video'],
      },
      {
        name: 'Molly',
        icon: 'i-lucide-shield-check',
        description: 'A hardened Signal fork built specifically for GrapheneOS users. Adds memory-level security that Signal itself doesn\'t offer, while remaining fully compatible with the Signal network.',
        features: [
          'RAM-backed database wiped from memory automatically when locked',
          'Additional passphrase layer on top of the Android screen lock',
          'UnifiedPush support removes the need for Google push notifications',
          'FOSS-only build contains no proprietary components',
          'Automatic lock triggered on USB connection',
        ],
        openSource: true,
        free: true,
        tags: ['Signal-compatible', 'Hardened', 'UnifiedPush'],
      },
      {
        name: 'Element',
        icon: 'i-lucide-network',
        description: 'Open-source client for the Matrix protocol — a decentralised, federated messaging network with no single point of control. Self-host your own homeserver for full independence.',
        features: [
          'Federated protocol: no central authority can read or censor messages',
          'End-to-end encryption via the Olm and Megolm cryptographic libraries',
          'Self-host your homeserver to own your data entirely',
          'Bridges to Telegram, Signal, Discord, and Slack via your own server',
          'Persistent cross-device message history without a central silo',
        ],
        openSource: true,
        free: true,
        tags: ['Matrix', 'Federated', 'Self-hostable'],
      },
    ],
  },
  {
    name: 'Web Browsers',
    icon: 'i-lucide-globe',
    description: 'Privacy-hardened browsers that resist fingerprinting, block trackers, and don\'t report your browsing history to an advertising network.',
    apps: [
      {
        name: 'Vanadium',
        icon: 'i-lucide-shield',
        description: 'GrapheneOS\'s own hardened Chromium build. Ships as part of the OS and receives the same security patches and hardening applied to the rest of the system.',
        features: [
          'Uses GrapheneOS\'s hardened memory allocator throughout',
          'Additional sandboxing restricts JavaScript runtime capabilities',
          'WebGL and other high-risk browser APIs restricted by default',
          'Deeply integrated with GrapheneOS\'s network and storage permissions',
          'No Google account integration, sync, or reporting',
        ],
        openSource: true,
        free: true,
        tags: ['Built-in', 'Chromium', 'Hardened'],
      },
      {
        name: 'Brave',
        icon: 'i-lucide-zap',
        description: 'Chromium-based browser with aggressive built-in ad and tracker blocking. A solid daily driver for users who want strong defaults without configuring anything.',
        features: [
          'Shields block ads, trackers, and fingerprinting by default on every site',
          'Private browsing windows route through Tor for anonymised browsing',
          'Fingerprint randomisation confuses cross-site tracking scripts',
          'Automatic HTTPS upgrades for insecure connections',
          'No extensions needed — blocking works out of the box',
        ],
        openSource: true,
        free: true,
        tags: ['Chromium', 'Tor integration', 'Ad blocking'],
      },
      {
        name: 'Firefox (Fenix)',
        icon: 'i-lucide-flame',
        description: 'The only mainstream non-Chromium browser. Uniquely supports uBlock Origin — still the best content blocker available on any platform.',
        features: [
          'uBlock Origin fully supported: best-in-class ad and tracker blocking',
          'Gecko engine maintains browser ecosystem diversity beyond Chromium',
          'Multi-Account Containers isolate browsing activity by site category',
          'Enhanced Tracking Protection blocks social media trackers by default',
          'Extensive privacy-focused extension library',
        ],
        openSource: true,
        free: true,
        tags: ['Gecko', 'Extensions', 'uBlock Origin'],
      },
    ],
  },
  {
    name: 'Email',
    icon: 'i-lucide-mail',
    description: 'End-to-end encrypted email providers that keep your correspondence away from advertising platforms and their surveillance engines.',
    apps: [
      {
        name: 'Proton Mail',
        icon: 'i-lucide-mail',
        description: 'Swiss-based end-to-end encrypted email. The largest privacy-focused provider, subject to strict Swiss privacy law and independently audited regularly.',
        features: [
          'E2E encrypted between Proton users; PGP with external recipients',
          'Zero-access encryption: Proton cannot read your messages',
          'Open-source clients with published cryptographic audits',
          'Jurisdiction in Switzerland, structurally outside EU and US legal reach',
          'Proton Bridge enables use with any standard desktop email client',
        ],
        openSource: true,
        free: true,
        tags: ['Swiss law', 'PGP', 'E2E encryption'],
      },
      {
        name: 'Tuta',
        icon: 'i-lucide-lock',
        description: 'German-based encrypted email and calendar that encrypts subject lines and metadata as well as message bodies — a meaningful distinction most competitors miss.',
        features: [
          'Encrypts subject lines and sender metadata, not just message bodies',
          'Built-in encrypted calendar synchronised across all devices',
          'No IP logging: access logs are not tied to your identity',
          'Open-source clients with published independent security audits',
          'Permanent email aliases available on affordable paid plans',
        ],
        openSource: true,
        free: true,
        tags: ['German law', 'Calendar', 'E2E encryption'],
      },
    ],
  },
  {
    name: 'Maps & Navigation',
    icon: 'i-lucide-map-pin',
    description: 'Offline-first navigation using OpenStreetMap data — get where you\'re going without reporting your location to Google or Apple in real time.',
    apps: [
      {
        name: 'Organic Maps',
        icon: 'i-lucide-map',
        description: 'The simplest, cleanest offline map for daily use. No account, no tracking, entirely offline. OpenStreetMap data is downloaded to your device.',
        features: [
          'Fully offline: download maps for any country, region, or city',
          'No location data ever leaves your device',
          'Turn-by-turn navigation for walking, cycling, and driving',
          'No ads, no trackers, no analytics of any kind',
          'Lightweight and fast — no background services running',
        ],
        openSource: true,
        free: true,
        tags: ['Offline', 'OpenStreetMap', 'No tracking'],
      },
      {
        name: 'OsmAnd+',
        icon: 'i-lucide-compass',
        description: 'Feature-rich OpenStreetMap client for users who need more than basic navigation: contour lines, hiking trails, nautical charts, and public transport routing.',
        features: [
          'Offline contour lines and terrain shading for outdoor navigation',
          'Public transport routing with real timetable data',
          'Nautical charts and depth data for marine navigation',
          'GPX trip recording with export for route sharing',
          'Direct OpenStreetMap editing from within the app',
        ],
        openSource: true,
        free: true,
        tags: ['Offline', 'Hiking', 'Nautical', 'Advanced'],
      },
    ],
  },
  {
    name: 'VPN',
    icon: 'i-lucide-shield',
    description: 'No-logs VPN providers with strong privacy track records and published audits. Pairs with GrapheneOS\'s per-app VPN routing for surgical traffic control.',
    apps: [
      {
        name: 'Mullvad VPN',
        icon: 'i-lucide-shield',
        description: 'The most anonymous commercial VPN. No email, no name — just a randomly generated account number. Accepts cash and Monero. Works perfectly with GrapheneOS\'s per-app VPN.',
        features: [
          'No account creation: just a randomly generated number',
          'Accepts cash, Monero, and Bitcoin for genuinely anonymous payment',
          'Independently audited no-logs policy with published results',
          'WireGuard and OpenVPN protocol support',
          'Owned infrastructure in data centres they control',
        ],
        openSource: true,
        free: false,
        tags: ['No account', 'WireGuard', 'Audited'],
      },
      {
        name: 'ProtonVPN',
        icon: 'i-lucide-shield-check',
        description: 'Swiss-based VPN from the makers of Proton Mail. The only commercially-run VPN with a genuinely unlimited free tier — no data cap, no speed throttle.',
        features: [
          'Free tier with no data limit and no advertising',
          'Swiss jurisdiction with independently audited no-logs policy',
          'Secure Core routes traffic through privacy-friendly countries first',
          'NetShield blocks ads and malware at the DNS level',
          'Fully open-source clients across all platforms',
        ],
        openSource: true,
        free: true,
        tags: ['Free tier', 'Swiss law', 'Multi-hop'],
      },
    ],
  },
  {
    name: 'Security & Authentication',
    icon: 'i-lucide-key-round',
    description: 'Password managers and 2FA authenticators that keep your accounts secure without trusting your credentials to a third-party cloud.',
    apps: [
      {
        name: 'Bitwarden',
        icon: 'i-lucide-vault',
        description: 'Open-source password manager available on every platform. Syncs via Bitwarden\'s servers or your own self-hosted Vaultwarden instance on UmbrelOS.',
        features: [
          'End-to-end encrypted vault hosted by Bitwarden or self-hosted',
          'TOTP 2FA codes stored and auto-filled alongside passwords',
          'Autofill works reliably on GrapheneOS without Google services',
          'Emergency access allows a trusted contact to request vault entry',
          'Cross-platform: iOS, Android, browser extensions, and desktop',
        ],
        openSource: true,
        free: true,
        tags: ['Self-hostable', 'TOTP', 'Cross-platform'],
      },
      {
        name: 'Aegis Authenticator',
        icon: 'i-lucide-fingerprint',
        description: 'The best 2FA authenticator on Android. Stores codes in an encrypted vault that backs up without relying on Google or any cloud service.',
        features: [
          'Encrypted backup exportable to any storage location you choose',
          'No network permission — the app literally cannot send data anywhere',
          'Import tokens from Google Authenticator, Authy, and others',
          'Biometric and PIN unlock with a customisable screen timeout',
          'HOTP, TOTP, and Steam Guard format support',
        ],
        openSource: true,
        free: true,
        tags: ['TOTP', 'Offline', 'Encrypted backup'],
      },
      {
        name: 'KeePassDX',
        icon: 'i-lucide-database',
        description: 'Fully offline password manager using the open KeePass format. The database is just a file — store and sync it however you want, including via Nextcloud.',
        features: [
          'Entirely offline: no server, no account, no cloud dependency',
          'KeePass 2.x format compatible with desktop apps on all platforms',
          'Biometric and master password unlock',
          'Android Autofill API support for seamless credential filling',
          'Store the database on Nextcloud for private, self-controlled sync',
        ],
        openSource: true,
        free: true,
        tags: ['Offline', 'KeePass format', 'No account'],
      },
    ],
  },
  {
    name: 'App Stores',
    icon: 'i-lucide-package',
    description: 'Install apps without handing your device identity or payment details to Google.',
    apps: [
      {
        name: 'F-Droid',
        icon: 'i-lucide-boxes',
        description: 'The original free and open-source Android app repository. Every app in the main repo is verified open source, built reproducibly from published source code.',
        features: [
          'Every app is free and open source — no proprietary software',
          'Anti-features system flags trackers, ads, and non-free dependencies',
          'Reproducible builds: binaries can be verified against source code',
          'No account, no payment details, no device identity disclosure',
          'Third-party repos like IzzyOnDroid significantly expand the catalogue',
        ],
        openSource: true,
        free: true,
        tags: ['FOSS only', 'No account', 'Verified builds'],
      },
      {
        name: 'Aurora Store',
        icon: 'i-lucide-cloud-download',
        description: 'A Google Play Store client that downloads apps anonymously. Uses shared anonymous accounts to access the Play catalogue without exposing your identity.',
        features: [
          'Download any Play Store app without a Google account',
          'Shows tracker count and requested permissions before installing',
          'Batch updates for all installed apps in one tap',
          'Anonymous authentication hides your device identity from Google',
          'Split APK support reduces download size for supported apps',
        ],
        openSource: true,
        free: true,
        tags: ['Google Play', 'Anonymous', 'No account'],
      },
    ],
  },
  {
    name: 'Media & Entertainment',
    icon: 'i-lucide-play-circle',
    description: 'Watch and listen without feeding algorithmic surveillance or seeing advertising tied to your viewing history.',
    apps: [
      {
        name: 'NewPipe',
        icon: 'i-lucide-video',
        description: 'Watch YouTube, PeerTube, SoundCloud, and Bandcamp without accounts, ads, or the surveillance that comes with their official apps.',
        features: [
          'YouTube without a Google account or any Google tracking',
          'Background audio playback for music videos and talks',
          'Download video or audio directly to your device',
          'SponsorBlock integration automatically skips in-video ad segments',
          'No ads on any platform, ever',
        ],
        openSource: true,
        free: true,
        tags: ['YouTube', 'No ads', 'Downloads'],
      },
      {
        name: 'AntennaPod',
        icon: 'i-lucide-radio',
        description: 'Open-source podcast client with no trackers, no ads, and no algorithmic recommendations. Just your subscriptions, in the order you choose.',
        features: [
          'Zero tracking or analytics of your listening behaviour',
          'OPML import and export: own your subscription list completely',
          'gPodder sync for cross-device progress without a central platform',
          'Variable playback speed and sleep timer',
          'Chapter markers and embedded show notes',
        ],
        openSource: true,
        free: true,
        tags: ['Podcasts', 'No tracking', 'OPML'],
      },
    ],
  },
  {
    name: 'Notes & Productivity',
    icon: 'i-lucide-notebook',
    description: 'Encrypted note-taking apps that keep your thoughts private even if a server is ever compromised.',
    apps: [
      {
        name: 'Standard Notes',
        icon: 'i-lucide-sticky-note',
        description: 'Encrypted note-taking focused on longevity and privacy. Notes are stored in plain, open formats — readable and exportable long after the app exists.',
        features: [
          'End-to-end encrypted: Standard Notes cannot read your notes',
          'Plain text and JSON formats — no proprietary lock-in',
          'Cross-platform sync via Standard Notes servers or self-hosted',
          'Markdown, rich text, code editor, and spreadsheet extensions',
          'Local backups exportable in readable format at any time',
        ],
        openSource: true,
        free: true,
        tags: ['E2E encrypted', 'Cross-platform', 'Self-hostable'],
      },
      {
        name: 'Joplin',
        icon: 'i-lucide-file-text',
        description: 'Markdown note-taking with optional end-to-end encryption and WebDAV/Nextcloud sync. Store notes on your own server — no third-party cloud required.',
        features: [
          'Optional E2E encryption for all synced notes',
          'WebDAV and Nextcloud sync: use your own self-hosted server',
          'Full Markdown with inline image and code block rendering',
          'Evernote import for migration from proprietary platforms',
          'Web Clipper extension saves pages directly to your notes',
        ],
        openSource: true,
        free: true,
        tags: ['Markdown', 'Nextcloud sync', 'WebDAV'],
      },
    ],
  },
]
</script>
