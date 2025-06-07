import { ACCOUNT } from "~/libs/appwrite";

export default defineNuxtRouteMiddleware(async () => {
  try {
    await ACCOUNT.get();
    console.log('User is authenticated, redirecting to home page');
  } catch (err) {
    return navigateTo("/");
  }
});



