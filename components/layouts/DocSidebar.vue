<template>
  <div
    class="fixed top-3 left-3 bottom-3 w-72 rounded-lg bg-[#fff] dark:bg-zinc-900 shadow-xl hidden md:block"
  >
    <NuxtLink
      to="/"
      class="flex items-center gap-2 border-b border-b-zinc-200 dark:border-b-zinc-700 h-18 p-5"
    >
      <UIcon name="logos:jira" class="text-xl translate-y-0.5" />
      <span class="text-2xl font-medium">Jira</span>
    </NuxtLink>

    <div class="flex flex-col gap-2 p-5">
      <NuxtLink
        v-for="item in sidebarItems"
        :key="item.to"
        :to="item.to"
        active-class="bg-blue-500/20 text-blue-500/80 dark:text-blue-400"
        class="flex items-center gap-2 p-2 rounded-md hover:bg-blue-500/20 transition-all duration-300"
      >
        <UIcon :name="item.icon" class="text-xl" />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ISidebarItem {
  icon: string;
  label: string;
  to: string;
}
const sidebarItems: ISidebarItem[] = [
  {
    icon: "mage:dashboard-fill",
    label: "Dashboard",
    to: "/documents",
  },
  {
    icon: "ri:todo-fill",
    label: "To Do",
    to: "/documents/todos",
  },
  {
    icon: "game-icons:progression",
    label: "In Progress",
    to: "/documents/in-progress",
  },
  {
    icon: "eos-icons:product-subscriptions-outlined",
    label: "Produced",
    to: "/documents/produced",
  },
  {
    icon: "material-symbols:cloud-done-rounded",
    label: "Done",
    to: "/documents/done",
  },
];
</script>
