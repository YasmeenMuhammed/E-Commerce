import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken(){
    const myCookies = await cookies()
   const decodedToken = myCookies.get('next-auth.session-token')?.value || myCookies.get('__Secure-next-auth.session-token')?.value
  const token = await decode({token:decodedToken , secret:process.env.AUTH_SECRET!})
   console.log(decodedToken);
   console.log(token);
   console.log(token?.token);
   
    return token?.token as string
}