<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { useMutation } from "@tanstack/vue-query";
import { DATABASES, IDENTITY } from "~/libs/appwrite";
import type { EnumStatus, IDealForm } from "~/types";

const state = reactive({
  name: undefined,
  description: undefined,
});
const props = defineProps<{
  status: EnumStatus;
  refetch: () => any;
}>();
const toast = useToast();
const { user } = useAuthStore();

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
  mutationKey: ["create-deal"],
  mutationFn: async (data: IDealForm) =>
    DATABASES.createDocument("jira-db", "deals", IDENTITY, data),
  onSuccess: () => {
    toast.add({
      title: "Success",
      description: "The deal has been created.",
      color: "success",
    });
    props.refetch();
    state.name = undefined;
    state.description = undefined;
  },
  onError: () => {
    toast.add({
      title: "Error",
      description: "The deal has not been created.",
      color: "error",
    });
  },
  
});

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  mutate({
    name: event.data.name!,
    description: event.data.description!,
    status: props.status,
    userId: user?.id!,
  });
}
</script>

<template>
  <UPopover
    :content="{
      align: 'center',
      side: 'bottom',
      sideOffset: 8,
    }"
  >
    <UButton
      icon="radix-icons:plus-circled"
      class="text-2xl cursor-pointer"
      variant="link"
    />

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
          />
        </UFormField>
        <UFormField help="" name="description">
          <UTextarea
            placeholder="Description..."
            v-model="state.description"
            class="w-full -mb-2"
          />
        </UFormField>

        <UButton
          type="submit"
          class="font-semibold block w-full cursor-pointer"
          :loading="isPending"
          :disabled="isPending"
          loading-icon="eos-icons:bubble-loading"
        >
          Add
        </UButton>
      </UForm>
    </template>
  </UPopover>
</template>
