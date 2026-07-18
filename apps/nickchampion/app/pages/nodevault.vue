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
            Drop in files or point it at URLs, and NodeVault turns them into a searchable, private
            knowledge base. Content is ingested through durable background workflows — extracted,
            chunked, embedded with Google Gemini, and stored as vectors in Postgres — so you can find
            things by meaning, not just keywords. The goal is a knowledge layer you can ask questions
            of, with grounded answers citing your own documents, and that your AI tools can query on
            your behalf.
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

        <!-- What I built -->
        <section>
          <SectionHeading>What I built</SectionHeading>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              Semantic search over your own documents — built with Next.js, tRPC, Inngest, and pgvector.
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
  description: 'NodeVault is a personal knowledge vault built by Nick Champion — a full-stack TypeScript app with semantic search over your own documents, powered by Next.js, tRPC, Inngest, Postgres + pgvector, and Google Gemini embeddings.',
})

const areas = [
  {
    title: 'Durable Ingestion',
    icon: 'i-lucide-workflow',
    description: 'Uploads persist a row and emit an event — an Inngest workflow extracts text from PDFs and DOCX, chunks it, generates Gemini embeddings, and writes vectors to pgvector. Each step retries independently, and file status streams back to the UI.',
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
    tech: ['Next.js 15', 'React 19', 'HeroUI', 'Tailwind CSS 4', 'TypeScript', 'Cloudflare Workers (OpenNext)'],
  },
  {
    label: 'API',
    icon: 'i-lucide-server',
    tech: ['Node.js', 'Koa', 'tRPC v11', 'zod', 'Inngest', 'Fly.io'],
  },
  {
    label: 'Data & Storage',
    icon: 'i-lucide-database',
    tech: ['Postgres (Neon)', 'pgvector', 'Drizzle ORM', 'Cloudflare R2'],
  },
  {
    label: 'AI & Tooling',
    icon: 'i-lucide-sparkles',
    tech: ['Google Gemini embeddings', 'NX monorepo', 'pnpm', 'Vitest', 'Resend'],
  },
]

const highlights = [
  'Designed and built the entire platform solo — frontend, API, ingestion pipeline, data model, and deployment.',
  'Full-stack TypeScript in an NX monorepo with strict layering: Drizzle storage rows → explicit mappers → zod contract DTOs, the only layer the frontend can import.',
  'Business logic lives in plain ApiHandlers that declare their contracts as generics, bridged onto tRPC procedures — a handler whose types disagree with its schemas is a compile-time error at the wiring site.',
  'Responses are runtime-verified against output schemas with excess fields stripped, so the API can never leak more than its contract declares.',
  'Every mutating request runs in a single Postgres transaction managed by middleware — handlers never touch transaction code; errors roll everything back.',
  'Durable, event-driven file processing with Inngest: discrete step.run() units that retry from the failed step, not from the beginning.',
  'Semantic search as cosine similarity over chunk embeddings in plain SQL, transactionally consistent with the rest of the data.',
  'Passwordless magic-link authentication with transactional email via Resend.',
  'Next.js served from Cloudflare Workers at the edge via OpenNext; API in Docker on Fly.io; file blobs in Cloudflare R2.',
]

const roadmap = [
  {
    title: 'Hybrid search',
    description: 'combine similarity with Postgres full-text search — one SQL query, since the vectors already live in Postgres.',
  },
  {
    title: 'Q&A with citations',
    description: 'retrieve top-k chunks and hand them to an LLM for answers that cite the source file, URL, and chunk — with neighbouring context pulled via chunk indexes.',
  },
  {
    title: 'Saved queries',
    description: 'save a query\'s embedding and compare newly ingested chunks against it inside the existing Inngest pipeline — "alert me when anything I save matches this topic."',
  },
  {
    title: 'Vault MCP Server',
    description: 'expose retrieval as an MCP server so AI tools like Claude can query the vault directly — a personal knowledge layer every agent can use.',
  },
]
</script>
