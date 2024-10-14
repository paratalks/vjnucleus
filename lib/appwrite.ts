// lib/appwrite.js
import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject("670d55ac0031976504a6");

// Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };