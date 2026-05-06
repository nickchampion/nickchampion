<template>
  <UPage>
    <UPageHero
      title="Privacy & Security for Small Businesses"
      description="The same surveillance risks that affect individuals affect your business — magnified. Customer data, financial records, internal communications, and team devices all deserve the same level of protection you'd expect from enterprise tools, without the enterprise price tag."
      align="center">
      <template #links>
        <UButton
          :to="`mailto:${config.contact.email}`"
          size="xl"
          icon="i-lucide-mail">
          Discuss Your Requirements
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
      title="Why Business Privacy Matters More Than Ever"
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
      id="services"
      title="Two Core Services"
      description="We bring the same tools used by privacy-conscious individuals to your business — configured for team use, multi-user access, and professional reliability."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <UCard
          v-for="service in services"
          :key="service.title"
          class="flex flex-col gap-5">
          <div class="flex items-start gap-4">
            <div class="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
              <UIcon
                :name="service.icon"
                class="size-6 text-primary" />
            </div>

            <div>
              <h3 class="font-semibold text-lg leading-snug">
                {{ service.title }}
              </h3>

              <p class="text-sm text-muted mt-1">
                {{ service.tagline }}
              </p>
            </div>
          </div>

          <p class="text-sm text-muted flex-1">
            {{ service.description }}
          </p>

          <ul class="space-y-2">
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
            block>
            Learn More
          </UButton>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      title="How We Work With Businesses"
      description="Every engagement starts with a conversation. No sales scripts, no upselling — just a clear assessment of what you need and a straightforward plan to get there."
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
          name="i-lucide-mail"
          class="size-10 text-primary mx-auto" />

        <h2 class="text-2xl font-bold">
          Ready to talk?
        </h2>

        <p class="text-muted">
          Tell us about your business, your current setup, and what you're trying to improve.
          We'll come back with a clear, jargon-free plan.
        </p>

        <UButton
          :to="`mailto:${config.contact.email}`"
          size="xl"
          icon="i-lucide-arrow-right"
          trailing>
          Get in Touch
        </UButton>
      </UCard>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy & Security for Small Businesses | NodeVault',
  description: 'Secure phones and self-hosted server infrastructure for businesses. GrapheneOS device fleets, team file sharing, shared password management, and GDPR-compliant data handling.',
  ogTitle: 'Privacy & Security for Small Businesses | NodeVault',
  ogDescription: 'Enterprise-grade privacy without the enterprise price tag. GrapheneOS devices and self-hosted infrastructure for your team.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Privacy & Security for Small Businesses | NodeVault',
  twitterDescription: 'GrapheneOS phone fleets and self-hosted infrastructure for businesses that take data security seriously.',
  keywords: 'business privacy, GrapheneOS business, self-hosted business server, GDPR compliance, private business infrastructure, secure business phones, small business cybersecurity',
})

const config = useConfig()
const reasons = [
  {
    title: 'Your Business Data Is at Risk',
    description: 'Customer records, financial documents, and internal communications stored in Google Workspace or Microsoft 365 are accessible to those companies and any jurisdiction they operate in.',
    icon: 'i-lucide-database',
  },
  {
    title: 'Staff Phones Are Attack Vectors',
    description: 'Standard Android phones with factory settings continuously leak data and are vulnerable to a range of exploits. Every unmanaged device in your team is a potential entry point.',
    icon: 'i-lucide-smartphone',
  },
  {
    title: 'Compliance Is Getting Harder',
    description: 'GDPR and emerging data sovereignty regulations increasingly require businesses to demonstrate where data is stored and who has access. Self-hosted infrastructure gives you a clear, defensible answer.',
    icon: 'i-lucide-scale',
  },
  {
    title: 'Enterprise Tools Are Overpriced',
    description: 'You don\'t need a £50/user/month SaaS stack to get enterprise-grade security. Open-source tools running on your hardware deliver the same capabilities at a fraction of the ongoing cost.',
    icon: 'i-lucide-piggy-bank',
  },
]

const services = [
  {
    title: 'Business Server Infrastructure',
    tagline: 'Self-hosted apps for your whole team',
    icon: 'i-lucide-server',
    href: '/business/servers',
    description: 'Replace cloud subscriptions with a self-hosted business server running on UmbrelOS. File sharing, password management, communications, project tracking — all on infrastructure you own and control.',
    points: [
      'Nextcloud for team file sharing, documents, and calendars',
      'Vaultwarden for shared business password management',
      'Self-hosted email and internal communications',
      'Uptime monitoring and automated backups configured',
      'Remote access for your whole team via WireGuard VPN',
    ],
  },
  {
    title: 'Business Phone Fleet',
    tagline: 'Secure devices for your whole team',
    icon: 'i-lucide-smartphone',
    href: '/business/phones',
    description: 'Deploy GrapheneOS across your team\'s devices with consistent security policies, managed app configurations, and verified boot across every handset. Purpose-built for professional use.',
    points: [
      'Bulk provisioning for teams of any size',
      'Consistent security policies across all devices',
      'Sandboxed Google Play where business apps require it',
      'Pre-configured with your business communication tools',
      'Ongoing device management and support available',
    ],
  },
]

const process = [
  {
    title: 'Discovery Call',
    description: 'A free call to understand your team size, current tools, pain points, and goals. No commitment required.',
  },
  {
    title: 'Requirements Assessment',
    description: 'We map your current software against self-hosted equivalents and identify exactly what infrastructure you\'d need.',
  },
  {
    title: 'Deployment Plan',
    description: 'A clear proposal covering hardware, software stack, migration steps, and timeline — written in plain English.',
  },
  {
    title: 'Setup & Handover',
    description: 'We handle full installation and configuration, then train your team so everyone is confident from day one.',
  },
]
</script>
