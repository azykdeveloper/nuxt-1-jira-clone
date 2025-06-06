<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

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
  } else {
    loadingStore.setLoading(false)
  }
}

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Logout',
    icon: 'ic:outline-logout',
    color: 'error'
  },
])

const handleItemClick = (label: string) => {
  switch (label) {
    case 'Profile':
      console.log('Navigate to profile')
      break
    case 'Logout':
      logout()
      break
    default:
      console.log('Unknown action')
  }
}
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
    :ui="{ content: 'w-48' }"
  >
    <UButton :label="user?.name" color="neutral" class="cursor-pointer" variant="outline" />

    <!-- SLOT for custom item click behavior -->
    <template #item="{ item }">
      <UButton
        :color="item.color ?? 'neutral'"
        variant="ghost"
        class="w-full justify-start"
        :icon="item.icon"
        :label="item.label"
        @click="handleItemClick(item.label ?? '')"
      />
    </template>
  </UDropdownMenu>
</template>
