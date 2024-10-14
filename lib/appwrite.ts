// lib/appwrite.js
import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");


// Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };