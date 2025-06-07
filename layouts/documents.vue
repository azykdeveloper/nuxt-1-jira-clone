<template>
  <div>
    <SharedLoader v-if="loadingStore.isLoading" />
    <div v-else>
      <LayoutsDocNavbar />
      <LayoutsDocSidebar />
      <section class="pt-[calc(72px+24px)] md:pl-[312px] pl-3 pr-3 p-5 h-screen bg-zinc-50 dark:bg-zinc-800 overflow-auto">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ACCOUNT } from "~/libs/appwrite";
import { useLoadingStore } from "~/store/loading.store";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

onMounted(async () => {
  if (!authStore.user) {
    loadingStore.setLoading(true);

    try {
      const user = await ACCOUNT.get();
      authStore.setUser({
        id: user.$id,
        name: user.name,
        email: user.email,
        status: user.status,
      });
    } catch (error) {
      authStore.clearUser();
    } finally {
      loadingStore.setLoading(false);
    }
  }
});

</script>