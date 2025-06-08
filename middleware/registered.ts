import { ACCOUNT } from "~/libs/appwrite";

export default defineNuxtRouteMiddleware(async () => {
  try {
    await ACCOUNT.get();
  } catch (err) {
    return navigateTo("/");
  }
});



