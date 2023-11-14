import Author from '@/lib/models/user.model';
import { connectToMongoDB } from '@/lib/mongoose';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async signIn({ user, account }: any) {
			const { id, name, email, image } = user;

			if (account.provider === 'google') {
				try {
					connectToMongoDB();

					await Author.findOneAndUpdate(
						{ id: id },
						{
							id,
							name,
							email,
							image,
						},
						{ upsert: true }
					);
				} catch (error) {
					console.log(error);
				}
			}

			return user;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
