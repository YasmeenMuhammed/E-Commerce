import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const myCookies = await cookies();

  const decodedToken =
    myCookies.get("next-auth.session-token")?.value ||
    myCookies.get("__Secure-next-auth.session-token")?.value;

  if (!decodedToken) {
    console.log("No token found in cookies");
    return null;
  }


  const token = await decode({
    token: decodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("Raw token:", decodedToken);
  console.log("Decoded token:", token);

  // تقدر ترجّع الـ payload كله أو قيمة معينة زي الإيميل أو الـ id
  return token;
}
