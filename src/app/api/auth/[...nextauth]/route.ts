import isDev from '@/lib/isDev';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account!.provider !== 'discord') return false;

      const { name, email, image } = user;

      await connectMongoDB();
      const userExists = await User.findOne({ email });

      if (userExists) {
        return true;
      }

      const webUrl = isDev ? 'http://localhost:3000' : process.env.VERCEL_URL;

      try {
        const res = await fetch(`${webUrl}/api/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: name,
            email,
            image,
            roles: ['user'],
          }),
        });

        if (res.ok) {
          return true;
        }
      } catch (error) {
        console.error('Failed to create user', error);
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
