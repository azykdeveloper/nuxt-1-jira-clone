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
    <div v-else class="grid grid-cols-4 gap-2" >
      <div v-for="column in data" :key="column.id">
        <UButton class="h-10 cursor-pointer w-full " variant="outline">
          <span>{{ column.name }}</span>
          <span>{{ column.items.length }}</span>
        </UButton>

        <div class="text-center">
          <LayoutsDocCreateDeal class="my-3" :status="column.id" :refetch="refetch" />
        </div>

        <UCard
          v-if="column.items"
          v-for="deal in column.items"
          :key="deal.$id"
          role="button"
          class="bg-[#fff] dark:bg-zinc-900 shadow-xl mb-3"
          draggable="true"
        >
          <template #header>
            <span class="font-bold text-lg uppercase">{{ deal.name }}</span>
          </template>

          <p>{{ deal.description }}</p>

          <template #footer>
            <span role="button" class="text-sm text-blue-500 font-bold cursor-pointer hover:opacity-60 ">More details > </span>
          </template>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStatusQuery } from "~/query/use-status-query";

definePageMeta({
  layout: "documents",
  middleware: ["registered"],
});

useHead({
  title: "Documents | Jira",
});

const { data, isLoading, refetch } = useStatusQuery();
console.log(data);
</script>
