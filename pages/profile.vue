<template>
  <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-screen flex items-center justify-center">
    <UCard class="shadow-lg bg-[#fff] dark:bg-zinc-900 w-[400px]" variant="soft">
      <h2 class="text-3xl font-bold text-center border-b border-b-zinc-500/50 pb-3">Profile</h2>

      <div class="mt-5 flex items-center gap-3">
        <UAvatar :alt="authStore.user?.name" size="3xl"  />
        <div>
          <div class="flex gap-x-2">
            <span class="text-zinc-500 font-bold">Name:</span>
            <span>{{ authStore.user?.name }}</span>
          </div>
          <div class="flex gap-x-2">
            <span class="text-zinc-500 font-bold">Email:</span>
            <span>{{ authStore.user?.email }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <UButton color="error" label="Logout" block class="cursor-pointer" @click="logout"/>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ACCOUNT } from '~/libs/appwrite';

definePageMeta({
  // layout: "auth",
  middleware: ["registered"],
});
useHead({
  title: "Profile | Jira",
});

const authStore = useAuthStore();
const router = useRouter()

async function logout() {
  useLoadingStore().setLoading(true)
  if (confirm("Are you sure you want to logout?")) {
    try {
      await ACCOUNT.deleteSession("current");
      authStore.clearUser(); // agar store ishlatyotgan bo‘lsangiz
      await router.push("/sign-in");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      useLoadingStore().setLoading(false)
    }
  } else {
    useLoadingStore().setLoading(false)
  }
}
</script>