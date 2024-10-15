const collectionId = "670d564f0017b8e522b4"
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
import {databases, ID} from "@/lib/appwrite";

export const saveRecording = async (data: any) => {
    try {
        return await databases.createDocument(databaseId, collectionId, ID.unique(), data).then(res => {
            return res;
        });
    } catch (error) {
        return error;
    }
}
