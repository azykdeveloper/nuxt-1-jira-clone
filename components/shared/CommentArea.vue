<script setup lang="ts">
const value = ref('')
</script>

<template>
  <UTextarea
    v-model="value"
    placeholder="Write a comment..."
    class="w-full"
    size="xl"
  >
    <template #trailing>
      <UButton class="cursor-pointer text-[26px]" icon="ic:round-send"  variant="link"></UButton>
    </template>
  </UTextarea>
</template>