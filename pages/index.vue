<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
useHead({
  title: "Home Page",
});

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
  <!-- HERO -->
  <section
    class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 pt-[10vh] bg-auto"
  >
    <!-- section 1 -->
    <div
      class=" max-w-5xl mx-auto py-14 px-10 m-0 flex flex-col md:flex-row gap-10 flex-1 items-center justify-between text-center md:text-left"
    >
      <!-- title -->
      <div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl leading-10 md:leading-16 text-zinc-900 dark:text-zinc-50"
        >
          <b class="font-bold">Great outcomes</b> <br />
          start with
          <span class="relative inline-block"
            >Jira
            <img class="absolute -bottom-4" src="/public/jira.webp" alt="jira"
          /></span>
        </h1>
        <p class="mt-6 md:mt-10 md:text-xl max-w-64 md:max-w-96">
          The only project management tool you need to plan and track work
          across every team.
        </p>
      </div>

      <!-- Form -->
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-6 w-full sm:w-96"
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
          class="rounded-full text-center font-semibold text-lg sm:text-xl justify-center w-full py-2 text-zinc-50 cursor-pointer"
        >
          Sign up
        </UButton>

        <USeparator label="Or continue with" color="secondary" size="sm" />

        <div class="grid grid-cols-2 gap-4">
          <SharedSocialLoginButton icon="devicon:google" label="Google" />
          <SharedSocialLoginButton
            icon="logos:microsoft-icon"
            label="Microsoft"
          />
        </div>
      </UForm>
    </div>
  </section>
</template>

<style scoped></style>
