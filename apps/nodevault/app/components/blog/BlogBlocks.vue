<template>
  <div
    class="blog-blocks"
    v-html="html" />
</template>

<script setup lang="ts">
import type { BlocksContent, BlockNode, BlockTextNode } from '@platform/integrations.strapi'

const props = defineProps<{ blocks: BlocksContent }>()

function renderText(node: BlockTextNode): string {
  if (!node.text) return ''

  // Escape HTML entities in raw text
  let t = node.text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

  // Apply inline formatting — order matters (code first to avoid double-wrapping)
  if (node.code) return `<code>${t}</code>`

  if (node.bold) t = `<strong>${t}</strong>`

  if (node.italic) t = `<em>${t}</em>`

  if (node.underline) t = `<u>${t}</u>`

  if (node.strikethrough) t = `<s>${t}</s>`

  return t
}

function renderChildren(nodes: (BlockNode | BlockTextNode)[] | undefined): string {
  if (!nodes?.length) return ''

  return nodes.map(node => (node.type === 'text'
    ? renderText(node as BlockTextNode)
    : renderBlock(node as BlockNode))).join('')
}

function renderBlock(node: BlockNode): string {
  const inner = renderChildren(node.children)

  if (node.type === 'paragraph') {
    return `<p>${inner}</p>`
  }

  if (node.type === 'heading') {
    const tag = `h${node.level ?? 2}`

    return `<${tag}>${inner}</${tag}>`
  }

  if (node.type === 'list') {
    const tag = node.format === 'ordered' ? 'ol' : 'ul'

    return `<${tag}>${inner}</${tag}>`
  }

  if (node.type === 'list-item') {
    return `<li>${inner}</li>`
  }

  if (node.type === 'quote') {
    return `<blockquote>${inner}</blockquote>`
  }

  if (node.type === 'code') {
    // Code blocks: take raw text only, skip inline formatting
    const raw = (node.children ?? [])
      .filter(c => c.type === 'text')
      .map(c => (c as BlockTextNode).text ?? '')
      .join('')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
    const lang = node.language ?? 'plaintext'

    return `<pre><code class="language-${lang}">${raw}</code></pre>`
  }

  if (node.type === 'image') {
    // Strapi image blocks carry their metadata in a nested `image` object
    const img = (node as BlockNode & { image?: { url: string, alternativeText?: string } }).image

    if (!img?.url) return ''

    return `<img src="${img.url}" alt="${img.alternativeText ?? ''}" loading="lazy" />`
  }

  if (node.type === 'link') {
    return `<a href="${node.url ?? '#'}" target="_blank" rel="noopener noreferrer">${inner}</a>`
  }

  // Unknown block type — render children inline
  return inner
}

const html = computed(() => props.blocks?.map(renderBlock).join('') ?? '')
</script>

<style scoped>
.blog-blocks :deep(h1),
.blog-blocks :deep(h2),
.blog-blocks :deep(h3),
.blog-blocks :deep(h4),
.blog-blocks :deep(h5),
.blog-blocks :deep(h6) {
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--ui-text);
}

.blog-blocks :deep(h1) { font-size: 1.875rem; line-height: 2.25rem; }
.blog-blocks :deep(h2) { font-size: 1.5rem; line-height: 2rem; }
.blog-blocks :deep(h3) { font-size: 1.25rem; line-height: 1.75rem; }
.blog-blocks :deep(h4) { font-size: 1.125rem; line-height: 1.75rem; }

.blog-blocks :deep(p) {
  line-height: 1.8;
  margin-bottom: 1.125rem;
  color: var(--ui-text-muted);
}

.blog-blocks :deep(ul),
.blog-blocks :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  color: var(--ui-text-muted);
}

.blog-blocks :deep(ul) { list-style-type: disc; }
.blog-blocks :deep(ol) { list-style-type: decimal; }

.blog-blocks :deep(li) { line-height: 1.75; }

.blog-blocks :deep(blockquote) {
  border-left: 3px solid var(--ui-primary);
  padding: 0.5rem 0 0.5rem 1.25rem;
  margin: 1.5rem 0;
  color: var(--ui-text-muted);
  font-style: italic;
}

.blog-blocks :deep(pre) {
  background: var(--ui-bg-muted);
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
  overflow-x: auto;
}

.blog-blocks :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875em;
  color: var(--ui-text);
}

.blog-blocks :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--ui-text-muted);
}

.blog-blocks :deep(:not(pre) > code) {
  background: var(--ui-bg-muted);
  border: 1px solid var(--ui-border);
  border-radius: 0.25rem;
  padding: 0.125rem 0.375rem;
}

.blog-blocks :deep(a) {
  color: var(--ui-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.blog-blocks :deep(a:hover) { opacity: 0.8; }

.blog-blocks :deep(strong) { font-weight: 600; color: var(--ui-text); }
.blog-blocks :deep(em) { font-style: italic; }
.blog-blocks :deep(s) { text-decoration: line-through; }

.blog-blocks :deep(img) {
  max-width: 100%;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>
