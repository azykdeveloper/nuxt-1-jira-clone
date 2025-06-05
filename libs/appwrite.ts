import { Client, Account, ID } from "appwrite";

// const url: string = import.meta.env.NUXT_PUBLIC_APPWRITE_ENDPOINT;
// const project: string = import.meta.env.NUXT_PUBLIC_APPWRITE_PROJECT;

const client: Client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("684121360008db279808");

export const ACCOUNT: Account = new Account(client);
export const IDENTITY: string = ID.unique();
