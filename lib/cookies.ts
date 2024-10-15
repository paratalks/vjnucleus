import { cookies } from 'next/headers';

export const setCookie = async (cookieName:string ="", day:number = 1 ) => {
    const cookieStore = cookies();
    cookieStore.set(cookieName, 'some-value', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * day, // Expires in 7 days
    });

    return new Response('Cookie set successfully', {
        status: 200,
    });
}
export const getCookie = async (cookieName:string ="") => {
    const cookieStore = cookies();
    const userToken = cookieStore.get(cookieName);

    // Handle if cookie doesn't exist
    if (!userToken) {
        return null
    }

    return userToken.value
}