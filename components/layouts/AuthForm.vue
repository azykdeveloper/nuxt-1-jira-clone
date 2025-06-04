<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const state = reactive({
  email: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({
      name: "email",
      message: "Please enter a valid email address.",
    });
  return errors;
};

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}

// PROPS
const props = defineProps<{
  status?: "sign-in" | "sign-up";
}>();
</script>

<template>
  <UForm :validate="validate" :state="state" class="w-md" @submit="onSubmit">
    <UFormField name="email">
      <template #label v-if="props.status === 'sign-in'">
        <span class="text-zinc-800">Email<span class="text-red-700">*</span></span>
      </template>

      <UInput
        size="xl"
        placeholder="Enter your email"
        v-model="state.email"
        class="w-full "
        style="padding: 10px 20px"
        :style="'background-color: #fff;'"
      />
    </UFormField>

    <p v-if="props.status === 'sign-up'" class="text-xs text-left mt-2 text-zinc-400">
      By signing up, I accept the Atlassian Cloud Terms of Service﻿, (opens new
      window) and acknowledge the Privacy Policy﻿, (opens new window).
    </p>

    <UButton
      v-if="props.status === 'sign-up'"
      type="submit"
      class="rounded-sm text-center font-semibold text-md justify-center w-full py-2 mt-3 text-zinc-50 cursor-pointer"
    >
      Sign up
    </UButton>
    <UButton
      v-if="props.status === 'sign-in'"
      type="submit"
      class="rounded-sm text-center font-semibold text-md justify-center w-full py-2 mt-3 text-zinc-50 cursor-pointer"
    >
      Continue
    </UButton>

    <p class="text-sm text-zinc-500 font-semibold my-4">Or continue with:</p>

    <div class="grid grid-cols-1 gap-4">
      <SharedSocialLoginButton
        class="rounded-sm dark:bg-[#fff] dark:text-zinc-900 !ring-zinc-200"
        icon="devicon:google"
        label="Google"
      />
      <SharedSocialLoginButton
        class="rounded-sm dark:bg-[#fff] dark:text-zinc-900 !ring-zinc-200"
        icon="logos:microsoft-icon"
        label="Microsoft"
      />
      <SharedSocialLoginButton
        class="rounded-sm dark:bg-[#fff] dark:text-zinc-900 !ring-zinc-200"
        icon="logos:apple"
        label="Apple"
      />
      <SharedSocialLoginButton
        class="rounded-sm dark:bg-[#fff] dark:text-zinc-900 !ring-zinc-200"
        icon="devicon:slack"
        label="Slack"
      />
    </div>
  </UForm>
</template>
