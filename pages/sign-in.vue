<script setup lang="ts">

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Sign In - Jira",
});
</script>

<template>
  <section
    class="py-10 flex flex-col items-center justify-center z-10 md:gap-8 text-center dark:bg-zinc-900"
  >
    <UCard
      class="mt-5 px-6 py-4 mb-5 w-[400px]  md:dark:bg-zinc-800 md:light:bg-[#fff]  md:shadow-lg ring-0"
    >
      <!-- Title -->
      <h2 class="text-3xl font-bold">
        <UIcon name="logos:atlassian" />
        <span class="font-black text-blue-600 ml-1.5 tracking-widest"
          >ATLASSIAN</span
        >
      </h2>
      <p class="mt-2 text-zinc-600">Log in to continue</p>

      <!-- Form -->
      <LayoutsAuthForm :status="'sign-in'" class="mt-4 w-full" />

      <div class="mt-8 text-sm text-zinc-500">
        <p>
          Don't have an account?
          <NuxtLink to="/sign-up" class="text-blue-600 hover:underline"
            >Sign up</NuxtLink
          >
        </p>
      </div>

      <USeparator color="secondary" orientation="horizontal" class="mt-4" />

      
    </UCard>
  </section>
</template>

<style scoped>
section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e9f2fe;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 25% 57%, 25% 47%, 0 47%);
  z-index: -1;
}

@media (max-width: 768px) {
  section::after {
    clip-path: polygon(0 0, 100% 0, 100% 16%, 25% 20%, 25% 17%, 0 17%);
  }
}
</style>
