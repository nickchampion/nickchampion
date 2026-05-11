<template>
  <UPage>
    <UPageHero
      title="UK GDPR Compliance for Small Professional Practices"
      description="If your practice handles client data — and every practice does — you have legal obligations under the UK General Data Protection Regulation. Most small practices are partially or fully non-compliant without knowing it. This page explains exactly what the law requires and how NodeVault helps you meet it."
      align="center">
      <template #links>
        <UButton
          to="/auth/register"
          size="xl"
          icon="i-lucide-layout-dashboard">
          Start Managing Compliance Free
        </UButton>

        <UButton
          to="#obligations"
          size="xl"
          icon="i-lucide-chevron-down"
          variant="outline"
          color="neutral">
          Read the Legal Requirements
        </UButton>
      </template>
    </UPageHero>

    <UPageSection
      title="Who Must Comply"
      description="UK GDPR applies to any organisation that collects, stores, or processes personal data about individuals in the UK. There is no minimum size threshold — a sole trader therapist has the same legal obligations as a large hospital."
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
      id="obligations"
      title="Your Legal Obligations"
      description="UK GDPR (retained from EU GDPR and implemented via the Data Protection Act 2018) sets out eight core obligations for data controllers. Each one carries enforcement risk if unmet."
      align="center">
      <div class="space-y-6 mt-8">
        <UCard
          v-for="obligation in obligations"
          :key="obligation.title"
          class="p-6">
          <div class="flex flex-col gap-5 md:flex-row md:gap-8">
            <div class="flex items-start gap-4 md:w-72 shrink-0">
              <div class="flex items-center justify-center size-12 rounded-xl bg-primary/10 shrink-0">
                <UIcon
                  :name="obligation.icon"
                  class="size-6 text-primary" />
              </div>

              <div>
                <h3 class="font-semibold text-base leading-snug">
                  {{ obligation.title }}
                </h3>

                <p class="text-xs text-primary font-mono mt-1">
                  {{ obligation.article }}
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3 flex-1">
              <p class="text-sm text-muted">
                {{ obligation.requirement }}
              </p>

              <div class="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <UIcon
                  name="i-lucide-triangle-alert"
                  class="size-4 text-amber-500 shrink-0 mt-0.5" />

                <p class="text-sm text-amber-600 dark:text-amber-400">
                  <span class="font-semibold">Common failure: </span>{{ obligation.failure }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      title="Special Category Data — Higher Obligations"
      description="UK GDPR Article 9 applies additional requirements to sensitive categories of personal data. Most professional practices handle special category data as a matter of course."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="space-y-3">
          <h3 class="font-semibold">
            What counts as special category data
          </h3>

          <ul class="space-y-2">
            <li
              v-for="item in specialCategoryTypes"
              :key="item"
              class="flex items-start gap-2 text-sm">
              <UIcon
                name="i-lucide-alert-circle"
                class="size-4 text-primary shrink-0 mt-0.5" />

              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="space-y-3">
          <h3 class="font-semibold">
            What additional obligations apply
          </h3>

          <ul class="space-y-2">
            <li
              v-for="item in specialCategoryObligations"
              :key="item"
              class="flex items-start gap-2 text-sm">
              <UIcon
                name="i-lucide-check-circle"
                class="size-4 text-primary shrink-0 mt-0.5" />

              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <UCard class="mt-6 p-4 bg-primary/5 border-primary/20">
        <p class="text-sm text-center">
          <span class="font-semibold">If your practice handles any of the above</span> — which therapists, solicitors, GPs, and accountants almost always do — you are subject to the heightened requirements of Article 9 in addition to the core obligations above.
        </p>
      </UCard>
    </UPageSection>

    <UPageSection
      title="How NodeVault Helps You Meet These Obligations"
      description="We offer three services designed specifically around the compliance requirements above. Each one maps directly to your legal obligations."
      align="center">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <UCard
          v-for="service in services"
          :key="service.title"
          class="flex flex-col gap-5 text-left">
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

          <p class="text-sm text-muted flex-1 my-4">
            {{ service.description }}
          </p>

          <div>
            <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
              Obligations addressed
            </p>

            <ul class="space-y-1.5">
              <li
                v-for="point in service.addresses"
                :key="point"
                class="flex items-start gap-2 text-sm">
                <UIcon
                  name="i-lucide-check-circle"
                  class="size-4 text-primary shrink-0 mt-0.5" />

                <span>{{ point }}</span>
              </li>
            </ul>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      title="ICO Enforcement: What's at Stake"
      description="The Information Commissioner's Office has authority to investigate, audit, and fine any data controller — regardless of size. Enforcement has increased steadily since UK GDPR came into force."
      align="center">
      <UPageGrid>
        <UPageCard
          v-for="risk in enforcementRisks"
          :key="risk.title"
          :title="risk.title"
          :description="risk.description"
          :icon="risk.icon" />
      </UPageGrid>
    </UPageSection>

    <UPageSection align="center">
      <UCard class="max-w-2xl mx-auto text-center p-8 space-y-4">
        <UIcon
          name="i-lucide-shield-check"
          class="size-10 text-primary mx-auto" />

        <h2 class="text-2xl font-bold">
          Start managing your compliance today
        </h2>

        <p class="text-muted">
          Create a free account and begin working through your UK GDPR obligations at your own pace. No sales call, no waiting — just a guided tool that tells you exactly where you stand and generates the documents you need.
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
  title: 'UK GDPR Compliance for Small Practices | NodeVault',
  description: 'Plain English guide to UK GDPR obligations for therapists, solicitors, accountants, and GPs. ICO registration, ROPA, privacy notices, SAR handling, breach notification and more.',
  ogTitle: 'UK GDPR Compliance for Small Practices | NodeVault',
  ogDescription: 'Your legal obligations under UK GDPR explained. NodeVault helps small professional practices meet compliance requirements without an IT department.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'UK GDPR Compliance for Small Practices | NodeVault',
  twitterDescription: 'UK GDPR explained for therapists, solicitors, accountants, and GPs. What the law requires and how to meet it.',
  keywords: 'UK GDPR compliance, ICO registration small business, ROPA template, privacy notice small practice, subject access request, data breach 72 hours, GDPR therapist, GDPR solicitor, GDPR accountant',
})

const config = useConfig()

const sectors = [
  {
    title: 'Therapists & Counsellors',
    description: 'Client session notes, referral letters, risk assessments, and GP correspondence are all personal data — and almost all of it qualifies as special category health data under Article 9, attracting the highest level of protection.',
    icon: 'i-lucide-heart-handshake',
  },
  {
    title: 'Solicitors & Legal Practices',
    description: 'Client personal details, case files, financial information, and correspondence are all personal data. Legal privilege does not remove GDPR obligations — it operates alongside them. The SRA expects firms to have documented compliance practices.',
    icon: 'i-lucide-scale',
  },
  {
    title: 'Accountants & Financial Advisors',
    description: 'Tax records, bank statements, payroll data, and financial plans all contain personal data. Much of it qualifies as sensitive financial information requiring careful handling. ICAEW and ACCA guidance mirrors GDPR requirements closely.',
    icon: 'i-lucide-chart-bar',
  },
  {
    title: 'Private Healthcare Providers',
    description: 'Private GPs, occupational health providers, and independent healthcare practitioners are responsible for their own data governance — unlike NHS practitioners, they receive no central IT support. All patient records are special category data.',
    icon: 'i-lucide-stethoscope',
  },
]

const obligations = [
  {
    title: 'ICO Registration',
    article: 'Data Protection Act 2018, s.62 | ICO fee regulations',
    icon: 'i-lucide-badge-check',
    requirement: 'Almost all organisations that process personal data must register with the Information Commissioner\'s Office and pay an annual data protection fee. The fee is £40–£60 for most small organisations. Failure to register is a criminal offence, not just a civil matter.',
    failure: 'Many sole trader practices and micro-businesses assume the registration requirement does not apply to them. It does. Exemptions are narrow — most professional practices do not qualify.',
  },
  {
    title: 'Record of Processing Activities (ROPA)',
    article: 'UK GDPR Article 30',
    icon: 'i-lucide-file-text',
    requirement: 'You must maintain a written record of all personal data processing activities carried out by your practice. This must include: the categories of data you process, your lawful basis for doing so, who you share data with, where data is stored, and how long you retain it. Organisations processing special category data must maintain a ROPA regardless of size.',
    failure: 'Most small practices have never created a ROPA. Without one, you cannot demonstrate compliance to the ICO, respond properly to a Subject Access Request, or assess the impact of a data breach.',
  },
  {
    title: 'Privacy Notice',
    article: 'UK GDPR Articles 13 & 14',
    icon: 'i-lucide-scroll-text',
    requirement: 'You must provide individuals with a clear, plain English notice at the point you collect their personal data. For clients, this means a written privacy notice before or at the start of your relationship. The notice must cover: what data you collect, your lawful basis, how long you keep it, who you share it with, and the client\'s rights. A generic website privacy policy is not sufficient on its own.',
    failure: 'Providing a privacy notice buried in a website footer that clients are never directed to. The notice must be actively communicated — given to clients, not merely published online.',
  },
  {
    title: 'Lawful Basis for Processing',
    article: 'UK GDPR Article 6 | Article 9 (special category)',
    icon: 'i-lucide-gavel',
    requirement: 'Every processing activity must have a documented lawful basis before it begins — not chosen after the fact. For ordinary personal data, Article 6 provides six possible bases (consent, contract, legal obligation, vital interests, public task, legitimate interests). For special category data, Article 9 requires an additional condition, most commonly explicit consent or a substantial public interest condition under Schedule 1 of the Data Protection Act 2018.',
    failure: 'Defaulting to consent as the lawful basis for everything, then failing to obtain it properly — or not recording it at all. For professional services, contract or legal obligation is often the more appropriate and defensible basis.',
  },
  {
    title: 'Data Processing Agreements',
    article: 'UK GDPR Article 28',
    icon: 'i-lucide-handshake',
    requirement: 'Whenever you use a third-party service that processes personal data on your behalf — a cloud storage provider, email service, practice management software, or booking system — you must have a written Data Processing Agreement (DPA) in place with that supplier before any data is processed. The DPA must specify what the processor can and cannot do with the data.',
    failure: 'Using Google Drive, Dropbox, or Microsoft 365 to store client data without a signed DPA. Many providers offer standard DPAs but they must be explicitly accepted — simply using the service is not sufficient. US-based providers also carry additional GDPR risk under the CLOUD Act.',
  },
  {
    title: 'Subject Access Request Handling',
    article: 'UK GDPR Article 15',
    icon: 'i-lucide-user-search',
    requirement: 'Any individual has the right to request all personal data your practice holds about them. You must respond within one calendar month, free of charge, and provide a copy of all personal data along with supplementary information (your retention periods, who data is shared with, etc.). You cannot refuse unless the request is manifestly unfounded or excessive. The deadline cannot be extended without notifying the requester.',
    failure: 'Treating SARs informally or failing to locate all data held across email, cloud storage, paper files, and practice software. Missing the one-month deadline is one of the most common triggers for an ICO complaint.',
  },
  {
    title: 'Data Breach Notification',
    article: 'UK GDPR Articles 33 & 34',
    icon: 'i-lucide-siren',
    requirement: 'If a personal data breach occurs that is likely to result in a risk to individuals\' rights and freedoms, you must notify the ICO within 72 hours of becoming aware of it. If the breach is likely to result in high risk to individuals, you must also notify those individuals directly and promptly. You must document all breaches, including those that do not require reporting.',
    failure: 'Not having a documented breach response procedure means the 72-hour clock runs while your practice is still figuring out what happened. Undetected breaches — such as an email sent to the wrong recipient — that are never reported represent both a compliance failure and an ongoing liability.',
  },
  {
    title: 'Data Retention Policy',
    article: 'UK GDPR Article 5(1)(e) — Storage Limitation',
    icon: 'i-lucide-clock',
    requirement: 'Personal data must not be kept for longer than is necessary for the purpose for which it was collected. You must have documented retention periods for every category of data you hold — and a process for securely deleting data when those periods expire. For some professional categories, sector-specific guidance sets minimum retention periods (e.g. medical records: 8 years from last contact; children\'s records: until age 25).',
    failure: 'Keeping client files indefinitely because "we might need them". Without documented and enforced retention periods, you accumulate unnecessary data that increases your exposure in the event of a breach.',
  },
]

const specialCategoryTypes = [
  'Health and medical data (including mental health)',
  'Data revealing racial or ethnic origin',
  'Political opinions, religious or philosophical beliefs',
  'Trade union membership',
  'Genetic or biometric data',
  'Data concerning sex life or sexual orientation',
  'Criminal conviction and offence data (under Article 10)',
]

const specialCategoryObligations = [
  'Must identify an Article 9 condition before processing (explicit consent is most common)',
  'DPA 2018 Schedule 1 condition required in addition to Article 9',
  'Higher standard of security measures required',
  'Data Protection Impact Assessment (DPIA) likely required',
  'Breach notification threshold is lower — high risk is presumed',
  'Retention periods should be actively reviewed and justified',
]

const services = [
  {
    title: 'GDPR Compliance Manager',
    tagline: 'Self-serve compliance for your practice',
    icon: 'i-lucide-clipboard-check',
    description: 'A guided tool that walks you through all eight UK GDPR obligations step by step. Answer questions about your practice, generate the documents the law requires, and manage your ongoing compliance from a single dashboard — no consultant needed.',
    addresses: [
      'ICO registration status confirmed and recorded',
      'Record of Processing Activities (ROPA) built from your answers',
      'Privacy notice generated and tailored to your practice type',
      'Lawful basis identified and documented for each processing activity',
      'Processor relationships mapped and DPA requirements flagged',
      'Subject Access Request tracker with 30-day deadline alerts',
      'Breach incident log with ICO notification guidance',
      'Annual review reminders to keep compliance current',
    ],
  },
  {
    title: 'Secure Infrastructure',
    tagline: 'EU-hosted, GDPR-compliant data storage',
    icon: 'i-lucide-server',
    description: 'Replace US-hosted cloud services (which carry CLOUD Act exposure and complicate your GDPR position) with EU-based alternatives hosted under a signed Data Processing Agreement. File storage, calendars, and password management — all on infrastructure you control.',
    addresses: [
      'Replaces non-compliant US cloud processors',
      'Signed DPA with hosting provider (Hetzner, Germany)',
      'EU jurisdiction — no CLOUD Act exposure',
      'Clear, verifiable answer to "where is data stored?"',
      'Encrypted backups with documented retention',
    ],
  },
  {
    title: 'Secure Devices',
    tagline: 'Hardened phones for professional use',
    icon: 'i-lucide-smartphone',
    description: 'GrapheneOS phones eliminate the telemetry and background data collection that creates unintended processing under GDPR. Pre-configured for professional use, with no Google account required and no third-party tracking at the OS level.',
    addresses: [
      'Eliminates unintended OS-level data processing',
      'Reduces scope of personal data held on devices',
      'Encrypted storage by default',
      'No third-party telemetry or location tracking',
      'Reduces attack surface for breach scenarios',
    ],
  },
]

const enforcementRisks = [
  {
    title: 'ICO Fines',
    description: 'The ICO can issue fines of up to £17.5 million or 4% of global annual turnover (whichever is higher) for serious breaches. For small organisations, fines in the £1,000–£50,000 range are more common — but still significant for a practice of 2–5 people.',
    icon: 'i-lucide-circle-pound',
  },
  {
    title: 'Client Complaints',
    description: 'Any individual can complain to the ICO about how their data has been handled. The ICO will investigate and can compel you to change practices, provide access to data, or pay compensation. A formal ICO investigation is time-consuming and reputationally damaging regardless of outcome.',
    icon: 'i-lucide-message-square-warning',
  },
  {
    title: 'Regulatory Referral',
    description: 'The ICO shares information with professional regulators. An ICO finding against a solicitor, therapist, or accountant can trigger a parallel investigation by the SRA, BACP, or ICAEW. Professional sanctions — including suspension or removal from the register — are possible outcomes.',
    icon: 'i-lucide-file-warning',
  },
  {
    title: 'Reputational Damage',
    description: 'ICO enforcement decisions are published. For a practice whose entire business depends on client trust and confidentiality, a published finding of non-compliance is disproportionately damaging relative to the fine itself. Prevention is significantly cheaper than recovery.',
    icon: 'i-lucide-megaphone',
  },
]
</script>
