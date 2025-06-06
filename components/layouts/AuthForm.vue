<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { ACCOUNT, IDENTITY } from "~/libs/appwrite";

// PROPS
const props = defineProps<{
  status: "sign-in" | "sign-up";
}>();

// COMPOSABLE
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

// DATA
const state = reactive({
  fullName: "",
  email: "",
  password: "",
});
let isLoading = ref(false);
let error = ref("");

// VALIDATION
const validate = (state: any): FormError[] => {
  const errors = [];

  if (props.status === "sign-up") {
    if (!state.fullName || state.fullName.length < 3) {
      errors.push({
        name: "fullName",
        message: "Full name must be at least 3 characters long.",
      });
    }
  }

  if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({
      name: "email",
      message: "Please enter a valid email address.",
    });
  }

  if (!state.password || state.password.length < 6) {
    errors.push({
      name: "password",
      message: "Password must be at least 6 characters long.",
    });
  }

  return errors;
};

async function signUp({ data }: FormSubmitEvent<typeof state>) {
  isLoading.value = true;
  try {
    await ACCOUNT.create(IDENTITY, data.email, data.password, data.fullName);
    toast.add({ title: "Success", description: "Signed up successfully.", color: "success" });
    await router.push("/sign-in");
  } catch (e: any) {
    error.value = e.message || "Sign up failed.";
    toast.add({ title: "Error", description: error.value, color: "error" });
  } finally {
    isLoading.value = false;
  }
}

async function signIn({ data }: FormSubmitEvent<typeof state>) {
  isLoading.value = true;
  try {
    await ACCOUNT.createEmailPasswordSession(data.email, data.password);
    const user = await ACCOUNT.get();

    authStore.setUser({
      id: user.$id,
      name: user.name || "",
      email: user.email || "",
      status: user.status
    });

    toast.add({ title: "Success", description: "Signed in successfully.", color: "success" });
    await router.push("/");
  } catch (e: any) {
    error.value = e.message || "Sign in failed.";
    toast.add({ title: "Error", description: error.value, color: "error" });
  } finally {
    isLoading.value = false;
  }
}

// async function logout() {
//   try {
//     await ACCOUNT.deleteSession('current');
//     authStore.clearUser(); // agar store ishlatyotgan bo‘lsangiz
//     await router.push("/sign-in");
//   } catch (err) {
//     console.error("Logout error:", err);
//   }
// }


const onSubmit = (event: FormSubmitEvent<typeof state>) => {
  if (props.status === "sign-up") return signUp(event);
  if (props.status === "sign-in") return signIn(event);
};
</script>

<template>
  <div class="auth-form-root">
    <UAlert
      v-if="error"
      title="Error!"
      :description="error"
      icon="i-lucide-terminal"
      color="error"
      variant="subtle"
      class="absolute top-2 left-1/2 transform -translate-x-1/2 w-xl z-50 text-left"
    />
    <UForm :validate="validate" :state="state" @submit.prevent="onSubmit">
      <UFormField
        v-if="props.status === 'sign-up'"
        label="Full name *"
        name="fullName"
      >
        <UInput
          type="text"
          v-model="state.fullName"
          size="xl"
          placeholder="Enter your full name"
          class="w-full -mb-1"
          style="padding: 10px 20px"
          autocomplete="name"
        />
      </UFormField>
      <UFormField name="email" label="Email *" class="mt-4">
        <UInput
          type="email"
          v-model="state.email"
          size="xl"
          placeholder="Enter your email"
          class="w-full -mb-1"
          style="padding: 10px 20px"
          autocomplete="email"
        />
      </UFormField>
      <UFormField name="password" label="Password *" class="mt-4">
        <UInput
          type="password"
          v-model="state.password"
          size="xl"
          placeholder="Enter your password"
          class="w-full -mb-1"
          style="padding: 10px 20px"
        />
      </UFormField>

      <p
        v-if="props.status === 'sign-up'"
        class="text-xs text-left mt-2 text-zinc-400"
      >
        By signing up, I accept the Atlassian Cloud Terms of Service﻿, (opens
        new window) and acknowledge the Privacy Policy﻿, (opens new window).
      </p>

      <UButton
        type="submit"
        class="rounded-sm text-md block w-full mt-4 py-2 font-semibold text-zinc-50 cursor-pointer"
        :loading="isLoading"
        :disabled="isLoading"
        loading-icon="eos-icons:bubble-loading"
      >
        {{ props.status === "sign-up" ? "Sign Up" : "Continue" }}
      </UButton>

      <p class="text-sm text-zinc-500 font-semibold my-4">Or continue with:</p>

      <div class="grid grid-cols-1 gap-4">
        <SharedSocialLoginButton
          class="rounded-sm"
          icon="devicon:google"
          label="Google"
        />
        <SharedSocialLoginButton
          class="rounded-sm"
          icon="cib:github"
          label="Github"
        />
      </div>
    </UForm>
  </div>
</template>


