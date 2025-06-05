<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
import { ACCOUNT, IDENTITY } from "~/libs/appwrite";

const state = reactive({
  fullName: "",
  email: "",
  password: "",
});

const authStore = useAuthStore();
const router = useRouter();

let isLoading = ref(false);
let error = ref('')

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
    isLoading.value = true;
    // Sign up logic here
    try {
      await ACCOUNT.create(IDENTITY, email, password, fullName);

      await router.push("/sign-in");

      toast.add({
        title: "Sign Up Success",
        description: "You have signed up successfully.",
        color: "success",
      });
    } catch (e:any) {
      error.value = e.message || "An error occurred during sign up.";
      toast.add({
        title: "Sign Up Error",
        description: "An error occurred during sign up.",
        color: "error",
      });
    } finally {
      isLoading.value = false;
    }
  } else if (props.status === "sign-in") {
    isLoading.value = true;
    // Sign in logic here
    try {
      await ACCOUNT.createEmailPasswordSession(
        email,
        password
      );

      let response = await ACCOUNT.get();

      authStore.setUser({
        id: response.$id,
        name: response.name || "",
        email: response.email || "",
        status: response.status 
      });

      toast.add({
        title: "Sign In Success",
        description: "You have signed in successfully.",
        color: "success",
      });

      await router.push("/");
    } catch (e:any) {
      error.value = e.message || "An error occurred during sign in.";
      toast.add({
        title: "Sign In Error",
        description: "An error occurred during sign in.",
        color: "error",
      });
    } finally {
      isLoading.value = false;
    }
  }
}

// PROPS
const props = defineProps<{
  status?: "sign-in" | "sign-up";
}>();
</script>

<template>
  <UAlert
    title="Error!"
    :description="error"
    icon="i-lucide-terminal"
    color="error"
    variant="subtle"
    class="absolute top-2 left-[50%] translate-x-[-50%] w-xl z-50 text-left"
    v-if="error"
  />
  <UForm :validate="validate" :state="state" @submit="onSubmit">
    <UFormField label="Full name *" name="fullName" v-if="props.status === 'sign-up'">
      <UInput
        type="text"
        autocomplete="fullName"
        size="xl"
        placeholder="Enter your full name"
        v-model="state.fullName"
        class="w-full -mb-1"
        style="padding: 10px 20px"
      />
    </UFormField>
    <UFormField name="email" label="Email *" class="mt-4">
      <UInput
        type="email"
        autocomplete="email"
        size="xl"
        placeholder="Enter your email"
        v-model="state.email"
        class="w-full -mb-1"
        style="padding: 10px 20px"
      />
    </UFormField>
    <UFormField name="password" label="Password *" class="mt-4">
      <UInput
        type="password"
        size="xl"
        placeholder="Enter your password"
        v-model="state.password"
        class="w-full -mb-1"
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
      :loading="isLoading"
      :disabled="isLoading"
      loading-icon="eos-icons:bubble-loading"
    >
      Sign up
    </UButton>
    <UButton
      v-if="props.status === 'sign-in'"
      type="submit"
      class="rounded-sm text-center font-semibold text-md justify-center w-full py-2 mt-3 text-zinc-50 cursor-pointer"
      :loading="isLoading"
      :disabled="isLoading"
      loading-icon="eos-icons:bubble-loading"
    >
      Continue
    </UButton>

    <p class="text-sm text-zinc-500 font-semibold my-4">Or continue with:</p>

    <div class="grid grid-cols-1 gap-4">
      <SharedSocialLoginButton
        class="rounded-sm "
        icon="devicon:google"
        label="Google"
      />
      <SharedSocialLoginButton
        class="rounded-sm "
        icon="cib:github"
        label="Github"
      />
      
    </div>
  </UForm>
</template>
