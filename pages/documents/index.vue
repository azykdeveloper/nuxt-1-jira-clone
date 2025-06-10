<template>
  <section>
    <div v-if="isLoading" class="grid grid-cols-4 gap-2">
      <USkeleton class="h-10 bg-blue-500/50" />
      <USkeleton class="h-10 bg-blue-500/50" />
      <USkeleton class="h-10 bg-blue-500/50" />
      <USkeleton class="h-10 bg-blue-500/50" />

      <USkeleton class="h-50 bg-blue-500/50" />
      <USkeleton class="h-50 bg-blue-500/50" />
      <USkeleton class="h-50 bg-blue-500/50" />
      <USkeleton class="h-50 bg-blue-500/50" />
    </div>
    <div v-else class="grid grid-cols-4">
      <div
        v-for="column in data"
        :key="column.id"
        @dragover="handleDragOver"
        @drop="handleDrop(column)"
        class="px-2 h-full border-l border-dashed border-transparent"
        :class="[isMoving ? 'border-zinc-500/50' : '', 'last:border-r']"
      >
        <UButton class="h-10 cursor-pointer w-full" variant="outline">
          <span>{{ column.name }}</span>
          <span>{{ column.items.length }}</span>
        </UButton>

        <div class="text-center">
          <LayoutsDocCreateDeal
            class="my-3"
            :status="column.id"
            :refetch="refetch"
          />
        </div>

        <div
          v-if="column.items"
          v-for="deal in column.items"
          :key="deal.$id"
          class="bg-[#fff] dark:bg-zinc-900 shadow-xl rounded-lg px-5 pt-5 pb-1 flex flex-col justify-between mb-4"
          draggable="true"
          @dragstart="handleDragStart(deal, column)"
          :class="isPending ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <div>
            <h3 class="font-bold text-lg uppercase mb-3">{{ deal.name }}</h3>

            <p class="text-zinc-500 mb-5">{{ deal.description.slice(0, 80) }}...</p>
          </div>

          <div
            class="border-t border-t-zinc-500/50 flex justify-end items-center"
          >
            <UButton
              icon="material-symbols:chrome-reader-mode"
              variant="link"
              class="cursor-pointer text-2xl text-zinc-500"
              @click="setCurrentDeal(deal)"
            />
            
          </div>
        </div>
      </div>
    </div>
  </section>

  <DocSlideOver />
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import DocSlideOver from "~/components/layouts/DocSlideOver.vue";
import { DATABASES } from "~/libs/appwrite";
import { useStatusQuery } from "~/query/use-status";
import type { IDeal, IStatuses } from "~/types";

definePageMeta({
  layout: "documents",
  middleware: ["registered"],
});
useHead({ title: "Documents | Jira" });

const { setCurrentDeal } = useCurrentDealStore();
const { data, isLoading, refetch } = useStatusQuery();
const dragCardRef = ref<IDeal | null>(null);
const sourceColumnRef = ref<IStatuses | null>(null);
const isMoving = ref(false);

const { mutate, isPending } = useMutation({
  mutationKey: ["moveCard"],
  mutationFn: async ({ docId, status }: { docId: string; status: string }) => {
    return DATABASES.updateDocument("jira-db", "deals", docId, { status });
  },
  onSuccess: () => refetch(),
});

// Drag and Drop
const handleDragStart = (deal: IDeal, column: IStatuses) => {
  isMoving.value = true;
  dragCardRef.value = deal;
  sourceColumnRef.value = column;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  // event.stopPropagation();
};

const handleDrop = (column: IStatuses) => {
  isMoving.value = false;
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({
      docId: dragCardRef.value.$id,
      status: column.id,
    });
  }
};
</script>

<style scoped>
@keyframes show {
  from {
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }
  to {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}

.card-animation {
  animation: show 0.3s ease-in-out;
}
</style>
