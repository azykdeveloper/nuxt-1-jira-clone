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
    class="py-10 flex flex-col items-center justify-center z-10 md:gap-8 text-center"
  >
    <UCard
      class="mt-5 px-6 py-4 mb-5 w-[400px]  bg-transparent md:bg-white md:shadow-lg ring-0"
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
section {
  background-image: url("/public/auth-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  section {
    background: #fff;
  }
}
</style>
