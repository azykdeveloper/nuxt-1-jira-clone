<script setup lang="ts">
useHead({
  title: "Home Page",
});
</script>

<template>
  <!-- HERO -->
  <section class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 pt-[10vh]">
    <!-- section 1 -->
    <div
      class="max-w-5xl mx-auto py-14 px-4 flex flex-col md:flex-row gap-10 flex-1 items-center justify-between text-center md:text-left">
      <!-- title -->
      <div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl leading-10 md:leading-16 text-zinc-900 dark:text-zinc-50">
          <b>Great outcomes</b> <br />
          start with Jira
        </h1>
        <p class="mt-6 md:mt-10 md:text-xl max-w-64 md:max-w-96">
          The only project management tool you need to plan and track work
          across every team.
        </p>
      </div>

      <!-- form -->
      <LayoutsMainForm />
    </div>
  </section>
</template>

<style></style>
