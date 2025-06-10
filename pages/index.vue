<script setup lang="ts">
useHead({
  title: "Jira",
});

const authStore = useAuthStore();


</script>

<template>
  <!-- HERO -->
  <section
    class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 pt-[10vh] bg-auto"
  >
    <!-- section 1 -->
    <div
      v-if="!authStore.user"
      class=" h-[90vh] max-w-5xl mx-auto py-14 px-10 m-0 flex flex-col md:flex-row gap-10 flex-1 items-center justify-between text-center md:text-left"
    >
      <!-- title -->
      <div class="flex-1">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl leading-10 md:leading-16 text-zinc-900 dark:text-zinc-50"
        >
          <b class="font-bold">Great outcomes</b> <br />
          start with
          <span class="relative inline-block"
            >Jira
            <img class="absolute -bottom-4" src="/public/jira.webp" alt="jira"
          /></span>
        </h1>
        <p class="mt-6 md:mt-10 md:text-xl max-w-64 md:max-w-96">
          The only project management tool you need to plan and track work
          across every team.
        </p>
      </div>

      <div class="hidden md:block relative">
        <img src="/public/jira.png" alt="jira" width="300" height="300">
        <div style="filter: blur(200px);" class=" absolute w-[300px] h-[300px] rounded-full top-0 bg-blue-600 "> </div>
      </div>
    </div>

    <!-- section 2 -->
     <div v-else class="max-w-5xl mx-auto py-14 px-10  gap-10 flex-1 items-center justify-between text-center md:text-left">
      <h1 class="text-5xl font-bold">Hello, {{ authStore.user.name }}</h1>
      <p class="mt-6 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et beatae, iusto, dolore magni perspiciatis voluptas illo dolor quibusdam, saepe nihil provident fugit. Ea dicta voluptatum, quis ducimus aperiam deserunt. Dolor?</p>
     </div>
  </section>
</template>

<style scoped></style>
