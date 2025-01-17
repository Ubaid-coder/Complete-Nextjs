import NextAuth from "next-auth/next";
import Credential from "next-auth/providers/credentials";
import { connectMongoDb } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        Credential({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDb();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                    
                } catch (error) {
                    console.log(error);
                }

            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',

    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };