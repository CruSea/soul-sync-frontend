import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import jwt from "jsonwebtoken"
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        console.log("google is already signed in",account,profile)
        // return profile?.email
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(token as unknown as string, secret)
    },
    async decode({ secret, token }:{
        secret:unknown,
        token:unknown
    }) {
      return jwt.verify(token, secret)
    },
  },
}

export default NextAuth(authOptions)