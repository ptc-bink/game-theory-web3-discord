import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const scopes = ['identify'];

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET || "",
      authorization: { params: { scope: scopes.join(' ') } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'discord') {
        token.sub = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.id = token.sub;
      }
      return session;
    },
    async sign({ }) {
      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);