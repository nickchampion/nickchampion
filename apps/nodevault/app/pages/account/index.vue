<template>
  <div class="p-6 space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">
          GDPR Compliance Dashboard
        </h1>

        <p class="text-sm text-muted mt-0.5">
          Track your practice's compliance with UK GDPR obligations
        </p>
      </div>

      <UBadge
        :color="completedCount === obligations.length ? 'success' : 'warning'"
        variant="subtle"
        size="lg">
        {{ completedCount }} of {{ obligations.length }} obligations complete
      </UBadge>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard
        v-for="stat in stats"
        :key="stat.label"
        class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted">{{ stat.label }}</span>

          <UIcon
            :name="stat.icon"
            class="size-4 text-muted" />
        </div>

        <p class="text-2xl font-bold tracking-tight">
          {{ stat.value }}
        </p>

        <p class="text-xs text-muted">
          {{ stat.description }}
        </p>
      </UCard>
    </div>

    <div>
      <h2 class="text-base font-semibold mb-4">
        Your Obligations
      </h2>

      <div class="space-y-3">
        <UCard
          v-for="obligation in obligations"
          :key="obligation.title"
          class="transition-colors">
          <div class="flex items-start gap-4">
            <div
              :class="obligation.complete ? 'bg-primary/10' : 'bg-muted/30'"
              class="flex items-center justify-center size-9 rounded-lg shrink-0 mt-0.5">
              <UIcon
                :name="obligation.complete ? 'i-lucide-check-circle' : obligation.icon"
                :class="obligation.complete ? 'text-primary' : 'text-muted'"
                class="size-4" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="font-medium text-sm">
                  {{ obligation.title }}
                </p>

                <UBadge
                  v-if="obligation.complete"
                  color="success"
                  variant="subtle"
                  size="xs">
                  Complete
                </UBadge>

                <UBadge
                  v-else-if="obligation.required"
                  color="error"
                  variant="subtle"
                  size="xs">
                  Action needed
                </UBadge>

                <UBadge
                  v-else
                  color="neutral"
                  variant="subtle"
                  size="xs">
                  Not started
                </UBadge>
              </div>

              <p class="text-xs text-muted mt-1">
                {{ obligation.description }}
              </p>

              <p class="text-xs font-mono text-primary/70 mt-0.5">
                {{ obligation.article }}
              </p>
            </div>

            <UButton
              :label="obligation.complete ? 'Review' : 'Start'"
              :variant="obligation.complete ? 'ghost' : 'outline'"
              color="neutral"
              size="xs"
              icon="i-lucide-arrow-right"
              trailing
              class="shrink-0" />
          </div>
        </UCard>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UCard>
        <template #header>
          <p class="font-semibold text-sm">
            Upcoming Reminders
          </p>
        </template>

        <div class="space-y-3">
          <div
            v-for="reminder in reminders"
            :key="reminder.title"
            class="flex items-start gap-3">
            <UIcon
              :name="reminder.icon"
              class="size-4 text-muted shrink-0 mt-0.5" />

            <div>
              <p class="text-sm font-medium">
                {{ reminder.title }}
              </p>

              <p class="text-xs text-muted">
                {{ reminder.due }}
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <p class="font-semibold text-sm">
            Quick Actions
          </p>
        </template>

        <div class="space-y-2">
          <UButton
            v-for="action in quickActions"
            :key="action.label"
            :icon="action.icon"
            :label="action.label"
            variant="ghost"
            color="neutral"
            size="sm"
            class="w-full justify-start" />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const obligations = [
  {
    title: 'ICO Registration',
    article: 'Data Protection Act 2018, s.62',
    icon: 'i-lucide-badge-check',
    description: 'Register your practice with the ICO and pay the annual data protection fee.',
    complete: false,
    required: true,
  },
  {
    title: 'Record of Processing Activities (ROPA)',
    article: 'UK GDPR Article 30',
    icon: 'i-lucide-file-text',
    description: 'Document all personal data you hold, why you hold it, where it is stored, and how long you keep it.',
    complete: false,
    required: true,
  },
  {
    title: 'Privacy Notice',
    article: 'UK GDPR Articles 13 & 14',
    icon: 'i-lucide-scroll-text',
    description: 'Provide clients with a clear notice at the point their data is collected.',
    complete: false,
    required: true,
  },
  {
    title: 'Lawful Basis for Processing',
    article: 'UK GDPR Article 6 & Article 9',
    icon: 'i-lucide-gavel',
    description: 'Identify and document a lawful basis for every processing activity before it begins.',
    complete: false,
    required: false,
  },
  {
    title: 'Data Processing Agreements',
    article: 'UK GDPR Article 28',
    icon: 'i-lucide-handshake',
    description: 'Signed DPAs in place with every third-party processor (cloud storage, email, practice software).',
    complete: false,
    required: false,
  },
  {
    title: 'Subject Access Request Process',
    article: 'UK GDPR Article 15',
    icon: 'i-lucide-user-search',
    description: 'A documented process to handle SARs within the 30-day statutory deadline.',
    complete: false,
    required: false,
  },
  {
    title: 'Data Breach Procedure',
    article: 'UK GDPR Articles 33 & 34',
    icon: 'i-lucide-siren',
    description: 'A documented procedure for detecting, reporting, and logging data breaches within 72 hours.',
    complete: false,
    required: false,
  },
  {
    title: 'Data Retention Policy',
    article: 'UK GDPR Article 5(1)(e)',
    icon: 'i-lucide-clock',
    description: 'Documented retention periods for every category of personal data, with a secure deletion process.',
    complete: false,
    required: false,
  },
]

const completedCount = computed(() => obligations.filter(o => o.complete).length)

const stats = [
  {
    label: 'Obligations complete',
    value: `${completedCount.value} / ${obligations.length}`,
    icon: 'i-lucide-shield-check',
    description: 'Work through each one to achieve full compliance',
  },
  {
    label: 'Action required',
    value: String(obligations.filter(o => o.required && !o.complete).length),
    icon: 'i-lucide-triangle-alert',
    description: 'High-priority obligations to address first',
  },
  {
    label: 'Next review due',
    value: 'Not set',
    icon: 'i-lucide-calendar',
    description: 'Set an annual review reminder once complete',
  },
]

const reminders = [
  {
    title: 'ICO registration renewal',
    due: 'Set a reminder once registered — renewals are annual',
    icon: 'i-lucide-badge-check',
  },
  {
    title: 'Annual ROPA review',
    due: 'Schedule once your ROPA is complete',
    icon: 'i-lucide-file-text',
  },
  {
    title: 'Privacy notice review',
    due: 'Review when your processing activities change',
    icon: 'i-lucide-scroll-text',
  },
]

const quickActions = [
  { label: 'Start building your ROPA', icon: 'i-lucide-file-plus' },
  { label: 'Generate a privacy notice', icon: 'i-lucide-scroll-text' },
  { label: 'Log a Subject Access Request', icon: 'i-lucide-user-search' },
  { label: 'Log a data breach', icon: 'i-lucide-siren' },
  { label: 'View UK GDPR guide', icon: 'i-lucide-book-open' },
]
</script>
