<template>
  <UPage>
    <!-- Header -->
    <section class="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 sm:py-16">
      <UContainer>
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-4">
            <p class="text-sky-600 font-semibold text-sm tracking-wide uppercase">
              Personal project
            </p>

            <UBadge
              color="success"
              variant="subtle"
              size="sm"
              icon="i-lucide-circle">
              Live
            </UBadge>
          </div>

          <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            NodeVault
          </h1>

          <p class="text-xl text-slate-600 font-medium mb-4">
            A personal knowledge vault with semantic search
          </p>

          <p class="text-lg text-slate-500 leading-relaxed max-w-2xl mb-8">
            Drop in files, submit URLs, or point it at an RSS feed, and NodeVault turns them into a
            searchable, private knowledge base. Content is ingested through durable background
            workflows — extracted, chunked, embedded with Google Gemini or OpenAI, and stored as
            vectors in Postgres — so you can find things by meaning, not just keywords. Ask the vault
            questions and get grounded, streamed answers with citations back to your own documents,
            plus standing alerts when newly-ingested content matches something you care about. Next
            up: an MCP server so your AI tools can query it directly.
          </p>

          <div class="flex flex-wrap gap-3">
            <UButton
              href="https://www.nodevault.cloud"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              color="primary"
              icon="i-lucide-external-link"
              trailing>
              Visit NodeVault
            </UButton>

            <UButton
              href="https://github.com/nickchampion/nodevault"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="outline"
              color="neutral"
              icon="i-simple-icons-github">
              View on GitHub
            </UButton>

            <UButton
              to="/"
              size="lg"
              variant="ghost"
              color="neutral"
              icon="i-lucide-arrow-left">
              Back to profile
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <UContainer class="py-12">
      <div class="max-w-4xl space-y-14">
        <!-- How it works -->
        <section>
          <SectionHeading>How it works</SectionHeading>

          <ol class="space-y-4">
            <li
              v-for="(step, index) in howItWorks"
              :key="step"
              class="flex items-start gap-4 text-sm text-slate-600 leading-relaxed">
              <span class="flex items-center justify-center size-6 rounded-full bg-sky-500 text-white text-xs font-bold shrink-0">
                {{ index + 1 }}
              </span>

              {{ step }}
            </li>
          </ol>
        </section>

        <!-- Three areas -->
        <section>
          <SectionHeading>Architecture in three parts</SectionHeading>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div
              v-for="area in areas"
              :key="area.title"
              class="rounded-xl border border-slate-200 p-6 flex flex-col gap-3">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-10 rounded-lg bg-sky-50 shrink-0">
                  <UIcon
                    :name="area.icon"
                    class="size-5 text-sky-600" />
                </div>

                <h3 class="font-bold text-slate-900 text-sm">
                  {{ area.title }}
                </h3>
              </div>

              <p class="text-sm text-slate-600 leading-relaxed">
                {{ area.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Feature overview -->
        <section>
          <SectionHeading>Capabilities</SectionHeading>

          <p class="text-sm text-slate-500 mb-5 -mt-2">
            What started as a roadmap is now the core of the product.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              v-for="feature in capabilities"
              :key="feature.title"
              class="rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-9 rounded-lg bg-sky-50 shrink-0">
                  <UIcon
                    :name="feature.icon"
                    class="size-4 text-sky-600" />
                </div>

                <h3 class="font-bold text-slate-900 text-sm">
                  {{ feature.title }}
                </h3>
              </div>

              <p class="text-sm text-slate-600 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- What I built -->
        <section>
          <SectionHeading>What I built</SectionHeading>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="layer in stack"
              :key="layer.label"
              class="rounded-xl border border-slate-200 p-5">
              <div class="flex items-center gap-2 mb-3">
                <UIcon
                  :name="layer.icon"
                  class="size-4 text-sky-500" />

                <span class="text-sm font-semibold text-slate-700">{{ layer.label }}</span>
              </div>

              <div class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tech in layer.tech"
                  :key="tech"
                  variant="subtle"
                  color="neutral"
                  size="sm">
                  {{ tech }}
                </UBadge>
              </div>
            </div>
          </div>
        </section>

        <!-- Highlights -->
        <section>
          <SectionHeading>Engineering highlights</SectionHeading>

          <ul class="space-y-3">
            <li
              v-for="highlight in highlights"
              :key="highlight"
              class="flex items-start gap-3 text-sm text-slate-600">
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-sky-400 shrink-0 mt-0.5" />
              {{ highlight }}
            </li>
          </ul>
        </section>

        <!-- Roadmap -->
        <section>
          <SectionHeading>Where it's heading</SectionHeading>

          <ul class="space-y-3">
            <li
              v-for="item in roadmap"
              :key="item.title"
              class="flex items-start gap-3 text-sm text-slate-600">
              <UIcon
                name="i-lucide-git-branch"
                class="size-4 text-sky-400 shrink-0 mt-0.5" />

              <span><span class="font-semibold text-slate-700">{{ item.title }}</span> — {{ item.description }}</span>
            </li>
          </ul>
        </section>

        <!-- CTA -->
        <section class="rounded-2xl bg-sky-50 border border-sky-100 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 class="font-bold text-slate-900 text-lg mb-1">
              See it live
            </h3>

            <p class="text-slate-500 text-sm">
              Hybrid search, cited Q&amp;A, and standing alerts over your own documents — built with Next.js, tRPC, Inngest, and pgvector.
            </p>
          </div>

          <UButton
            href="https://www.nodevault.cloud"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            size="lg"
            icon="i-lucide-external-link"
            trailing
            class="shrink-0">
            nodevault.cloud
          </UButton>
        </section>
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'NodeVault — Nick Champion',
  description: 'NodeVault is a personal knowledge vault built by Nick Champion — a full-stack TypeScript app with hybrid search, cited Q&A, and standing alerts over your own documents, powered by Next.js, tRPC, Inngest, Postgres + pgvector, and Gemini/OpenAI.',
})

const howItWorks = [
  'Sign in with a magic link (no passwords) — email delivery via Resend.',
  'Create a vault and add content: upload a file, submit a URL, or point it at an RSS feed for ongoing ingestion.',
  'An Inngest workflow picks the content up asynchronously — extracts text (PDF via unpdf, DOCX via mammoth, articles via @mozilla/readability), chunks it, generates embeddings with Gemini or OpenAI, and writes vectors to pgvector.',
  'Search the vault with hybrid retrieval — Reciprocal Rank Fusion over vector similarity and Postgres full-text search.',
  'Ask your vault questions in a streamed, cited conversation — either a hand-rolled RAG pipeline or fully managed grounding via Vertex AI Search / OpenAI file search.',
  'Save a topic and get emailed the moment newly-ingested content matches it — no polling, it rides the same ingestion pipeline every asset already goes through.',
]

const capabilities = [
  {
    title: 'Hybrid search',
    icon: 'i-lucide-search',
    description: 'pgvector cosine similarity and Postgres full-text search run as independent candidate sets, fused with Reciprocal Rank Fusion in a single chained-CTE query. The vector leg uses a per-vault adaptive threshold (mean + 1.5×stddev) instead of a fixed cutoff, so results hold up across vaults of very different sizes.',
  },
  {
    title: 'Q&A with citations',
    icon: 'i-lucide-messages-square',
    description: 'Streamed over Server-Sent Events with two selectable modes per account: a hand-rolled RAG pipeline that condenses follow-ups into standalone queries and cites sources inline, or fully managed grounding via Vertex AI Search / OpenAI file search. Conversations and citations are persisted and browsable.',
  },
  {
    title: 'Saved topics & alerts',
    icon: 'i-lucide-bell',
    description: 'Save a free-text topic and every asset ingestion runs a match step against it. A unique index plus onConflictDoNothing enforces idempotency structurally, so a topic alerts at most once per asset — matches batch into a single email via React Email.',
  },
  {
    title: 'RSS feed vaults',
    icon: 'i-lucide-rss',
    description: 'Create a vault directly from a feed URL. A weekly Inngest cron fans out one sync per feed, throttled and deduped against existing asset URLs, feeding new items through the same ingestion pipeline as a manually-submitted URL.',
  },
  {
    title: 'Multi-provider AI, with live migration',
    icon: 'i-lucide-shuffle',
    description: "Gemini and OpenAI sit behind one AiClient interface. OpenAI embeddings are truncated to 768 dimensions to match Gemini's, so both share one pgvector column with zero schema changes — switching provider triggers a background re-embed and re-index before cutover.",
  },
  {
    title: 'Bring-your-own-cloud grounding',
    icon: 'i-lucide-cloud',
    description: "The Vertex AI Search data store is provisioned per account in the user's own GCP project, not a shared platform index, with explicit verification that turns missing permissions or disabled APIs into actionable setup errors.",
  },
]

const areas = [
  {
    title: 'Durable Ingestion',
    icon: 'i-lucide-workflow',
    description: 'Uploads persist a row and emit an event — an Inngest workflow extracts text from PDFs and DOCX, chunks it, generates embeddings with Gemini or OpenAI, and writes vectors to pgvector. Each step retries independently, and file status streams back to the UI.',
  },
  {
    title: 'End-to-End Type Safety',
    icon: 'i-lucide-shield-check',
    description: 'A tRPC v11 API on Koa where every procedure declares zod input and output schemas from a shared contracts package. The frontend imports the router type only — a fully typed client with zero code generation.',
  },
  {
    title: 'Vectors Next to Your Data',
    icon: 'i-lucide-database-zap',
    description: 'Embeddings live in the same Postgres schema as everything else (Drizzle vector columns + HNSW index), so similarity search composes with ordinary SQL — scoped by account and vault in one WHERE clause, no separate vector database to sync.',
  },
]

const stack = [
  {
    label: 'Frontend',
    icon: 'i-lucide-monitor',
    tech: ['Next.js 15 (App Router)', 'React 19', 'HeroUI v3', 'Tailwind CSS 4'],
  },
  {
    label: 'API',
    icon: 'i-lucide-server',
    tech: ['Node.js', 'Koa', 'tRPC v11', 'zod contracts', 'Server-Sent Events'],
  },
  {
    label: 'Background Jobs',
    icon: 'i-lucide-workflow',
    tech: ['Inngest (durable, step-based workflows + cron)'],
  },
  {
    label: 'Database',
    icon: 'i-lucide-database',
    tech: ['Postgres (Neon)', 'Drizzle ORM', 'pgvector'],
  },
  {
    label: 'AI Providers',
    icon: 'i-lucide-sparkles',
    tech: ['Google Gemini', 'OpenAI', 'selectable per account'],
  },
  {
    label: 'Managed Grounding',
    icon: 'i-lucide-cloud-cog',
    tech: ['Vertex AI Search', 'OpenAI file search'],
  },
  {
    label: 'Content Extraction',
    icon: 'i-lucide-file-text',
    tech: ['unpdf (PDF)', 'mammoth (DOCX)', '@mozilla/readability (articles)', 'rss-parser (feeds)'],
  },
  {
    label: 'Email',
    icon: 'i-lucide-mail',
    tech: ['Resend', 'React Email'],
  },
  {
    label: 'Hosting',
    icon: 'i-lucide-globe',
    tech: ['Cloudflare Workers (OpenNext)', 'Fly.io', 'Cloudflare R2'],
  },
  {
    label: 'Tooling',
    icon: 'i-lucide-wrench',
    tech: ['NX monorepo', 'pnpm', 'TypeScript', 'Vitest', 'tsx'],
  },
]

const highlights = [
  'Designed and built the entire platform — frontend, API, ingestion pipeline, data model, and deployment.',
  'Full-stack TypeScript in an NX monorepo with strict layering: Drizzle storage rows → explicit mappers → zod contract DTOs, the only layer the frontend can import.',
  'Business logic lives in plain ApiHandlers that declare their contracts as generics, bridged onto tRPC procedures — a handler whose types disagree with its schemas is a compile-time error at the wiring site.',
  'Responses are runtime-verified against output schemas with excess fields stripped, so the API can never leak more than its contract declares.',
  'Every mutating request runs in a single Postgres transaction managed by middleware — handlers never touch transaction code; errors roll everything back.',
  'Durable, event-driven file processing with Inngest: discrete step.run() units that retry from the failed step, not from the beginning.',
  'Hybrid search runs as a single chained-CTE Drizzle query — no separate vector database, transactionally consistent with the rest of the data.',
  'Passwordless magic-link authentication with transactional email via Resend.',
  'Next.js served from Cloudflare Workers at the edge via OpenNext; API in Docker on Fly.io; file blobs in Cloudflare R2.',
]

const roadmap = [
  {
    title: 'Per-vault synthesis & digests',
    description: '"what do my saved articles say about X" — summarizing across an entire vault rather than answering one question at a time.',
  },
  {
    title: 'Vault MCP Server',
    description: 'expose retrieval as an MCP server so AI tools like Claude can query the vault directly — a personal knowledge layer every agent can use.',
  },
]
</script>
