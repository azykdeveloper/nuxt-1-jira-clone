import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false, // Default to true to show loading initially
  }),
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
  },
  
});
