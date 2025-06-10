<script setup lang="ts">
import { ID } from "appwrite";
import { DATABASES } from "~/libs/appwrite";
import { useCommentsQuery } from "~/query/use-comments";

const text = ref("");
const { data, refetch, isLoading } = useCommentsQuery();
const toast = useToast()

const onSubmit = async () => {
  if (!text.value) {
    toast.add({ title: "Error", description: "Comment is empty.", color: "error" });
    return
  }
  try {
    await DATABASES.createDocument("jira-db", "comments", ID.unique(), {
      deal: useCurrentDealStore().currentDeal?.$id,
      text: text.value,
    });
    toast.add({ title: "Success", description: "Comment has been added.", color: "success" });
    text.value = "";
    refetch();
  } catch (e: any) {
    toast.add({ title: "Error", description: e.message, color: "error" });
  }
};
</script>

<template>
  <UTextarea
    v-model="text"
    placeholder="Write a comment..."
    class="w-full"
    size="xl"
  >
    <template #trailing>
      <UButton
        class="cursor-pointer text-[26px]"
        icon="ic:round-send"
        variant="link"
        @click="onSubmit"
      ></UButton>
    </template>
  </UTextarea>

  <div class="mt-5">
    <div v-if="isLoading" class="">
      <USkeleton class="h-14 w-full mt-3" />
      <USkeleton class="h-14 w-full mt-3" />
      <USkeleton class="h-14 w-full mt-3" />
      <USkeleton class="h-14 w-full mt-3" />
    </div>

    <div
      v-else
      v-for="comment in data"
      :key="comment.$id"
      class="mt-3  flex flex-col items-end "
    >
      <p class="bg-blue-800/30 px-3 py-3 rounded-l-xl rounded-tr-xl  inline-block">{{ comment.text }} </p>
      <p class="text-xs text-blue-400 text-end mt-1 " >
         {{
          new Date(comment.$createdAt).toLocaleDateString()
        }}
      </p>
    </div>
  </div>
</template>
