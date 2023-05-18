import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from 'next-auth/jwt'

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        role: string
        user: {
            id: number
            name: string
            surname: string
            active: boolean
            showProfile: boolean
            roleId: number
            role: string
            profileId: number | null
            clientId: number | null
            image: string | null
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    /**
     * Returned by `getToken`
     */
    interface JWT extends JWT {
        user: {
            id: number
            name: string
            surname: string
            active: boolean
            showProfile: boolean
            roleId: number
            role: string
            profileId: number | null
            clientId: number | null
            image: string | null
        }
    }
}