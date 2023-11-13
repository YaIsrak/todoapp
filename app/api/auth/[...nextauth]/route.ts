import User from '@/lib/models/user.model';
import { connectToMongoDB } from '@/lib/mongoose';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
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

					await User.create({
						id,
						name,
						email,
						image,
					});
				} catch (error) {
					console.log(error);
				}
			}

			return user;
		},
	},
});

export { handler as GET, handler as POST };
