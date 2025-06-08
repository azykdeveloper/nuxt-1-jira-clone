import { ACCOUNT } from "~/libs/appwrite";

export default defineNuxtRouteMiddleware(async () => {
  try {
    await ACCOUNT.get();
    return navigateTo("/");
  } catch (err) {
    return;
  }
});



