<template>
  <header class="h-[10vh] fixed top-0 left-0 right-0 dark:bg-zinc-950 bg-[#fff] z-50">
    <UContainer class="h-full flex items-center justify-between ">
      <NuxtLink to="/" class="flex items-center gap-2">
         <UIcon name="logos:jira" class="text-xl translate-y-0.5" />
        <span class="text-2xl font-medium">Jira</span>
      </NuxtLink>

      <div class="flex items-center ">
        <SharedColorModeButton class="mr-4"/>

        <NuxtLink to="/sign-up">
          <UButton class="cursor-pointer rounded-full px-6 text-zinc-50" size="xl">Get it free</UButton>
        </NuxtLink>

        <USeparator color="secondary" orientation="vertical" class="h-6 ml-5 mr-2" />

        <NuxtLink to="/sign-in">
          <UButton class="cursor-pointer rounded-full" size="xl" variant="link" >Sign in</UButton>
        </NuxtLink>
      </div>
    </UContainer>
  </header>
</template>