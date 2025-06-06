import { Client, Account, ID } from "appwrite";

const config = useRuntimeConfig();

const client: Client = new Client();

client
  .setEndpoint(config.public.appwriteEndpoint as string)
  .setProject(config.public.appwriteProjectId as string);


export const ACCOUNT: Account = new Account(client);
export const IDENTITY: string = ID.unique();
