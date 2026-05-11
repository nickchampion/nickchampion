<template>
  <UPage>
    <UPageHero
      title="Everything a Small Practice Needs to Handle Client Data Safely"
      description="Therapists, solicitors, accountants, and GPs handle some of the most sensitive personal data in existence. NodeVault gives you the tools to stay GDPR compliant, store client data securely, and protect your devices — without needing an IT department or a consultant on retainer."
      align="center">
      <template #links>
        <UButton
          to="/auth/register"
          size="xl"
          icon="i-lucide-layout-dashboard">
          Get Started Free
        </UButton>

        <UButton
          to="#services"
          size="xl"
          icon="i-lucide-chevron-down"
          variant="outline"
          color="neutral">
          See What We Offer
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Who We Work With"
      description="We specialise in small professional practices that handle sensitive client data and have regulatory obligations around how it is stored and protected."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="sector in sectors"
          :key="sector.title"
          :title="sector.title"
          :description="sector.description"
          :icon="sector.icon" />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="services"
      title="Three Tools. One Platform."
      description="Every service is designed to be self-serve — sign up, work through it at your own pace, and get what you need without a sales call or a consultant."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <UCard
          v-for="service in services"
          :key="service.title"
          class="flex flex-col gap-5 text-left">
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
              <UIcon
                :name="service.icon"
                class="size-6 text-primary" />
            </div>

            <div>
              <h3 class="font-semibold text-lg leading-snug">
                {{ service.title }}
              </h3>

              <p class="text-sm text-muted mt-0.5">
                {{ service.tagline }}
              </p>
            </div>
          </div>

          <p class="text-sm text-muted flex-1 my-4">
            {{ service.description }}
          </p>

          <ul class="space-y-2 mt-2">
            <li
              v-for="point in service.points"
              :key="point"
              class="flex items-start gap-2 text-sm">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-primary shrink-0 mt-0.5" />

              <span>{{ point }}</span>
            </li>
          </ul>

          <UButton
            :to="service.href"
            variant="outline"
            color="neutral"
            icon="i-lucide-arrow-right"
            trailing
            class="mt-2"
            block>
            {{ service.cta }}
          </UButton>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      title="Your GDPR Obligations at a Glance"
      description="UK GDPR applies to every practice that handles personal data — regardless of size. These are the eight legal requirements every practice must meet. No minimum headcount, no exceptions."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="obligation in gdprSummary"
          :key="obligation.title"
          :title="obligation.title"
          :description="obligation.description"
          :icon="obligation.icon" />
      </UPageGrid>

      <div class="text-center mt-10">
        <UButton
          to="/gdpr"
          size="lg"
          variant="outline"
          color="neutral"
          icon="i-lucide-arrow-right"
          trailing>
          Read the Full UK GDPR Guide
        </UButton>
      </div>
    </UPageSection>

    <UPageSection
      title="How It Works"
      description="Self-serve from start to finish. No waiting for a call back, no lengthy onboarding — sign up and start making progress immediately."
      align="center">
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <div
          v-for="(step, index) in process"
          :key="step.title"
          class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
              {{ index + 1 }}
            </div>

            <h3 class="font-semibold text-sm">
              {{ step.title }}
            </h3>
          </div>

          <p class="text-sm text-muted pl-11">
            {{ step.description }}
          </p>
        </div>
      </div>
    </UPageSection>

    <UPageSection align="center">
      <UCard class="max-w-2xl mx-auto text-center p-8 space-y-4">
        <UIcon
          name="i-lucide-layout-dashboard"
          class="size-10 text-primary mx-auto" />

        <h2 class="text-2xl font-bold">
          Ready to get started?
        </h2>

        <p class="text-muted">
          Create your account and start building your GDPR compliance picture today. No commitment, no sales call — just the tools your practice needs, at your own pace.
        </p>

        <div class="flex items-center justify-center gap-3 flex-wrap">
          <UButton
            to="/auth/register"
            size="xl"
            icon="i-lucide-arrow-right"
            trailing>
            Create Free Account
          </UButton>

          <UButton
            :to="`mailto:${config.contact.email}`"
            size="xl"
            variant="outline"
            color="neutral"
            icon="i-lucide-mail">
            Ask a Question
          </UButton>
        </div>
      </UCard>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'GDPR Compliance & Secure Infrastructure for Small Practices | NodeVault',
  description: 'Self-serve GDPR compliance tools, EU-hosted secure infrastructure, and privacy-hardened devices for therapists, solicitors, accountants, and GPs. No IT department needed.',
  ogTitle: 'GDPR Compliance & Secure Infrastructure for Small Practices | NodeVault',
  ogDescription: 'Everything a small professional practice needs to handle client data safely. GDPR tools, secure infrastructure, and hardened devices.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'GDPR Compliance & Secure Infrastructure for Small Practices | NodeVault',
  twitterDescription: 'Self-serve GDPR compliance and secure infrastructure for therapists, solicitors, accountants, and GPs.',
  keywords: 'GDPR compliance small practice, therapist GDPR, solicitor data protection, accountant GDPR, self-serve GDPR tool, UK GDPR, ICO compliance, secure infrastructure small business',
})

const config = useConfig()

const sectors = [
  {
    title: 'Therapists & Counsellors',
    description: 'Mental health records are special category data — the highest protection category under UK GDPR. BACP and UKCP registered practitioners have professional obligations around confidentiality that extend directly to how digital data is stored and protected.',
    icon: 'i-lucide-heart-handshake',
  },
  {
    title: 'Solicitors & Legal Practices',
    description: 'The SRA expects small law firms to have documented cybersecurity and data protection practices. Client legal privilege depends on confidentiality — including digital confidentiality. Most 2–5 person firms have significant gaps they are unaware of.',
    icon: 'i-lucide-scale',
  },
  {
    title: 'Accountants & Financial Advisors',
    description: 'Client financial records, tax returns, and bank statements are personal data with strict protection obligations under GDPR and ICAEW/ACCA guidance. Sending financial documents over unencrypted email is one of the most common and overlooked exposures.',
    icon: 'i-lucide-chart-bar',
  },
  {
    title: 'Private Healthcare Providers',
    description: 'Private GPs, occupational health providers, and independent practitioners make their own IT decisions — unlike NHS counterparts. All patient records are special category data, carrying the highest compliance requirements and breach consequences.',
    icon: 'i-lucide-stethoscope',
  },
]

const services = [
  {
    title: 'GDPR Compliance Manager',
    tagline: 'Self-serve compliance for your practice',
    icon: 'i-lucide-clipboard-check',
    href: '/auth/register',
    cta: 'Start Free',
    description: 'A guided tool that walks you through your UK GDPR obligations step by step — no jargon, no consultant required. Build your compliance record, generate the documents the law requires, and keep everything up to date from a single dashboard.',
    points: [
      'Record of Processing Activities (ROPA) builder',
      'Privacy notice generator tailored to your practice type',
      'Subject Access Request tracker with 30-day deadline alerts',
      'Data breach incident log and notification guidance',
      'Annual review reminders to keep your compliance current',
      'Support available if you get stuck',
    ],
  },
  {
    title: 'Secure Cloud Infrastructure',
    tagline: 'Managed for you. Hosted in the EU.',
    icon: 'i-lucide-server',
    href: '/business/servers',
    cta: 'Learn More',
    description: 'We run a managed stack of open source applications — Nextcloud, Vaultwarden, and more — on dedicated cloud infrastructure in Germany. You get secure file storage, password management, and document sharing without any US cloud exposure. We handle everything; you just use it.',
    points: [
      'Hosted on Hetzner, Germany — EU jurisdiction, no CLOUD Act risk',
      'Signed Data Processing Agreement included as standard',
      'Nextcloud for file storage, calendars, documents, and messaging',
      'Vaultwarden for encrypted practice-wide password management',
      'Daily encrypted backups, uptime monitoring, SSL — all managed',
    ],
  },
  {
    title: 'Secure Devices',
    tagline: 'Hardened phones for professional use',
    icon: 'i-lucide-smartphone',
    href: '/business/phones',
    cta: 'Learn More',
    description: 'GrapheneOS phones eliminate the telemetry and background data collection that creates unintended GDPR processing. Pre-configured for professional use with no Google account required and no third-party tracking at the OS level.',
    points: [
      'Google Pixel with GrapheneOS pre-installed and hardened',
      'No OS-level telemetry or location tracking',
      'Encrypted storage on by default',
      'Pre-configured with your preferred communication tools',
      'Individual or small fleet provisioning available',
    ],
  },
]

const gdprSummary = [
  {
    title: 'ICO Registration',
    description: 'Almost all practices that process personal data must register with the ICO and pay an annual fee. Failure to register is a criminal offence — not a civil matter.',
    icon: 'i-lucide-badge-check',
  },
  {
    title: 'Record of Processing Activities',
    description: 'A written record of all personal data you hold, why you hold it, where it is stored, and how long you keep it. Mandatory for any practice processing special category data.',
    icon: 'i-lucide-file-text',
  },
  {
    title: 'Privacy Notice',
    description: 'A clear, plain English notice given to clients at the point their data is collected. A privacy policy buried in your website footer is not sufficient on its own.',
    icon: 'i-lucide-scroll-text',
  },
  {
    title: 'Lawful Basis for Processing',
    description: 'Every processing activity must have a documented legal basis before it begins. For special category data, an additional Article 9 condition is required.',
    icon: 'i-lucide-gavel',
  },
  {
    title: 'Data Processing Agreements',
    description: 'A signed agreement is required with every third-party that processes data on your behalf — your cloud provider, email service, and practice management software.',
    icon: 'i-lucide-handshake',
  },
  {
    title: 'Subject Access Requests',
    description: 'Any client can request all data you hold about them. You must respond within one calendar month, free of charge, providing a full copy of their personal data.',
    icon: 'i-lucide-user-search',
  },
  {
    title: 'Breach Notification',
    description: 'A reportable data breach must be notified to the ICO within 72 hours. You must document all breaches, including those that fall below the reporting threshold.',
    icon: 'i-lucide-siren',
  },
  {
    title: 'Data Retention Policy',
    description: 'Personal data must not be kept longer than necessary. You need documented retention periods for every data category and a process for securely deleting data when those periods expire.',
    icon: 'i-lucide-clock',
  },
]

const process = [
  {
    title: 'Create Your Account',
    description: 'Sign up in under a minute. No credit card required to get started — begin your compliance assessment immediately.',
  },
  {
    title: 'Complete Your Assessment',
    description: 'Answer guided questions about your practice, the data you hold, and the tools you use. Work through it at your own pace, section by section.',
  },
  {
    title: 'Get Your Documents',
    description: 'Your ROPA, privacy notice, and prioritised action plan are generated automatically. Download them, publish them, and tick the box.',
  },
  {
    title: 'Stay Compliant',
    description: 'Use your dashboard to track Subject Access Requests, log incidents, and receive annual review reminders. Compliance is not a one-off task — your dashboard keeps you on top of it.',
  },
]
</script>
