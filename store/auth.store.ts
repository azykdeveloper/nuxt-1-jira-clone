import { defineStore } from "pinia";

interface IUser {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

export const useAuthStore = defineStore("auth", {
  state() {
    return {
      user: null as IUser | null,
      isAuthenticated: false,
    };
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
      this.isAuthenticated = true;
    },
    clearUser() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
  getters: {

  }
  
})