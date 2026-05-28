<template>
  <UPage>
    <div class="text-center px-6 py-10 sm:py-14">
      <h1 class="text-5xl sm:text-7xl font-bold tracking-tight text-highlighted">
        The NodeVault Blog
      </h1>

      <p class="mt-4 text-lg sm:text-xl text-muted">
        Practical privacy guides covering GrapheneOS, UmbrelOS, OPNSense routers, and everyday privacy habits.
      </p>
    </div>

    <div class="px-6 lg:px-10 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 w-full">
        <div class="min-w-0 order-2 lg:order-1">
          <div
            v-if="articlePending"
            class="space-y-4 animate-pulse">
            <div class="h-8 bg-muted rounded w-3/4" />

            <div class="h-4 bg-muted rounded w-1/2" />

            <div class="h-4 bg-muted rounded w-full" />

            <div class="h-4 bg-muted rounded w-full" />

            <div class="h-4 bg-muted rounded w-5/6" />
          </div>

          <div
            v-else-if="!article"
            class="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div class="flex items-center justify-center size-14 rounded-2xl bg-primary/10">
              <UIcon
                name="i-lucide-book-open"
                class="size-7 text-primary" />
            </div>

            <div class="space-y-1.5">
              <h2 class="text-xl font-semibold">
                Pick an article
              </h2>

              <p class="text-muted text-sm max-w-xs">
                Select a post from the menu to start reading.
              </p>
            </div>
          </div>

          <article v-else>
            <div class="mb-6 space-y-2">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="categoryIcon(article.category)"
                  class="size-3.5 text-primary" />

                <span class="text-xs font-semibold text-primary uppercase tracking-wider">
                  {{ categoryLabel(article.category) }}
                </span>
              </div>

              <h1 class="text-3xl lg:text-4xl font-bold leading-tight">
                {{ article.title }}
              </h1>

              <p class="text-lg text-muted">
                {{ article.subtitle }}
              </p>

              <div class="flex items-center gap-1.5 text-sm text-muted pt-1">
                <UIcon
                  name="i-lucide-user"
                  class="size-3.5" />

                <span>{{ article.author }}</span>
              </div>
            </div>

            <USeparator class="mb-8" />

            <div class="article-body">
              <img
                v-if="article.banner"
                :src="article.banner.url"
                :alt="article.banner.alternativeText ?? article.title"
                class="float-left mr-6 mb-3 rounded-xl w-52 lg:w-64 object-cover" />

              <BlogBlocks :blocks="article.content ?? []" />

              <div class="clear-both" />
            </div>
          </article>
        </div>

        <aside class="order-1 lg:order-2">
          <div class="lg:sticky lg:top-24 space-y-5">
            <div class="flex items-center gap-2 pb-1 border-b border-default">
              <UIcon
                name="i-lucide-layout-list"
                class="size-4 text-muted" />

              <h2 class="text-sm font-semibold uppercase tracking-wider text-muted">
                Articles
              </h2>
            </div>

            <div
              v-if="menuPending"
              class="space-y-4 animate-pulse">
              <div
                v-for="i in 3"
                :key="i"
                class="space-y-2">
                <div class="h-3 bg-muted rounded w-24" />

                <div class="h-3 bg-muted rounded w-40 ml-4" />

                <div class="h-3 bg-muted rounded w-36 ml-4" />
              </div>
            </div>

            <nav
              v-else
              class="space-y-4">
              <div
                v-for="cat in menu ?? []"
                :key="cat.category"
                class="space-y-1">
                <!-- Category heading -->
                <div class="flex items-center gap-2 mb-1.5">
                  <UIcon
                    :name="categoryIcon(cat.category)"
                    class="size-3.5 text-muted shrink-0" />

                  <span class="text-xs font-semibold uppercase tracking-wider text-muted">
                    {{ categoryLabel(cat.category) }}
                  </span>
                </div>

                <ul class="space-y-0.5 pl-5">
                  <li
                    v-for="a in cat.articles"
                    :key="a.documentId">
                    <NuxtLink
                      :to="`/blog/${a.slug}`"
                      class="block text-sm py-1 leading-snug transition-colors"
                      :class="activeSlug === a.slug
                        ? 'text-primary font-medium'
                        : 'text-muted hover:text-default'">
                      {{ a.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </UPage>
</template>

<script setup lang="ts">
import type {
  BlogCategorySchema,
  BlogArticleSchema,
  BlogCategoryEnumSchema,
} from '@nodevault/platform.components.nodevault.openapi'

const route = useRoute()
const activeSlug = computed(() => route.params.slug as string | undefined)
const client = useApiClient()

const { data: menu, pending: menuPending } = await useAsyncData<BlogCategorySchema[]>(
  'blog-menu',
  async () => {
    const res = await client.blog.menu()

    return res.data ?? []
  },
)

const { data: article, pending: articlePending } = await useAsyncData<BlogArticleSchema | null>(
  () => `blog-article-${activeSlug.value ?? 'none'}`,
  async () => {
    if (!activeSlug.value) return null

    const res = await client.blog.article(activeSlug.value)

    return res.data
  },
  { watch: [activeSlug] },
)

const categoryMeta: Record<BlogCategoryEnumSchema, { label: string, icon: string }> = {
  grapheneos: { label: 'GrapheneOS', icon: 'i-lucide-smartphone' },
  umbrelos: { label: 'UmbrelOS', icon: 'i-lucide-server' },
  opnsense: { label: 'OPNSense', icon: 'i-lucide-box' },
}

function categoryLabel(cat: BlogCategoryEnumSchema | undefined): string {
  return cat ? (categoryMeta[cat]?.label ?? cat) : ''
}

function categoryIcon(cat: BlogCategoryEnumSchema | undefined): string {
  return cat ? (categoryMeta[cat]?.icon ?? 'i-lucide-file-text') : 'i-lucide-file-text'
}

watchEffect(() => {
  useSeoMeta({
    title: article.value
      ? `${article.value.title} | NodeVault Blog`
      : 'Blog | NodeVault',
    description: article.value?.subtitle
      ?? 'Practical privacy guides covering GrapheneOS, UmbrelOS, OPNSense, and everyday privacy habits.',
    ogTitle: article.value?.title ?? 'The NodeVault Blog',
    ogDescription: article.value?.subtitle ?? 'Practical privacy guides and how-tos.',
  })
})
</script>

<style scoped>
/* Ensure paragraphs flow around the floated banner image on small text widths */
.article-body::after {
  content: '';
  display: table;
  clear: both;
}
</style>
