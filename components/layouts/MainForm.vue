<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({
  email: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Please enter a valid email address.' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<typeof state>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4  w-md" @submit="onSubmit">
    <UFormField  class="" label="Work email" help="Using a work email helps find teammates and boost collaboration." name="email" >
      <UInput size="xl" placeholder="you@company.com" v-model="state.email" class="w-full" style="border-radius: 50px; padding: 10px 20px;"/>
    </UFormField>

    <UButton type="submit" class="rounded-full text-center font-semibold text-xl justify-center w-full py-2 text-zinc-50 cursor-pointer " >
      Sign up
    </UButton>

    <USeparator label="Or continue with" color="secondary" size="sm"/>

    <div class="flex flex-1 gap-5">
      <UButton variant="soft" class="w-full justify-center cursor-pointer rounded-full bg-[#fff] shadow py-2 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50" icon="devicon:google" >Google</UButton>
      <UButton variant="soft" class="w-full justify-center cursor-pointer rounded-full bg-[#fff] shadow py-2 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50" icon="logos:microsoft-icon">Microsoft</UButton>
    </div>
  </UForm>
</template>

