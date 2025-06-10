import type { IDeal } from "~/types";

export const useEditDealStore = defineStore("edit-deal", {
  state: () => ({
    currentDeal: null as IDeal | null,
    isOpen: false as boolean,
  }),
  actions: {
    setCurrentDeal(deal: IDeal) {
      this.currentDeal = deal;
      this.isOpen = true;
    },
    clearCurrentDeal() {
      this.currentDeal = null;
    },
    toggle() {
      this.isOpen = !this.isOpen;
    }
  },
  // getters: {
  //   isCurrentDealSet(): boolean {
  //     return this.currentDeal !== null;
  //   },
  // },
})