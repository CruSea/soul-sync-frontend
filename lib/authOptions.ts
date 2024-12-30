import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Store the Google access token and id token in the JWT token
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session }) {
      // Attach the tokens to the session
      // session.access_token = token.access_token;
      // session.id_token = token.id_token;
      return session;
    },
  },
};
