<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
useHead({
  title: "Auth Page",
});
</script>

<template>
  <section
    class="py-5 flex flex-col items-center justify-center z-10 md:gap-8 text-center "
  >
    <NuxtLink to="/" class="flex items-center gap-4 mt-8">
      <UIcon name="logos:jira" class="text-4xl translate-y-1" />
      <span class="text-5xl font-medium">Jira</span>
    </NuxtLink>

    <UCard
      class="px-10 py-8 mb-5 max-w-[560px] md:w-[560px] bg-transparent md:bg-white md:shadow-lg ring-0 md:ring-1"
    >
      <h2 class="text-3xl font-bold">Get started with Jira</h2>
      <p class="mt-2">It’s free for up to 10 users - no credit card needed.</p>

      <LayoutsTryForm class="mt-10 w-full max-w-md" />

      <div class="my-8 text-sm text-zinc-500">
        <p>
          Already have Jira?
          <NuxtLink to="/sign-in" class="text-blue-600 hover:underline"
            >Sign in</NuxtLink
          >
        </p>
      </div>
    </UCard>

    <p class="text-zinc-500 mb-10">
      <UIcon name="simple-icons:atlassian" />
      <span class="text-xl font-black ml-1.5 tracking-widest">ATLASSIAN</span>
    </p>
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
