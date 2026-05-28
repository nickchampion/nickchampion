<template>
  <UPage>
    <UPageHero
      title="A Phone That Actually Respects Your Privacy"
      description="GrapheneOS is a hardened, open-source Android fork built for Google Pixel phones. It removes all Google tracking, hardens the OS against attacks, and gives you an app sandbox that genuinely contains apps — not just in principle, but in practice."
      align="center">
      <template #links>
        <UButton
          href="https://grapheneos.org/"
          target="_blank"
          size="lg"
          icon="i-lucide-external-link"
          variant="ghost"
          color="neutral">
          GrapheneOS Website
        </UButton>

        <UButton
          to="/services"
          size="lg"
          icon="i-lucide-message-circle">
          Need help getting started
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Your phone is tracking you. Here's how to stop it."
      description="Both iOS and Android collect far more data than most people realise — and most of it cannot be turned off through settings. GrapheneOS is a hardened Android operating system that eliminates surveillance at the OS level."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-w-5xl mx-auto">
        <div class="rounded-2xl border border-default bg-muted/20 p-6 space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0">
              <UIcon
                name="i-lucide-apple"
                class="size-5" />
            </div>

            <h3 class="font-bold text-lg">
              iOS
            </h3>
          </div>

          <p class="text-sm text-muted">
            Apple's privacy marketing is aggressive, but iOS still collects significant data by default.
          </p>

          <ul class="space-y-2.5">
            <li
              v-for="item in iosTracking"
              :key="item.title"
              class="flex items-start gap-3 text-sm">
              <UIcon
                name="i-lucide-alert-circle"
                class="size-4 text-warning shrink-0 mt-0.5" />

              <div>
                <p class="font-medium">
                  {{ item.title }}
                </p>

                <p class="text-muted text-xs mt-0.5">
                  {{ item.detail }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-2xl border border-default bg-muted/20 p-6 space-y-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0">
              <UIcon
                name="i-lucide-smartphone"
                class="size-5" />
            </div>

            <h3 class="font-bold text-lg">
              Stock Android
            </h3>
          </div>

          <p class="text-sm text-muted">
            Google's business model is advertising. Android is the data collection tool.
          </p>

          <ul class="space-y-2.5">
            <li
              v-for="item in androidTracking"
              :key="item.title"
              class="flex items-start gap-3 text-sm">
              <UIcon
                name="i-lucide-alert-circle"
                class="size-4 text-error shrink-0 mt-0.5" />

              <div>
                <p class="font-medium">
                  {{ item.title }}
                </p>

                <p class="text-muted text-xs mt-0.5">
                  {{ item.detail }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <UAlert
        class="mt-8 max-w-3xl mx-auto text-left"
        icon="i-lucide-info"
        color="neutral"
        variant="subtle">
        <template #description>
          A 2018 study by Douglas Leith at Trinity College Dublin found that Google Android sends approximately 20 times more data to Google than iOS sends to Apple. A 2021 follow-up by the same researcher found both platforms send device identifiers even when users have opted out of tracking.
        </template>
      </UAlert>
    </UPageSection>

    <UPageSection
      title="What Makes GrapheneOS Different"
      description="This isn't just 'Android without Google'. GrapheneOS rebuilds the entire security model from the ground up."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Recommended Apps for GrapheneOS"
      description="We configure these open-source alternatives to replace the surveillance apps that come pre-installed on standard Android phones."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="app in recommendedApps"
          :key="app.name"
          :title="app.name"
          :description="app.description"
          :icon="app.icon" />
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
import { useConfig } from '@nodevault/platform.components.nodevault.client'

const posthog = usePostHog()

useSeoMeta({
  title: 'GrapheneOS Phones | NodeVault — Hardened Private Android',
  description: 'GrapheneOS is a hardened, open-source Android fork for Google Pixel phones. Zero Google tracking, full app sandboxing, and hardened memory. Buy pre-configured from NodeVault.',
  ogTitle: 'GrapheneOS Phones | NodeVault',
  ogDescription: 'Zero Google tracking, full app sandboxing, hardened memory. Buy a pre-configured GrapheneOS Pixel from NodeVault.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'GrapheneOS Phones | NodeVault',
  twitterDescription: 'The most secure Android experience available. Pre-configured, hardened, ready to use.',
  keywords: 'GrapheneOS, privacy phone, hardened Android, Google Pixel, no Google tracking, private smartphone, buy GrapheneOS phone, open source Android',
})

const config = useConfig()

const iosTracking = [
  {
    title: 'Device analytics shared with Apple and partners',
    detail: 'Enabled by default. Covers usage patterns, crash logs, app interactions, and Siri query content.',
  },
  {
    title: 'iCloud backups scanned for CSAM — and more',
    detail: 'Apple scans iCloud Photo Library contents on-device before upload. The same infrastructure could be applied to other content categories.',
  },
  {
    title: 'Precise location shared for "personalised ads"',
    detail: 'iOS shares location data with Apple\'s advertising platform. Disabling this requires navigating multiple settings screens and doesn\'t cover all data flows.',
  },
  {
    title: 'Siri processes queries on Apple servers',
    detail: 'Even with "improve Siri" disabled, voice queries are processed server-side. Audio snippets are retained for a period.',
  },
  {
    title: 'App Store purchase and browsing history retained',
    detail: 'Apple retains your full App Store history and associates it with your Apple ID indefinitely.',
  },
]

const androidTracking = [
  {
    title: 'OS-level telemetry to Google every few minutes',
    detail: 'Research by Trinity College Dublin found stock Android pings Google servers regularly even with no apps running, sharing location, hardware IDs, and network data.',
  },
  {
    title: 'Google Play Services runs with system-level privileges',
    detail: 'Google Play Services cannot be removed on stock Android. It has access to your contacts, location, app data, and device identifiers — always.',
  },
  {
    title: 'Location history even when "off"',
    detail: 'Google was found to record location even when users had disabled Location History, using Wi-Fi scan data and Cell ID lookups as proxies.',
  },
  {
    title: 'All search, maps, and Assistant queries retained',
    detail: 'Every query across Google apps is logged and associated with your Google account. This includes voice queries to Google Assistant.',
  },
  {
    title: 'Ad ID tracks you across every app',
    detail: 'Android assigns a persistent advertising identifier that follows you across every app. "Resetting" it creates a new ID but doesn\'t delete the history associated with the old one.',
  },
  {
    title: 'Manufacturer and carrier bloatware with own telemetry',
    detail: 'Samsung, OnePlus, and carrier-branded phones ship with additional apps that run their own telemetry independently of Google.',
  },
]

const features = [
  {
    title: 'Zero Google Services',
    description: 'No Google Play Services means no location reporting, no ad tracking, and no telemetry — at the OS level. Not a setting you can accidentally toggle off.',
    icon: 'i-lucide-eye-off',
  },
  {
    title: 'Full App Sandboxing',
    description: 'Every app runs in strong isolation (hardened app sandbox). Apps cannot access your contacts, location, camera, or microphone without explicit user permission. GrapheneOS also adds extra toggles (e.g., network and sensors) and scoped storage controls for finer-grained privacy.',
    icon: 'i-lucide-box',
  },
  {
    title: 'Network Permission Control',
    description: 'You can deny any app internet access entirely. Combined with a VPN, you control exactly what data leaves your device and to where.',
    icon: 'i-lucide-wifi-off',
  },
  {
    title: 'Hardened Memory',
    description: 'GrapheneOS uses a hardened memory allocator and kernel that makes exploit development significantly harder than stock Android or iOS — even compared to security-focused competitors.',
    icon: 'i-lucide-cpu',
  },
  {
    title: 'Auto-Relock & Duress PIN',
    description: 'Configure the phone to lock itself after inactivity or when powered off. A separate duress PIN can trigger a secure wipe if you\'re ever forced to unlock under duress.',
    icon: 'i-lucide-lock',
  },
  {
    title: 'Verified Boot',
    description: 'The bootloader is relocked after installation, so every boot is cryptographically verified against a known-good state. Tampered systems won\'t boot.',
    icon: 'i-lucide-shield-check',
  },
]

const recommendedApps = [
  {
    name: 'Signal',
    description: 'Encrypted messaging and calls. Replaces WhatsApp, iMessage, and SMS — with zero metadata collection.',
    icon: 'i-lucide-message-circle',
  },
  {
    name: 'Brave Browser',
    description: 'Chromium-based browser with built-in ad and tracker blocking. Faster than Chrome with none of the surveillance.',
    icon: 'i-lucide-globe',
  },
  {
    name: 'Bitwarden',
    description: 'Open-source password manager. Can be self-hosted on your UmbrelOS server for complete control over your vault.',
    icon: 'i-lucide-key-round',
  },
  {
    name: 'Organic Maps',
    description: 'Offline maps using OpenStreetMap data. Full navigation without sending your location to Google or Apple.',
    icon: 'i-lucide-map-pin',
  },
  {
    name: 'ProtonMail',
    description: 'End-to-end encrypted email from Switzerland. Significantly harder to intercept than Gmail or Outlook.',
    icon: 'i-lucide-mail',
  },
  {
    name: 'Mullvad VPN',
    description: 'No-logs VPN that doesn\'t require an email address to sign up. Pairs with GrapheneOS\'s per-app VPN routing.',
    icon: 'i-lucide-shield',
  },
]
</script>
