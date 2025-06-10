<template>
  <div
    class="flex items-center justify-between gap-3 border-b border-b-zinc-500/50 pb-3 mb-5"
  >
    <h2 class="text-3xl font-bold">In Progress</h2>

    <LayoutsDocCreateDeal
      :status="EnumStatus['in-progress']"
      :refetch="refetch"
    />
  </div>

  <div v-if="isLoading" class="grid grid-cols-4 gap-3">
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
    <USkeleton class="h-30 bg-zinc-500/20" />
  </div>
  <div v-else class="h-[70vh]">
    <div v-if="!data?.length" class="flex items-center justify-center h-full">
      <NuxtImg src="https://static.vecteezy.com/system/resources/thumbnails/022/278/184/small_2x/file-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png" width="300px" />
    </div>
    <div v-else class="grid grid-cols-4 gap-3">
      <div
        v-for="deal in data"
        :key="deal.$id"
        class="bg-[#fff] dark:bg-zinc-900 shadow-xl rounded-lg px-5 pt-5 pb-1 flex flex-col justify-between group"
      >
        <div>
          <h3 class="font-bold text-lg uppercase mb-3">
            {{ deal.name }}
          </h3>

          <p class="text-zinc-500 mb-5">
            {{ deal.description.slice(0, 80) }}...
          </p>
        </div>

        <div
          class="border-t border-t-zinc-500/50 opacity-0 group-hover:opacity-100 flex justify-end transition-all duration-300 items-center"
        >
          <UButton
            icon="material-symbols:chrome-reader-mode"
            variant="link"
            class="cursor-pointer text-2xl text-zinc-500"
            @click="setCurrentDeal(deal)"
            title="read"
          />
          <UButton
            icon="material-symbols:edit-square"
            variant="link"
            class="cursor-pointer text-2xl text-zinc-500"
            color="success"
            @click="editDealStore.setCurrentDeal(deal)"
            title="edit"
          />
          <UButton
            icon="i-heroicons-trash"
            variant="link"
            class="cursor-pointer text-2xl text-zinc-500"
            @click="handleDelete(deal.$id)"
            color="error"
            title="delete"
          />
        </div>
      </div>
    </div>

    <LayoutsDocSlideOver />
    <LayoutsDocEditDeal :refetch="refetch" />
  </div>
</template>

<script setup lang="ts">
import { useDealsQuery } from "~/query/use-deals";
import { useDeleteQuery } from "~/query/use-delete";
import { EnumStatus } from "~/types";

definePageMeta({
  layout: "documents",
  middleware: ["registered"],
});
useHead({ title: "In Progress | Jira" });

const { data, isLoading, refetch } = useDealsQuery(EnumStatus["in-progress"]);
const { isPending, deleteDeal } = useDeleteQuery(refetch);
const { setCurrentDeal } = useCurrentDealStore();
const editDealStore = useEditDealStore();

function handleDelete(id: string) {
  const confirm = window.confirm("Are you sure you want to delete this deal?");
  if (confirm) {
    deleteDeal(id);
  }
}
</script>
