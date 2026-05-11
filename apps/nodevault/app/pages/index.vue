<template>
  <UPage>
    <UPageHero
      title="Data Protection for Small Businesses. Privacy for Everyone."
      description="NodeVault helps small businesses meet their GDPR obligations and store client data securely in the EU. We also help privacy-conscious individuals escape phone tracking and Big Tech surveillance. Same principle — whether you run a business or just value your own privacy."
      align="center">
      <template #links>
        <UButton
          to="/business"
          size="xl"
          icon="i-lucide-building-2">
          Small Businesses
        </UButton>

        <UButton
          to="/grapheneos"
          size="xl"
          icon="i-lucide-smartphone"
          variant="outline"
          color="neutral">
          GrapheneOS Phones
        </UButton>

        <UButton
          to="/umbrelos"
          size="xl"
          icon="i-lucide-server"
          variant="outline"
          color="neutral">
          UmbrelOS Servers
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Who NodeVault Is For"
      description="Three distinct offerings built on one principle: your data should be yours — not a US tech company's, not a government's, not a data broker's."
      align="center">
      <UPageGrid>
        <UPageCard
          title="Small Businesses"
          description="Therapists, solicitors, accountants, and GPs have legal GDPR obligations around the sensitive client data they hold. NodeVault gives you the tools to meet those obligations and the infrastructure to store that data compliantly — without an IT department."
          icon="i-lucide-building-2"
          to="/business" />

        <UPageCard
          title="GrapheneOS Phones"
          description="The most private Android experience available. We sell Google Pixel phones pre-installed with GrapheneOS — no telemetry, no Google account required, no background tracking. Your phone, under your control."
          icon="i-lucide-smartphone"
          to="/grapheneos" />

        <UPageCard
          title="UmbrelOS Home Servers"
          description="Replace Dropbox, Google Photos, and cloud subscriptions with apps you run at home on your own hardware. We design and configure your personal server so you can leave Big Tech behind for good."
          icon="i-lucide-server"
          to="/umbrelos" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      title="For Small Businesses"
      description="If your business handles client data — you have legal obligations under UK GDPR. Most small businesses are partially or fully non-compliant, not through neglect, but because nobody has mapped out where their client data actually goes."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="sector in sectors"
          :key="sector.title"
          :title="sector.title"
          :description="sector.description"
          :icon="sector.icon" />
      </UPageGrid>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <UCard
          v-for="offering in businessOfferings"
          :key="offering.title"
          class="flex flex-col gap-4 text-left p-6">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-10 rounded-xl bg-primary/10 shrink-0">
              <UIcon
                :name="offering.icon"
                class="size-5 text-primary" />
            </div>

            <h3 class="font-semibold">
              {{ offering.title }}
            </h3>
          </div>

          <p class="text-sm text-muted flex-1">
            {{ offering.description }}
          </p>

          <UButton
            :to="offering.href"
            variant="outline"
            color="neutral"
            size="sm"
            icon="i-lucide-arrow-right"
            trailing>
            {{ offering.cta }}
          </UButton>
        </UCard>
      </div>

      <div class="text-center mt-10">
        <UButton
          to="/business"
          size="lg"
          icon="i-lucide-arrow-right"
          trailing>
          See the Full Small Business Overview
        </UButton>
      </div>
    </UPageSection>

    <UPageSection
      title="Why This Matters Now"
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
useSeoMeta({
  title: 'NodeVault | GDPR Compliance for Practices & Privacy for Everyone',
  description: 'GDPR compliance tools and EU-hosted infrastructure for small businesses. GrapheneOS phones and UmbrelOS home servers for individuals who value privacy.',
  ogTitle: 'NodeVault | GDPR Compliance for Practices & Privacy for Everyone',
  ogDescription: 'Data protection for small businesses. Privacy tools for individuals. One platform built on the principle that your data should be yours.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'NodeVault | GDPR Compliance for Businesses & Privacy for Everyone',
  twitterDescription: 'GDPR compliance for therapists, solicitors, accountants, and GPs. GrapheneOS phones and UmbrelOS servers for individuals.',
  keywords: 'GDPR compliance small businesses, therapist GDPR, solicitor data protection, GrapheneOS, UmbrelOS, privacy phone UK, self-hosted home server, EU cloud storage',
})

const sectors = [
  {
    title: 'Therapists & Counsellors',
    description: 'Mental health records are special category data — the highest GDPR protection category. Most independent practitioners are using Gmail and Google Drive for client files without realising the compliance risk.',
    icon: 'i-lucide-heart-handshake',
  },
  {
    title: 'Solicitors & Legal Practices',
    description: 'The SRA expects documented cybersecurity practices from all firms. Client legal privilege depends on confidentiality — including digital confidentiality. Most 2–5 person practices have gaps they are unaware of.',
    icon: 'i-lucide-scale',
  },
  {
    title: 'Accountants & Financial Advisors',
    description: 'Client financial records and tax returns carry strict GDPR obligations. Sending documents over unencrypted email or storing them in US cloud services is one of the most common and overlooked exposures.',
    icon: 'i-lucide-chart-bar',
  },
  {
    title: 'Private Healthcare Providers',
    description: 'Private GPs and independent healthcare practitioners make their own IT decisions. All patient records are special category data, and the compliance bar is higher than most practitioners realise.',
    icon: 'i-lucide-stethoscope',
  },
]

const businessOfferings = [
  {
    title: 'GDPR Compliance Manager',
    icon: 'i-lucide-clipboard-check',
    href: '/auth/register',
    cta: 'Start Free',
    description: 'A self-serve tool that walks your practice through all eight UK GDPR obligations. Build your Record of Processing Activities, generate a privacy notice, track Subject Access Requests, and log data breaches — from a single dashboard.',
  },
  {
    title: 'Secure Cloud Infrastructure',
    icon: 'i-lucide-server',
    href: '/business/servers',
    cta: 'Learn More',
    description: 'We manage a GDPR-compliant stack of open source apps — Nextcloud, Vaultwarden, and more — on dedicated infrastructure in Germany. Replace US cloud services with EU-hosted alternatives under a signed Data Processing Agreement.',
  },
  {
    title: 'Secure Devices',
    icon: 'i-lucide-smartphone',
    href: '/business/phones',
    cta: 'Learn More',
    description: 'GrapheneOS phones pre-configured for professional use. No OS-level telemetry, no Google account required, encrypted storage by default. Available individually or as a small fleet for your whole team.',
  },
]

const reasons = [
  {
    title: 'GDPR Is Not Optional',
    description: 'UK GDPR applies to every practice that handles personal data — regardless of size. There is no minimum headcount exemption. Therapists, solicitors, and accountants have the same legal obligations as large organisations, with the same ICO enforcement risk.',
    icon: 'i-lucide-gavel',
  },
  {
    title: 'Your Cloud Is Someone Else\'s Server',
    description: 'Google Drive, Dropbox, and Microsoft 365 are US-headquartered companies subject to the CLOUD Act. Storing special category client data on US infrastructure creates GDPR exposure that is difficult to justify when EU alternatives exist.',
    icon: 'i-lucide-cloud-off',
  },
  {
    title: 'Your Phone Tracks Everything',
    description: 'Stock Android sends telemetry back to Google constantly. GrapheneOS eliminates this at the OS level — no Google Play Services, no location pings, no background data collection from the OS itself.',
    icon: 'i-lucide-eye-off',
  },
  {
    title: 'You Don\'t Need to Be Technical',
    description: 'The GDPR Compliance Manager guides you through everything step by step. We manage the cloud infrastructure. The phones arrive pre-configured. You don\'t need to understand the technology — just use it.',
    icon: 'i-lucide-wrench',
  },
]
</script>
