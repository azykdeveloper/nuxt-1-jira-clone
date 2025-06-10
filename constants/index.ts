import { EnumStatus, type IDeal, type ISidebarItem, type IStatuses } from "~/types";

export const sidebarItems: ISidebarItem[] = [
  {
    icon: "mage:dashboard-fill",
    label: "Dashboard",
    to: "/documents",
  },
  {
    icon: "ri:todo-fill",
    label: "To Do",
    to: "/documents/to-do",
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

export const statuses: IStatuses[] = [
  {
    id: EnumStatus.todo,
    name: "To Do",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "In Progress",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Done",
    items: [],
  },
];

