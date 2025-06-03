<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      variant="soft"
      @click="isDark = !isDark"
      size="xl"
      class="cursor-pointer text-xl rounded-full"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
