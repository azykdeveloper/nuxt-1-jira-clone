<template>
  <div>
    <SharedLoader v-if="loadingStore.isLoading" />

    <template v-else>
      <LayoutsMainNavbar />
      <section>
        <slot></slot>
      </section>
    </template>
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

