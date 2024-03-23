import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import isDev from '@/lib/isDev';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session }) {
      const newSession = session;
      await connectMongoDB();
      const user = await User.findOne({ email: session.user.email });
      newSession.user.roles = user.roles;

      return newSession;
    },
    async signIn({ user, account }) {
      if (account!.provider !== 'discord') return false;

      const { name, email, image } = user;

      await connectMongoDB();
      const userExists = await User.findOne({ email });

      if (userExists) {
        return true;
      }

      const webUrl = isDev
        ? 'http://localhost:3000'
        : `https://${process.env.VERCEL_URL}`;

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
        console.log(res);
      } catch (error) {
        console.error('Failed to create user', error);
      }

      return false;
    },
  },
});

export { handler as GET, handler as POST };
