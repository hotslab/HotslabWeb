import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import * as argon2 from "argon2"
import { UserExtended, User } from "@prisma/client"

type CallbackSession = {
    session: Session
    token: any
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {},
            // @ts-ignore
            async authorize(credentials, _) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }
                if (!email || !password) throw new Error("Missing username or password")
                const user: User | null = await prisma.user.findUnique({ where: { email } })
                if (!user || !(await argon2.verify(user.password, password))) throw new Error("Invalid username or password")
                return user
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }: CallbackSession) => {
            session.user.id = parseInt(token.sub)
            const user = await prisma.user.findUnique({
                where: { id: parseInt(token.sub) },
                include: {
                    role: true,
                    profile: { select: { id: true, imageUrl: true } },
                    client: { select: { id: true, imageUrl: true } }
                }
            })
            if (user) {
                session.user.surname = user.surname
                session.user.role = user.role.name
                session.user.roleId = user.roleId
                session.user.active = user.active
                session.user.showProfile = user.showProfile
                session.user.image = user.profile?.imageUrl || user.client?.imageUrl || null
                session.user.profileId = user.profile?.id || null
                session.user.clientId = user.client?.id || null
            }
            return session
        }
    },
    session: { strategy: "jwt" },
});
