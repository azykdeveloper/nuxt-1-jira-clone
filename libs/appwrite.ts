import { Client, Account, ID } from "appwrite";

const client: Client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("684121360008db279808");

export const ACCOUNT: Account = new Account(client);
export const IDENTITY: string = ID.unique();
