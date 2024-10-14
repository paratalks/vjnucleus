const collectionId = "670d563b001ba1da151a"
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "";
import {databases, ID} from "@/lib/appwrite";

export const createEvents = async (data: any) => {
    try {
        console.log(data)
        return await databases.createDocument(databaseId, collectionId, ID.unique(), data).then(res => {
            return res;
        });
    } catch (error) {
        return error;
    }
}