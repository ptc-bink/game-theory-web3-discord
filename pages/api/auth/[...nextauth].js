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
    },
    async sign({ }) {
      return true
    }
  }
}

export default NextAuth(authOptions);