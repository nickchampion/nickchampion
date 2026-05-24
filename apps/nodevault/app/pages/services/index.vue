<template>
  <UPage>
    <UPageHero
      title="Setup Services"
      description="We install and configure your privacy tools — you just use them. No tutorials, no trial and error. Send us your device, or we'll source what you need and ship it ready to go."
      align="center">
      <template #links>
        <UButton
          to="/company/contact"
          size="xl"
          icon="i-lucide-mail">
          Get in Touch
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Individual Services"
      description="Each service is available on its own, or bundle all three with the Gold Package below."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <UCard
          v-for="service in services"
          :key="service.title">
          <div class="flex flex-col gap-5 h-full">
            <div class="flex items-start gap-4">
              <div class="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <UIcon
                  :name="service.icon"
                  class="size-6 text-primary" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-semibold text-lg leading-tight">
                    {{ service.title }}
                  </h3>

                  <UBadge
                    v-if="service.optional"
                    color="neutral"
                    variant="subtle"
                    size="xs"
                    label="Optional" />
                </div>

                <p class="text-3xl font-bold mt-1">
                  {{ service.price }}
                </p>
              </div>
            </div>

            <p class="text-sm text-muted">
              {{ service.description }}
            </p>

            <ul class="space-y-2 text-left border-t border-(--ui-border) pt-4 flex-1">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-start gap-2 text-sm">
                <UIcon
                  name="i-lucide-check"
                  class="size-4 text-primary shrink-0 mt-0.5" />

                <span>{{ feature }}</span>
              </li>
            </ul>

            <p
              v-if="service.addon"
              class="text-xs text-muted border-t border-(--ui-border) pt-3 text-left">
              <UIcon
                name="i-lucide-plus-circle"
                class="size-3 inline mr-1 shrink-0" />{{ service.addon }}
            </p>

            <p
              v-if="service.note"
              class="text-xs text-muted text-left">
              {{ service.note }}
            </p>

            <UButton
              to="/company/contact"
              variant="outline"
              color="neutral"
              icon="i-lucide-arrow-right"
              trailing
              block
              @click="trackServiceCta(service.title, service.price)">
              {{ service.cta }}
            </UButton>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UDivider class="my-4" />

    <UPageSection
      title="The Gold Package"
      description="All three services in one. GrapheneOS on your phone, UmbrelOS on your server, and an OPNSense router shipped ready to plug in."
      align="center">
      <UCard class="max-w-3xl mx-auto ring-2 ring-primary mt-4">
        <div class="flex flex-col gap-6">
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <UIcon
                  name="i-lucide-package"
                  class="size-6 text-primary" />
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-xl font-bold">
                    Gold Package
                  </h3>

                  <UBadge
                    color="primary"
                    variant="subtle"
                    label="Best value" />
                </div>

                <p class="text-sm text-muted mt-0.5">
                  Phone and server hardware provided by you — router sourced and shipped by NodeVault.
                </p>
              </div>
            </div>

            <p class="text-4xl font-bold shrink-0">
              £600
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-(--ui-border) pt-6">
            <div
              v-for="section in goldSections"
              :key="section.title">
              <p class="font-semibold text-sm mb-3 flex items-center gap-2">
                <UIcon
                  :name="section.icon"
                  class="size-4 text-primary" />

                {{ section.title }}
              </p>

              <ul class="space-y-1.5 text-left">
                <li
                  v-for="item in section.items"
                  :key="item"
                  class="flex items-start gap-2 text-sm text-muted">
                  <UIcon
                    name="i-lucide-check"
                    class="size-3.5 text-primary shrink-0 mt-0.5" />

                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <UButton
            to="/company/contact"
            size="lg"
            icon="i-lucide-arrow-right"
            trailing
            block
            @click="trackServiceCta('Gold Package', '£600')">
            Book the Gold Package
          </UButton>
        </div>
      </UCard>
    </UPageSection>

    <UDivider class="my-4" />

    <UPageSection
      title="Ongoing Support"
      description="Stay covered after setup — for £10 a month you always have someone to turn to."
      align="center">
      <UCard class="max-w-2xl mx-auto mt-4">
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <div class="flex items-center justify-center size-16 rounded-xl bg-primary/10 shrink-0">
            <UIcon
              name="i-lucide-life-buoy"
              class="size-8 text-primary" />
          </div>

          <div class="flex flex-col gap-4 flex-1">
            <div>
              <p class="text-3xl font-bold">
                £10 <span class="text-base font-normal text-muted">/ month</span>
              </p>

              <p class="text-sm text-muted mt-1">
                Priority email support, help with anything that breaks or changes, and advice on new tools. Cancel any time.
              </p>
            </div>

            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              <li
                v-for="item in supportFeatures"
                :key="item"
                class="flex items-start gap-2 text-sm">
                <UIcon
                  name="i-lucide-check"
                  class="size-4 text-primary shrink-0 mt-0.5" />

                <span>{{ item }}</span>
              </li>
            </ul>

            <UButton
              to="/company/contact"
              variant="outline"
              color="neutral"
              icon="i-lucide-arrow-right"
              trailing
              class="self-start"
              @click="trackServiceCta('Support Subscription', '£10/month')">
              Add Ongoing Support
            </UButton>
          </div>
        </div>
      </UCard>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
const posthog = usePostHog()

const trackServiceCta = (service: string, price: string) => {
  posthog?.capture('service_cta_clicked', { service, price })
}

useSeoMeta({
  title: 'Setup Services | NodeVault',
  description: 'Hands-on privacy setup services. GrapheneOS installation, UmbrelOS home server setup, and OPNSense router — configured and ready to use. From £100.',
  ogTitle: 'Privacy Setup Services | NodeVault',
  ogDescription: 'GrapheneOS phone setup, UmbrelOS home server installation, and OPNSense router configuration. We handle everything — you just use it.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  keywords: 'privacy setup service UK, GrapheneOS installation UK, UmbrelOS setup service, OPNSense router setup, home network privacy setup',
})

const services = [
  {
    title: 'GrapheneOS Setup',
    icon: 'i-lucide-smartphone',
    price: '£100',
    optional: false,
    description: 'Send us your compatible Google Pixel and we\'ll install GrapheneOS, apply security hardening, and set up to 10 apps of your choice — then hand it back ready to use.',
    features: [
      'GrapheneOS installation with bootloader relocked',
      'Security hardening applied out of the box',
      'Up to 10 apps installed to your specification',
      'Apps chosen during the booking process',
      '20-minute handover session',
      '1 month email support',
    ],
    note: 'Compatible with Google Pixel 6 through Pixel 10. You supply the phone.',
    addon: null,
    cta: 'Book GrapheneOS Setup',
  },
  {
    title: 'UmbrelOS Setup',
    icon: 'i-lucide-server',
    price: '£100',
    optional: true,
    description: 'UmbrelOS is genuinely easy to set up yourself — but if you\'d like us to handle it and walk you through everything, we\'re happy to.',
    features: [
      'UmbrelOS installation (if not already set up)',
      'Up to 10 apps installed and configured',
      'Apps chosen during the booking process',
      '20-minute handover session',
      '1 month email support',
    ],
    note: 'You\'ll need to have purchased your server hardware before booking. We recommend a Raspberry Pi 5.',
    addon: null,
    cta: 'Book UmbrelOS Setup',
  },
  {
    title: 'OPNSense Router',
    icon: 'i-lucide-shield-check',
    price: '£300',
    optional: false,
    description: 'We source the hardware, install OPNSense, configure AdGuard Home, WireGuard VPN, and VLAN isolation — then ship it to you ready to plug in. No setup required on your end.',
    features: [
      'Router hardware sourced by NodeVault',
      'OPNSense installed and configured',
      'AdGuard Home — network-wide ad and tracker blocking',
      'WireGuard VPN gateway',
      'VLAN isolation for IoT and trusted devices',
      '1 Wi-Fi access point included',
      'Shipped ready to plug in',
      '20-minute handover session',
      '2 months email support',
    ],
    note: null,
    addon: 'Additional access points £100 each — ideal for larger homes.',
    cta: 'Order a Router',
  },
]

const goldSections = [
  {
    title: 'GrapheneOS Phone',
    icon: 'i-lucide-smartphone',
    items: [
      'GrapheneOS installed and hardened',
      'Up to 10 apps to your spec',
      '20-minute handover',
      '1 month email support',
    ],
  },
  {
    title: 'UmbrelOS Server',
    icon: 'i-lucide-server',
    items: [
      'UmbrelOS installed and configured',
      'Up to 10 apps to your spec',
      '20-minute handover',
      '1 month email support',
    ],
  },
  {
    title: 'OPNSense Router',
    icon: 'i-lucide-shield-check',
    items: [
      'Hardware sourced and built by NodeVault',
      'AdGuard, WireGuard & VLANs configured',
      '1 access point included',
      'Shipped ready to plug in',
      '20-minute handover',
      '2 months email support',
    ],
  },
]

const supportFeatures = [
  'Priority email support',
  'Help with app updates and changes',
  'Advice on new privacy tools',
  'Troubleshooting and guidance',
  'Cancel any time',
]
</script>
