import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: number
            imageUrl: string
            surname: string
            active: boolean
            showProfile: boolean
            roleId: number
            role: string
            profileId: number | null
            clientId: number | null
        } & DefaultSession["user"]
    }
}