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
        class="px-2"
        :class="
          isMoving
            ? '  border-l border-r border-dashed border-zinc-500/50 h-screen'
            : ''
        "
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

        <UCard
          v-if="column.items"
          v-for="deal in column.items"
          :key="deal.$id"
          role="button"
          class="bg-[#fff] dark:bg-zinc-900 shadow-xl mb-3 card-animation"
          draggable="true"
          @dragstart="handleDragStart(deal, column)"
          :class="isPending ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <template #header>
            <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
          </template>

          <p>{{ deal.description.slice(0, 80) }}...</p>

          <template #footer>
            <span
              role="button"
              @click="setCurrentDeal(deal)"
              class="text-sm text-blue-500 cursor-pointer hover:opacity-60 border-b "
              >More
            </span>
          </template>
        </UCard>
      </div>
    </div>


  </section>

  <SharedSlideOver />
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { DATABASES } from "~/libs/appwrite";
import { useStatusQuery } from "~/query/use-status-query";
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
