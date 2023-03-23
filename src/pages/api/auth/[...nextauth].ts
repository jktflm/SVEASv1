import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client' 
import { JWT } from "next-auth/jwt"


const prisma = new PrismaClient()

export const authOptions = {
    secret: process.env.NextAuth_SECRET,
  // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: { label: 'Name', type: 'text', placeholder: 'Username'},
                password: { Label: 'Password', type: 'password'},
            },
            async authorize(credentials, req) {
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            name: credentials?.name,
                            password: credentials?.password
                        }
                    })
                    if (user) {
                        console.log(user)
                        return {
                            id: String(user.id),
                            email: user.email,
                            name: user.name
                        }
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    await prisma.$disconnect()
                }

                return null
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any): Promise<JWT> {
            return { ...token, ...user };
        },
        async session({ session, token, user }: any): Promise<Session> {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
}
export default NextAuth(authOptions)