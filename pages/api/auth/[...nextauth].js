import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { JWT } from 'next-auth';
import { Account } from 'next-auth';
import { Session } from 'next-auth';
import { User } from 'next-auth';
import { Profile } from 'next-auth';

const scopes = ['identify',];
// const scopes = [''];

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
      console.log("token ====>", token);
      console.log("account ====>", account);
      // Persist the OAuth access_token to the token right after signin
      if (account?.provider === 'discord') {

        token.sub = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session ===>", session);
      console.log("token ===>", token);

      // Send properties to the client, like an access_token from a provider.
      if (token.sub) {
        session.id = token.sub;
      }
      return session;
    }
  }
}

export default NextAuth(authOptions);