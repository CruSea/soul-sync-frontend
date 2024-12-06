//import NextAuth , { NextAuthOptions,User,Session } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'
import { Account, NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

interface MyUser extends User {
  role: unknown;
  token: unknown;
  refreshToken?: string;
}


export const options: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/sign-in',
      error: '/sign-in',
      signOut:'/',
      },
    callbacks: {
        async signIn({ user, account }: { user: User | AdapterUser; account: Account | null; }) {
            
             if (account?.provider === "google") {

    try {
          if(account.refreshToken){
            (user as MyUser).refreshToken = account.refreshToken as string;
            return true
          }else{
          
            const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`, {
                username:user.name,
                email:user.email,
                image:user.image,
                id:user.id,
                provider: "GOOGLE"
            });
          
            if (response.data && response.data.role) {
              (user as MyUser).role = response.data.role as string; // Set role from API response
              (user as MyUser).image=response.data.image
              (user as MyUser).token=response.data.token
            } else {
              (user as MyUser).role = 'user'; // Default role if API response doesn't include a role
            }
          
            return true;
          }

         
    }
  catch (error: unknown) {
  throw new Error(String(error));
  }
}else{
  return true
}
        },
        // async redirect({ url, baseUrl }) {
        //   return baseUrl
        // },
        async session({ session, token }) {
            if (token?.role) {
                if (!session.user) {
                    session.user = {
                        name: token.name as string,
                        email: token.email as string,
                        image: token?.image as string|null,
                    };
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
           
                token.refreshToken = (user as MyUser).refreshToken;
                token = { ...token, ...user };
            }
            return token;
        }
        }
      }
