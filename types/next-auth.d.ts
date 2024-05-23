import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import { DefaultJWT } from "next-auth/jwt"
import { Profile } from "next-auth"


declare module "next-auth" {

    interface Session {
        id: string & DefaultSession["user"]
    }

    interface JWT {
        id: string & DefaultJWT
    }

    interface Profile {
        id: string & Profile
    }
}