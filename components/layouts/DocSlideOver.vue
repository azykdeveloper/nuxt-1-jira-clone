<script setup lang="ts">
const currentDealStore = useCurrentDealStore();

// SlideOver
const isOpen = computed({
  get: () => currentDealStore.isOpen,
  set: (value) => currentDealStore.toggle(),
});

// Description  
const expended = ref(true);
watch(
  () => currentDealStore.currentDeal?.description,
  (desc) => {
    expended.value = !(desc && desc.length > 200);
  },
  { immediate: true }
);
function toggleExpended() {
  expended.value = !expended.value;
}
</script>

<template>
  <USlideover v-model:open="isOpen" class="overflow-auto">
    <template #content>
      <!-- Top -->
      <div id="top" class="p-4 m-4 border border-dashed">
        <!-- Deal name -->
        <h3 class="flex items-center justify-between mb-5">
          <div class="flex gap-3 items-center">
            <span class="font-semibold text-xl">{{
              currentDealStore.currentDeal?.name
            }}</span>
            <UBadge class="text-zinc-900 dark:text-zinc-50 bg-red-500/50">
              {{ currentDealStore.currentDeal?.status }}
            </UBadge>
          </div>

          <UButton
            icon="material-symbols:close"
            class="text-xl cursor-pointer"
            variant="outline"
            color="error"
            @click="isOpen = false"
          />
        </h3>

        <!-- Created -->
        <div>
          <p class="text-xs text-zinc-500 font-semibold">Created:</p>
          <p>
            {{
              currentDealStore.currentDeal?.$createdAt
                ? new Date(
                    currentDealStore.currentDeal.$createdAt
                  ).toLocaleDateString()
                : ""
            }}
          </p>
        </div>

        <!-- Description -->
        <div class="mt-3">
          <p class="text-xs text-zinc-500 font-semibold">Description:</p>

          <div v-if="expended" class="">
            <p>{{ currentDealStore.currentDeal?.description }}</p>

            <div
              v-if="
                currentDealStore.currentDeal?.description &&
                currentDealStore.currentDeal.description.length > 200
              "
              class="text-center mt-3 text-blue-500"
            >
              <UIcon
                name="heroicons:chevron-up"
                role="button"
                class="text-2xl cursor-pointer hover:opacity-50"
                @click="toggleExpended"
              />
            </div>
          </div>
          <div v-else class="relative">
            <p class="">
              {{ currentDealStore.currentDeal?.description.slice(0, 200) }}...
            </p>
            <div
              class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent dark:to-zinc-900 to-[#fff]"
            ></div>

            <div class="text-center mt-3 text-blue-500">
              <UIcon
                name="heroicons:chevron-down"
                role="button"
                class="text-2xl cursor-pointer hover:opacity-50"
                @click="toggleExpended"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Comment -->
      <div class="m-4">
        <LayoutsDocComments />
      </div>
    </template>
  </USlideover>
</template>
