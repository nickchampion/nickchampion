<template>
  <UFooter class="z-10">
    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} NodeVault
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com"
        target="_blank"
        aria-label="GitHub" />
    </template>
  </UFooter>
</template>
