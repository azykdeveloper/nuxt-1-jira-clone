<template>
  <SharedLoader v-if="loadingStore.isLoading" />
  <section class="h-screen overflow-auto">
    <slot />
  </section>
</template>

<script setup lang="ts">

const loadingStore = useLoadingStore()

</script>
