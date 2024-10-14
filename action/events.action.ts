const collectionId = "670d563b001ba1da151a"
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
import {databases, ID} from "@/lib/appwrite";

export const createEvents = async (data: any) => {
    try {
        return await databases.createDocument(databaseId, collectionId, ID.unique(), data);
    } catch (error) {
        return error;
    }
}