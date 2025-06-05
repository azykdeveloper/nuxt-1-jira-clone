<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { ACCOUNT, IDENTITY } from "~/libs/appwrite";

const state = reactive({
  fullName: "",
  email: "",
  password: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];

  // fullName validation
  if (!state?.fullName)
    errors.push({
      name: "fullName",
      message: "Please enter a fullName.",
    });
  else if (state.fullName.length < 3)
    errors.push({
      name: "fullName",
      message: "fullName must be at least 3 characters long.",
    });

  // Email validation
  if (!state.email)
    errors.push({
      name: "email",
      message: "Please enter a valid email address.",
    });
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
    errors.push({
      name: "email",
      message: "Please enter a valid email address.",
    });

  // Password validation
  if (!state.password)
    errors.push({
      name: "password",
      message: "Please enter a password.",
    });
  else if (state.password.length < 6)
    errors.push({
      name: "password",
      message: "Password must be at least 6 characters long.",
    });

  return errors;
};

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const { fullName, email, password } = event.data;

  if (props.status === "sign-up") {
    toast.add({
      title: "Sign Up Success",
      description: "You have signed up successfully.",
      color: "success",
    });

    // Sign up logic here
    try {
      const response = await ACCOUNT.create(
        IDENTITY,
        email,
        password,
        fullName,
      );
      console.log("Sign up response -> ", response);
    } catch (error) {
      console.log(error);
    }
  } else if (props.status === "sign-in") {
    toast.add({
      title: "Sign In Success",
      description: "You have signed in successfully.",
      color: "success",
    });

    console.log("Sign in -> ", event.data);
    // Sign in logic here

    try {
      const response = await ACCOUNT.createEmailPasswordSession(
        email,
        password
      );
      console.log("Sign up response -> ", response);
    } catch (error) {}
  }
}

// PROPS
const props = defineProps<{
  status?: "sign-in" | "sign-up";
}>();
</script>

<template>
  <UForm :validate="validate" :state="state" class="w-md" @submit="onSubmit">
    <UFormField name="username" v-if="props.status === 'sign-up'">
      <template #label>
        <span class="text-zinc-800"
          >Username<span class="text-red-700">*</span></span
        >
      </template>

      <UInput
        type="text"
        autocomplete="username"
        size="xl"
        placeholder="Enter your username"
        v-model="state.fullName"
        class="w-full bg-[#fff] -mb-1"
        style="padding: 10px 20px"
      />
    </UFormField>
    <UFormField name="email" class="mt-4">
      <template #label>
        <span class="text-zinc-800"
          >Email<span class="text-red-700">*</span></span
        >
      </template>

      <UInput
        type="email"
        autocomplete="email"
        size="xl"
        placeholder="Enter your email"
        v-model="state.email"
        class="w-full bg-[#fff] -mb-1"
        style="padding: 10px 20px"
      />
    </UFormField>
    <UFormField name="password" class="mt-4">
      <template #label>
        <span class="text-zinc-800"
          >Password<span class="text-red-700">*</span></span
        >
      </template>

      <UInput
        type="password"
        size="xl"
        placeholder="Enter your password"
        v-model="state.password"
        class="w-full bg-[#fff] -mb-1"
        style="padding: 10px 20px"
      />
    </UFormField>

    <p
      v-if="props.status === 'sign-up'"
      class="text-xs text-left mt-2 text-zinc-400"
    >
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
