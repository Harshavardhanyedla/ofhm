import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDocumentByField } from "@/lib/firestore";
import { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await getDocumentByField<IUser>("users", "email", credentials.email);

                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) return null;

                return {
                    id: user._id!,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    /* eslint-disable @typescript-eslint/no-explicit-any */
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    /* eslint-enable @typescript-eslint/no-explicit-any */
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
