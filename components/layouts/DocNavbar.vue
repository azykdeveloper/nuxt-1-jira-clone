<template>
  <div
    class="fixed top-3 left-3 md:left-[312px] right-3 h-18 p-5 rounded-lg bg-[#fff] dark:bg-zinc-900 shadow-xl flex items-center justify-end"
  >
      <SharedColorModeButton class="mr-4" />
      <SharedNavbarDropdown :user="user" v-if="user" />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const user = authStore.user;
</script>
