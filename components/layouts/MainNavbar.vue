<script setup lang="ts">
import { ACCOUNT } from "~/libs/appwrite";

const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const user = authStore.user;

async function logout() {
  loadingStore.setLoading(true)
  if (confirm("Are you sure you want to logout?")) {
    try {
      await ACCOUNT.deleteSession("current");
      authStore.clearUser(); // agar store ishlatyotgan bo‘lsangiz
      await router.push("/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      loadingStore.setLoading(false)
    }
  }
}
</script>

<template>
  <header
    class="h-[10vh] fixed top-0 left-0 right-0 dark:bg-zinc-950 bg-[#fff] z-50"
  >
    <UContainer class="h-full flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <UIcon name="logos:jira" class="text-xl translate-y-0.5" />
        <span class="text-2xl font-medium">Jira</span>
      </NuxtLink>

      <div class="flex items-center">
        <SharedColorModeButton class="mr-4" />

        <template v-if="user?.status">
          <UButton
            class="cursor-pointer rounded-full px-3 sm:px-6 sm:py-2"
            variant="link"
            color="error"
            @click="logout"
            >Logout</UButton
          >

          <UButton
            variant="link"
            class="cursor-pointer text-zinc-700 dark:text-zinc-100 hover:text-zinc-400"
            >@{{ user.name }}</UButton
          >
        </template>

        <template v-else>
          <UButton
            class="cursor-pointer rounded-full text-zinc-50 px-3 sm:px-6 sm:py-2"
            >Get it free</UButton
          >
          <USeparator
            color="secondary"
            orientation="vertical"
            class="h-6 mx-2"
          />
          <NuxtLink to="/sign-in">
            <UButton
              class="cursor-pointer rounded-full px-3 sm:px-6 sm:py-2"
              variant="outline"
              >Sign in</UButton
            >
          </NuxtLink>
        </template>
      </div>
    </UContainer>
  </header>
</template>
