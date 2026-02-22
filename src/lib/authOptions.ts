import { signInUser } from "@/Services/auth.services";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


interface decodedTokenType {
    id: string,
    name: string,
    role: string,
}


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: { email: {}, password: {} },
            authorize: async (credentials) => {
                if (!credentials) return null
                const data = await signInUser(credentials);
                console.log(data);
                if (data.message === "success") {
                    const decodedToken: decodedTokenType = jwtDecode(data.token)
                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token
                    }
                }
                else {
                    throw new Error(data.message || "Invalid log in")
                }
            }

        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                    token.token = user.token;
            }
            return token
        },
        session({session , token}){
            if(session){
                session.user = token.user
            }
            return session
        }

    },

}
