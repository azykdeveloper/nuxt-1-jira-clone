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
</script>

<template>
  <UForm
    :validate="validate"
    :state="state"
    class="space-y-6 w-md"
    @submit="onSubmit"
  >
    <UFormField
      class=""
      label="Work email"
      help="Using a work email helps find teammates and boost collaboration."
      name="email"
    >
      <UInput
        size="xl"
        placeholder="you@company.com"
        v-model="state.email"
        class="w-full"
        style="border-radius: 50px; padding: 10px 20px"
      />
    </UFormField>

    <UButton
      type="submit"
      class="rounded-full text-center font-semibold text-xl justify-center w-full py-2 text-zinc-50 cursor-pointer"
    >
      Sign up
    </UButton>

    <USeparator label="Or continue with" color="secondary" size="sm" />

    <div class="grid grid-cols-2 gap-4">
      <SharedSocialLoginButton icon="devicon:google" label="Google" />
      <SharedSocialLoginButton icon="logos:microsoft-icon" label="Microsoft" />
      <SharedSocialLoginButton icon="logos:apple" label="Apple" />
      <SharedSocialLoginButton icon="devicon:slack" label="Slack" />
    </div>
  </UForm>
</template>
