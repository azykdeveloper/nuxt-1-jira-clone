import { Client, Account, ID } from "appwrite";

const url: string = import.meta.env.VITE_APPWRITE_ENDPOINT;
const project: string = import.meta.env.VITE_APPWRITE_PROJECT;

const client: Client = new Client();

client.setEndpoint(url).setProject(project);

export const ACCOUNT = new Account(client);
export const IDENTITY = ID.unique();
