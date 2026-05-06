<template>
  <UPage>
    <UPageHero
      title="Business Server Infrastructure"
      description="Replace your cloud subscriptions with a self-hosted server your business actually owns. Team file sharing, shared password management, internal communications, and more — on hardware in your office, with no per-seat SaaS fees."
      align="center">
      <template #links>
        <UButton
          :to="`mailto:${config.contact.email}`"
          size="xl"
          icon="i-lucide-mail">
          Discuss Your Requirements
        </UButton>

        <UButton
          to="/business"
          size="xl"
          icon="i-lucide-arrow-left"
          variant="outline"
          color="neutral">
          Back to Business Overview
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="What We Set Up For You"
      description="Every deployment is built around your team's actual needs. These are the building blocks — we configure the combination that makes sense for your business."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="service in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :icon="service.icon" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="Why Self-Host Instead of SaaS?"
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div
          v-for="comparison in comparisons"
          :key="comparison.aspect"
          class="flex items-start gap-4 p-4 rounded-xl border border-default">
          <UIcon
            :name="comparison.icon"
            class="size-5 text-primary shrink-0 mt-0.5" />

          <div>
            <p class="font-semibold text-sm">{{ comparison.aspect }}</p>

            <p class="text-sm text-muted mt-1">{{ comparison.detail }}</p>
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      title="Suitable For All Business Sizes"
      description="UmbrelOS scales from a single-person consultancy to a 50-seat office. The hardware footprint is small; the capability isn't."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <UCard
          v-for="size in businessSizes"
          :key="size.label"
          class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0">
              <UIcon
                :name="size.icon"
                class="size-5 text-primary" />
            </div>

            <div>
              <h3 class="font-semibold">{{ size.label }}</h3>

              <p class="text-xs text-muted">{{ size.teamSize }}</p>
            </div>
          </div>

          <p class="text-sm text-muted flex-1">{{ size.description }}</p>

          <ul class="space-y-1.5">
            <li
              v-for="item in size.typical"
              :key="item"
              class="flex items-start gap-2 text-sm">
              <UIcon
                name="i-lucide-check"
                class="size-4 text-primary shrink-0 mt-0.5" />

              <span>{{ item }}</span>
            </li>
          </ul>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection align="center">
      <UCard class="max-w-2xl mx-auto text-center p-8 space-y-4">
        <UIcon
          name="i-lucide-mail"
          class="size-10 text-primary mx-auto" />

        <h2 class="text-2xl font-bold">Get in touch to discuss your setup</h2>

        <p class="text-muted">
          Tell us about your team, what tools you're currently using, and what you want to change.
          We'll come back with a clear, costed proposal.
        </p>

        <UButton
          :to="`mailto:${config.contact.email}`"
          size="xl"
          icon="i-lucide-arrow-right"
          trailing>
          Start the Conversation
        </UButton>
      </UCard>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
import { useConfig } from '@nodevault/platform.components.configuration.client'

useSeoMeta({
  title: 'Business Self-Hosted Server Infrastructure | NodeVault',
  description: 'Replace SaaS subscriptions with self-hosted infrastructure your business owns. Team file sharing, shared passwords, collaborative documents, and secure remote access via WireGuard.',
  ogTitle: 'Business Self-Hosted Server Infrastructure | NodeVault',
  ogDescription: 'Nextcloud, Vaultwarden, and WireGuard on hardware you own. Replace cloud subscriptions with infrastructure that pays for itself.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Business Self-Hosted Server Infrastructure | NodeVault',
  twitterDescription: 'Ditch SaaS subscriptions. Own your business infrastructure — file sharing, passwords, and remote access on your hardware.',
  keywords: 'self-hosted business server, Nextcloud business, Vaultwarden business, GDPR compliant infrastructure, business home server, WireGuard business VPN, replace Google Workspace',
})

const config = useConfig()
const services = [
  {
    title: 'Team File Storage',
    description: 'Nextcloud configured for your team with shared folders, per-user storage, and automatic backup from laptops and phones. A full Dropbox/Google Drive replacement on hardware you own.',
    icon: 'i-lucide-folder-open',
  },
  {
    title: 'Shared Password Management',
    description: 'Vaultwarden with business organisations and collections. Share credentials securely between team members with role-based access — no more passwords in Slack or spreadsheets.',
    icon: 'i-lucide-key-round',
  },
  {
    title: 'Collaborative Documents',
    description: 'Nextcloud Office for real-time collaborative editing of spreadsheets, documents, and presentations. Full compatibility with Microsoft Office formats — no Google account required.',
    icon: 'i-lucide-file-text',
  },
  {
    title: 'Team Calendar & Contacts',
    description: 'CalDAV and CardDAV via Nextcloud. Every team member\'s calendar and contacts synced privately — replaces Google Calendar and Google Contacts across all devices.',
    icon: 'i-lucide-calendar',
  },
  {
    title: 'Network Security',
    description: 'Pi-hole or AdGuard Home installed as your office DNS resolver. Ads, trackers, and malware domains blocked across every device on the network — no software installs required.',
    icon: 'i-lucide-shield',
  },
  {
    title: 'Secure Remote Access',
    description: 'WireGuard VPN configured so remote and hybrid workers can securely access every office resource from anywhere. Faster and more private than commercial VPN services.',
    icon: 'i-lucide-lock',
  },
  {
    title: 'Document Management',
    description: 'Paperless-ngx for scanning, OCR, and organising business documents. Every invoice, contract, and receipt becomes full-text searchable and automatically tagged.',
    icon: 'i-lucide-archive',
  },
  {
    title: 'Monitoring & Uptime',
    description: 'Uptime Kuma configured to monitor your services and alert you the moment anything goes down. Status dashboards, response time graphs, and TLS certificate expiry alerts.',
    icon: 'i-lucide-activity',
  },
]

const comparisons = [
  {
    aspect: 'Data ownership',
    icon: 'i-lucide-database',
    detail: 'Your files, passwords, and communications never leave your premises. No third-party access, no jurisdiction risk, no data breach at a SaaS vendor affecting you.',
  },
  {
    aspect: 'Cost at scale',
    icon: 'i-lucide-piggy-bank',
    detail: 'SaaS tools charge per seat, per month, forever. A self-hosted server has a one-time setup cost and minimal ongoing running costs — the more team members, the bigger the saving.',
  },
  {
    aspect: 'GDPR compliance',
    icon: 'i-lucide-scale',
    detail: 'You can answer "where is customer data stored?" with a precise, verifiable answer. Self-hosted infrastructure gives you complete control over data residency and access logs.',
  },
  {
    aspect: 'No vendor lock-in',
    icon: 'i-lucide-unlink',
    detail: 'Open-source software with open data formats means you\'re never trapped. Your files are always yours — no export limits, no account suspension, no service discontinuation.',
  },
  {
    aspect: 'Reliability',
    icon: 'i-lucide-wifi',
    detail: 'Core services like file access and password management continue to work even when your internet is down. LAN-local access is always available regardless of upstream connectivity.',
  },
  {
    aspect: 'Customisation',
    icon: 'i-lucide-settings',
    detail: 'Every aspect of the stack is configurable to your workflow. Unlike SaaS tools, there\'s no "we can\'t do that" — the software is open and the configuration is yours.',
  },
]

const businessSizes = [
  {
    label: 'Solo & Freelance',
    teamSize: '1–3 people',
    icon: 'i-lucide-user',
    description: 'A compact NUC or mini PC is all you need. Full file sync, password management, and remote access for a fraction of ongoing subscription costs.',
    typical: [
      'Nextcloud for files and calendar',
      'Vaultwarden for passwords',
      'WireGuard for remote access',
      'Runs on any spare mini PC',
    ],
  },
  {
    label: 'Small Team',
    teamSize: '4–15 people',
    icon: 'i-lucide-users',
    description: 'A dedicated server with redundant storage handles the full team stack. Multi-user Nextcloud, shared vaults, network-wide DNS filtering, and monitored uptime.',
    typical: [
      'Full Nextcloud with team folders',
      'Vaultwarden with shared collections',
      'Pi-hole for network protection',
      'Uptime Kuma monitoring',
      'Remote access for hybrid workers',
    ],
  },
  {
    label: 'Growing Business',
    teamSize: '15–50 people',
    icon: 'i-lucide-building-2',
    description: 'Rackmount or enterprise-grade mini server with RAID storage and a proper network architecture. VLAN segmentation, high-availability configuration, and full offsite backup.',
    typical: [
      'VLAN-segmented network architecture',
      'RAID storage with offsite backup',
      'Full document management (Paperless-ngx)',
      'High-availability server configuration',
      'Dedicated monitoring and alerting',
    ],
  },
]
</script>
