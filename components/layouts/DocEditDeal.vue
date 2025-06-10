<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { DATABASES } from "~/libs/appwrite";

const props = defineProps({
  refetch: {
    type: Function,
    required: true,
  },
});

const editDealStore = useEditDealStore();

const isOpen = computed({
  get: () => editDealStore.isOpen,
  set: (value) => {
    editDealStore.isOpen = value;
  },
});

const state = reactive({
  name: editDealStore.currentDeal?.name,
  description: editDealStore.currentDeal?.description,
});

watch(
  () => editDealStore.currentDeal,
  () => {
    state.name = editDealStore.currentDeal?.name;
    state.description = editDealStore.currentDeal?.description;
  }
);

const toast = useToast();

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name)
    errors.push({
      name: "name",
      message: "Name is required",
    });
  if (!state.description)
    errors.push({
      name: "description",
      message: "Description is required",
    });
  return errors;
};

const { isPending, mutate } = useMutation({
  mutationKey: ["edit-deal", editDealStore.currentDeal?.$id],
  mutationFn: async (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    await DATABASES.updateDocument("jira-db", "deals", data.id, {
      name: data.name,
      description: data.description,
    });
  },
  onSuccess: () => {
    props.refetch();
    toast.add({
      title: "Success",
      description: "Deal has been updated.",
      color: "success",
    });

    isOpen.value = false;
  },
});

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  mutate({
    id: editDealStore.currentDeal?.$id!,
    name: event.data.name!,
    description: event.data.description!,
  });
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Edit Deal" description="Update the deal details below." >

    <template #content>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 w-96 p-5"
        @submit="onSubmit"
      >
        <UFormField help="" name="name">
          <UInput
            placeholder="Deal name"
            v-model="state.name"
            class="w-full -mb-2"
            color="success"
          />
        </UFormField>
        <UFormField help="" name="description">
          <UTextarea
            placeholder="Description..."
            v-model="state.description"
            class="w-full -mb-2"
            color="success"
          />
        </UFormField>

        <UButton
          type="submit"
          class="font-semibold block w-full cursor-pointer"
          :loading="isPending"
          :disabled="isPending"
          loading-icon="eos-icons:bubble-loading"
          color="success"
        >
          Add
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
