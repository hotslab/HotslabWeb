import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import * as argon2 from "argon2"
import { User } from "../../../../prisma/generated/client" 

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
        async jwt({ token, user }) {
            /* Step 1: update the token based on the user object */
            if (token.sub) {
                const userData = await prisma.user.findUnique({
                    where: { id: Number(token.sub) },
                    include: {
                        role: true,
                        profile: { select: { id: true, imageUrl: true } },
                        client: { select: { id: true, imageUrl: true } }
                    }
                })
                if (userData) {
                    token = {
                        ...token,
                        user: {
                            id: userData.id,
                            name: userData.name,
                            surname: userData.surname,
                            role: userData.role.name,
                            roleId: userData.roleId,
                            active: userData.active,
                            showProfile: userData.showProfile,
                            image: userData.profile?.imageUrl || userData.client?.imageUrl || null,
                            profileId: userData.profile?.id || null,
                            clientId: userData.client?.id || null,
                        }
                    }
                }
            }
            return token;
        },
        session: async ({ session, token }: CallbackSession) => {
            if (token.user) session.user = token.user
            return session
        }
    },
    session: { strategy: "jwt" },
});
